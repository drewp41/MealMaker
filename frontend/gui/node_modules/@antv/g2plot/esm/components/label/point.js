import { __assign, __extends } from "tslib";
import { get, map, isArray, last } from '@antv/util';
import { _ORIGIN } from '../../dependents';
import BaseLabel, { registerLabelComponent } from '../../components/label/base';
var PointLabel = /** @class */ (function (_super) {
    __extends(PointLabel, _super);
    function PointLabel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PointLabel.prototype.getDefaultOptions = function () {
        var theme = this.layer.theme;
        var _a = theme.label, label = _a === void 0 ? {} : _a;
        return __assign({ offsetX: 0, offsetY: 0 }, label);
    };
    PointLabel.prototype.getLabelOffset = function () {
        return this.getLabelOffsetByDimAndFactor('y', -1);
    };
    PointLabel.prototype.getLabelItemAttrs = function (element, index) {
        var _this = this;
        var _a = this.options, style = _a.style, formatter = _a.formatter;
        var mappingData = get(element, 'model.mappingData', []);
        return map(mappingData, function (datum, datumIndex) {
            var _a;
            var value = _this.getValue(datum);
            return __assign(__assign(__assign({}, _this.getPosition(datum)), { text: formatter
                    ? formatter(value, (_a = {},
                        _a[_ORIGIN] = datum._origin,
                        _a.mappingDatum = datum,
                        _a.mappingDatumIndex = datumIndex,
                        _a.element = element,
                        _a.elementIndex = index,
                        _a), index)
                    : value, textAlign: 'center', textBaseline: 'middle' }), style);
        });
    };
    PointLabel.prototype.getValue = function (datum) {
        return get(datum._origin, this.layer.options.yField);
    };
    PointLabel.prototype.getPosition = function (datum) {
        var pos = {
            x: isArray(datum.x) ? last(datum.x) : datum.x,
            y: isArray(datum.y) ? last(datum.y) : datum.y,
        };
        return pos;
    };
    PointLabel.prototype.adjustLabel = function () {
        return;
    };
    return PointLabel;
}(BaseLabel));
export default PointLabel;
registerLabelComponent('point', PointLabel);
//# sourceMappingURL=point.js.map