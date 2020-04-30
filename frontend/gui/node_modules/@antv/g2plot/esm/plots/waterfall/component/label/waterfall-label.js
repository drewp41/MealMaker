import { __extends } from "tslib";
/**
 * Create By Bruce Too
 * On 2020-02-18
 */
import { isArray } from '@antv/util';
import ColumnLabel from '../../../column/component/label';
import { VALUE_FIELD } from '../../layer';
import { registerLabelComponent } from '../../../../components/label/base';
var MARGIN = 2;
var WaterfallLabel = /** @class */ (function (_super) {
    __extends(WaterfallLabel, _super);
    function WaterfallLabel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WaterfallLabel.prototype.adjustLabel = function (label, element) {
        var shape = element.shape;
        var shapeBox = shape.getBBox();
        var data = element.getData();
        var values = data[VALUE_FIELD];
        var diff = data[this.layer.options.yField];
        var value = isArray(values) ? values[1] : values;
        var yPos = (shapeBox.minY + shapeBox.maxY) / 2;
        var textBaseline = 'bottom';
        if (diff < 0) {
            yPos = shapeBox.maxY + MARGIN;
            textBaseline = 'top';
        }
        else {
            yPos = shapeBox.minY - MARGIN;
        }
        label.attr('y', yPos);
        label.attr('text', value);
        label.attr('textBaseline', textBaseline);
    };
    return WaterfallLabel;
}(ColumnLabel));
export default WaterfallLabel;
registerLabelComponent('waterfall', WaterfallLabel);
//# sourceMappingURL=waterfall-label.js.map