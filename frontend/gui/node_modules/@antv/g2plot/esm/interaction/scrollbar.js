import { __assign, __extends } from "tslib";
import { Scrollbar } from '../dependents';
import BBox from '../util/bbox';
import { clamp, get, isEqual, map, throttle } from '@antv/util';
import BaseInteraction from './base';
import { getDataByScaleRange } from './helper/data-range';
var DEFAULT_PADDING = 4;
var DEFAULT_SIZE = 8;
var DEFAULT_CATEGORY_SIZE = 32;
var MIN_THUMB_LENGTH = 20;
var SCROLL_BAR_Z_INDEX = 999;
var getValidScrollbarConfig = function (cfg) {
    if (cfg === void 0) { cfg = {}; }
    var _cfg = __assign({ type: 'horizontal', categorySize: DEFAULT_CATEGORY_SIZE, width: DEFAULT_SIZE, height: DEFAULT_SIZE, padding: [0, 0, 0, 0] }, cfg);
    // default padding
    if (!cfg.padding) {
        _cfg.padding =
            _cfg.type === 'horizontal' ? [DEFAULT_PADDING, 0, DEFAULT_PADDING, 0] : [0, DEFAULT_PADDING, 0, DEFAULT_PADDING];
    }
    return _cfg;
};
var ScrollbarInteraction = /** @class */ (function (_super) {
    __extends(ScrollbarInteraction, _super);
    function ScrollbarInteraction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onChangeFn = throttle(_this.onChange.bind(_this), 20, {
            leading: true,
        });
        return _this;
    }
    ScrollbarInteraction.getInteractionRange = function (layerRange, interaction) {
        var config = getValidScrollbarConfig(interaction);
        var _a = config.padding, paddingTop = _a[0], paddingRight = _a[1], paddingBottom = _a[2], paddingLeft = _a[3];
        if (config.type === 'horizontal') {
            return new BBox(layerRange.minX, layerRange.maxY - config.height - paddingTop - paddingBottom, layerRange.width, config.height + paddingTop + paddingBottom);
        }
        else {
            return new BBox(layerRange.maxX - config.width - paddingLeft - paddingRight, layerRange.minY, config.width + paddingLeft + paddingRight, layerRange.height);
        }
    };
    ScrollbarInteraction.prototype.render = function () {
        var _this = this;
        var view = this.view;
        this.ratio = 0;
        this.thumbOffset = 0;
        view.on('afterrender', function () {
            var padding = _this.view.padding;
            // if we're not in `auto padding` process
            if (!isEqual([0, 0, 0, 0], padding)) {
                if (!_this.trackLen) {
                    _this.measureScrollBar();
                    _this.changeViewData(_this.getScrollRange(), true);
                }
                else {
                    _this.renderScrollbar();
                }
            }
        });
    };
    ScrollbarInteraction.prototype.start = function () {
        return;
    };
    ScrollbarInteraction.prototype.clear = function () {
        if (this.scrollbar) {
            this.scrollbar.destroy();
            this.scrollbar = null;
        }
        if (this.container) {
            this.container.remove(true);
            this.container = null;
        }
        this.trackLen = null;
        this.thumbLen = null;
    };
    ScrollbarInteraction.prototype.renderScrollbar = function () {
        var config = getValidScrollbarConfig(this.getInteractionConfig());
        var range = this.getRange();
        var isHorizontal = config.type !== 'vertical';
        var panelRange = this.view.coordinateBBox;
        var _a = config.padding, paddingTop = _a[0], paddingLeft = _a[3];
        var position = isHorizontal
            ? { x: panelRange.minX + paddingLeft, y: range.minY + paddingTop }
            : { x: range.minX + paddingLeft, y: panelRange.minY + paddingTop };
        if (!this.scrollbar) {
            this.container = this.canvas.addGroup();
            this.scrollbar = new Scrollbar({
                container: this.container,
                x: position.x,
                y: position.y,
                isHorizontal: isHorizontal,
                trackLen: this.trackLen,
                thumbLen: this.thumbLen,
                thumbOffset: this.ratio * this.trackLen,
            });
            this.scrollbar.init();
            this.scrollbar.render();
            this.scrollbar.get('group').set('zIndex', SCROLL_BAR_Z_INDEX);
            this.scrollbar.on('scrollchange', this.onChangeFn);
        }
        else {
            this.scrollbar.update({
                trackLen: this.trackLen,
                thumbLen: this.thumbLen,
                thumbOffset: this.thumbOffset,
                x: position.x,
                y: position.y,
            });
            this.scrollbar.render();
        }
    };
    ScrollbarInteraction.prototype.measureScrollBar = function () {
        var config = getValidScrollbarConfig(this.getInteractionConfig());
        var _a = config.padding, paddingTop = _a[0], paddingRight = _a[1], paddingBottom = _a[2], paddingLeft = _a[3];
        var isHorizontal = config.type !== 'vertical';
        var panelRange = this.view.coordinateBBox;
        var xScale = this.view.getXScale();
        var yScales = this.view.getYScales();
        this.cnt = xScale.values.length;
        this.xScaleCfg = { field: xScale.field, values: xScale.values || [] };
        this.yScalesCfg = map(yScales, function (item) { return ({
            field: item.field,
            type: item.type,
            min: item.min,
            max: item.max,
            ticks: item.ticks,
            formatter: item.formatter,
        }); });
        this.step = Math.floor((isHorizontal ? panelRange.width : panelRange.height) / config.categorySize);
        this.trackLen = isHorizontal
            ? panelRange.width - paddingLeft - paddingRight
            : panelRange.height - paddingTop - paddingBottom;
        this.thumbLen = Math.max(this.trackLen * clamp(this.step / xScale.values.length, 0, 1), MIN_THUMB_LENGTH);
    };
    ScrollbarInteraction.prototype.getScrollRange = function () {
        var startIdx = Math.floor((this.cnt - this.step) * clamp(this.ratio, 0, 1));
        var endIdx = Math.min(startIdx + this.step, this.cnt);
        return [startIdx, endIdx];
    };
    ScrollbarInteraction.prototype.changeViewData = function (_a, render) {
        var _this = this;
        var startIdx = _a[0], endIdx = _a[1];
        var config = getValidScrollbarConfig(this.getInteractionConfig());
        var viewLayer = this.getViewLayer();
        var meta = viewLayer.options.meta;
        var origData = viewLayer.getData();
        var newData = getDataByScaleRange(this.xScaleCfg.field, this.xScaleCfg.values, origData, [startIdx, endIdx], config.type === 'vertical');
        // ScrollBar在滚动过程中保持Y轴上scale配置: min/max/ticks
        this.yScalesCfg.forEach(function (cfg) {
            var metaCfg = get(meta, cfg.field) || {};
            _this.view.scale(cfg.field, __assign(__assign({ formatter: cfg.formatter }, metaCfg), { type: cfg.type, min: cfg.min, max: cfg.max }));
        });
        if (render) {
            this.view.data(newData);
            this.view.render();
        }
        else {
            this.view.changeData(newData);
        }
    };
    ScrollbarInteraction.prototype.onChange = function (_a) {
        var ratio = _a.ratio, thumbOffset = _a.thumbOffset;
        this.ratio = ratio;
        this.thumbOffset = thumbOffset;
        var origAnimate = this.view.getOptions().animate;
        this.view.animate(false);
        this.changeViewData(this.getScrollRange());
        this.view.animate(origAnimate);
        // update scrollbar
        this.renderScrollbar();
    };
    return ScrollbarInteraction;
}(BaseInteraction));
export default ScrollbarInteraction;
//# sourceMappingURL=scrollbar.js.map