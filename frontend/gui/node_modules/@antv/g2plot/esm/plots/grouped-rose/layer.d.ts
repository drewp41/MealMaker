import { LayerConfig } from '../../base/layer';
import RoseLayer, { RoseViewConfig } from '../rose/layer';
export interface GroupedRoseViewConfig extends RoseViewConfig {
    groupField: string;
}
export interface GroupedRoseLayerConfig extends GroupedRoseViewConfig, LayerConfig {
}
export default class GroupedRoseLayer<T extends GroupedRoseLayerConfig = GroupedRoseLayerConfig> extends RoseLayer<T> {
    static getDefaultOptions(): any;
    type: string;
    protected adjustRoseAdjust(): {
        type: string;
        marginRatio: number;
    }[];
    protected geometryTooltip(): void;
}
