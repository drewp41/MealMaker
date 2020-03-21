import { __extends } from "tslib";
import { deepMix } from '@antv/util';
import BasePlot from '../../base/plot';
import BubbleLayer from './layer';
var Bubble = /** @class */ (function (_super) {
    __extends(Bubble, _super);
    function Bubble() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Bubble.prototype.createLayers = function (props) {
        var layerProps = deepMix({}, props);
        layerProps.type = 'bubble';
        _super.prototype.createLayers.call(this, layerProps);
    };
    Bubble.getDefaultOptions = BubbleLayer.getDefaultOptions;
    return Bubble;
}(BasePlot));
export default Bubble;
//# sourceMappingURL=index.js.map