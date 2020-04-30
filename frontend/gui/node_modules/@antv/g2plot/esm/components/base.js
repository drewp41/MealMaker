import { __assign, __extends } from "tslib";
import EventEmitter from '@antv/event-emitter';
import { each } from '@antv/util';
var BaseComponent = /** @class */ (function (_super) {
    __extends(BaseComponent, _super);
    function BaseComponent(config) {
        var _this = _super.call(this) || this;
        _this.container = config.container;
        _this.destroyed = false;
        _this.group = _this.container.addGroup();
        _this.config = config;
        _this.disposables = [];
        _this.init(config);
        return _this;
    }
    BaseComponent.prototype.getGroup = function () {
        return this.group;
    };
    BaseComponent.prototype.getBBox = function () {
        return this.getGroup().getBBox();
    };
    BaseComponent.prototype.clear = function () {
        this.group.clear();
    };
    BaseComponent.prototype.render = function () {
        this.renderInner(this.group);
        this.getCanvas().draw();
    };
    BaseComponent.prototype.update = function (config) {
        this.config = __assign(__assign({}, this.config), config);
        this.init(__assign(__assign({}, this.config), { config: config }));
        this.group.clear();
        this.renderInner(this.group);
        this.getCanvas().draw();
    };
    BaseComponent.prototype.destroy = function () {
        each(this.disposables, function (fn) {
            fn();
        });
        this.disposables = [];
        this.group.remove(true);
        this.destroyed = true;
    };
    BaseComponent.prototype.getCanvas = function () {
        return this.container.get('canvas');
    };
    BaseComponent.prototype.addDisposable = function (fn) {
        this.disposables.push(fn);
    };
    return BaseComponent;
}(EventEmitter));
export default BaseComponent;
//# sourceMappingURL=base.js.map