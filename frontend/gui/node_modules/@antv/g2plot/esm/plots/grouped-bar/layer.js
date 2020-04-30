import { __extends } from "tslib";
import { deepMix, valuesOfKey, clone } from '@antv/util';
import { registerPlotType } from '../../base/global';
import BaseBarLayer from '../bar/layer';
import './theme';
var GroupedBarLayer = /** @class */ (function (_super) {
    __extends(GroupedBarLayer, _super);
    function GroupedBarLayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'groupedBar';
        return _this;
    }
    GroupedBarLayer.getDefaultOptions = function () {
        return deepMix({}, _super.getDefaultOptions.call(this), {
            xAxis: {
                visible: true,
                grid: {
                    visible: true,
                },
            },
            yAxis: {
                visible: true,
                title: {
                    visible: false,
                },
            },
            label: {
                visible: true,
                position: 'right',
                adjustColor: true,
            },
            legend: {
                visible: true,
                position: 'right-top',
                offsetY: 0,
            },
        });
    };
    GroupedBarLayer.prototype.afterRender = function () {
        _super.prototype.afterRender.call(this);
        var names = valuesOfKey(this.options.data, this.options.groupField);
        this.view.on('tooltip:change', function (e) {
            var items = e.items;
            var origin_items = clone(items);
            for (var i = 0; i < names.length; i++) {
                var name_1 = names[i];
                for (var j = 0; j < origin_items.length; j++) {
                    var item = origin_items[j];
                    if (item.name === name_1) {
                        e.items[i] = item;
                    }
                }
            }
        });
    };
    GroupedBarLayer.prototype.scale = function () {
        var defaultMeta = {};
        defaultMeta[this.options.groupField] = {
            values: valuesOfKey(this.options.data, this.options.groupField),
        };
        if (!this.options.meta) {
            this.options.meta = defaultMeta;
        }
        else {
            this.options.meta = deepMix({}, this.options.meta, defaultMeta);
        }
        _super.prototype.scale.call(this);
    };
    GroupedBarLayer.prototype.adjustBar = function (bar) {
        bar.adjust = [
            {
                type: 'dodge',
                marginRatio: 0.1,
            },
        ];
    };
    GroupedBarLayer.prototype.geometryTooltip = function () {
        this.bar.tooltip = {};
        var tooltipOptions = this.options.tooltip;
        if (tooltipOptions.fields) {
            this.bar.tooltip.fields = tooltipOptions.fields;
        }
        if (tooltipOptions.formatter) {
            this.bar.tooltip.callback = tooltipOptions.formatter;
            if (!tooltipOptions.fields) {
                this.bar.tooltip.fields = [this.options.xField, this.options.yField, this.options.groupField];
            }
        }
    };
    return GroupedBarLayer;
}(BaseBarLayer));
export default GroupedBarLayer;
registerPlotType('groupedBar', GroupedBarLayer);
//# sourceMappingURL=layer.js.map