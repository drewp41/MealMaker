import { LayerConfig } from '../../base/layer';
import RoseLayer, { RoseViewConfig } from '../rose/layer';
export interface StackedRoseViewConfig extends RoseViewConfig {
    stackField: string;
}
export interface StackedRoseLayerConfig extends StackedRoseViewConfig, LayerConfig {
}
export default class StackedRoseLayer<T extends StackedRoseLayerConfig = StackedRoseLayerConfig> extends RoseLayer<T> {
    static getDefaultOptions(): any;
    type: string;
    protected adjustRoseAdjust(): {
        type: string;
    }[];
    protected geometryTooltip(): void;
}
