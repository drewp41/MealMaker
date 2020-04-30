import { __extends } from "tslib";
import { registerLabelComponent } from '../../../components/label/base';
import ColumnLabel from '../../column/component/label';
var StackedColumnLabel = /** @class */ (function (_super) {
    __extends(StackedColumnLabel, _super);
    function StackedColumnLabel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StackedColumnLabel.prototype.adjustLabel = function (label, element) {
        var adjustPosition = this.options.adjustPosition;
        if (adjustPosition) {
            var labelRange = label.getBBox();
            var shapeRange = this.getElementShapeBBox(element);
            if (shapeRange.height < labelRange.height) {
                label.hide();
            }
        }
    };
    return StackedColumnLabel;
}(ColumnLabel));
export default StackedColumnLabel;
registerLabelComponent('stacked-column', StackedColumnLabel);
//# sourceMappingURL=label.js.map