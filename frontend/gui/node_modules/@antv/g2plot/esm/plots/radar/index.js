import { __extends } from "tslib";
/**
 * Create By Bruce Too
 * On 2020-02-14
 */
import { deepMix } from '@antv/util';
import BasePlot from '../../base/plot';
import RadarLayer from './layer';
var Radar = /** @class */ (function (_super) {
    __extends(Radar, _super);
    function Radar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Radar.prototype.createLayers = function (props) {
        var layerProps = deepMix({}, props);
        layerProps.type = 'radar';
        _super.prototype.createLayers.call(this, layerProps);
    };
    Radar.getDefaultOptions = RadarLayer.getDefaultOptions;
    return Radar;
}(BasePlot));
export default Radar;
//# sourceMappingURL=index.js.map