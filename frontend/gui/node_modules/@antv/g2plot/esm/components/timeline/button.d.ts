/**
 * @file 播放轴组件按钮
 * @author blackganglion
 */
import BaseComponent, { BaseComponentConfig } from '../base';
/** 播放按钮配置 */
interface ButtonCfg extends BaseComponentConfig {
    /** 按钮位置数据 */
    readonly x: number;
    readonly y: number;
    readonly r: number;
    readonly isPlay: boolean;
}
export default class Button extends BaseComponent<ButtonCfg> {
    /** 圆点 */
    private circle;
    /** 开始 marker */
    private startMarker;
    /** 暂停 marker */
    private pauseGroupMarker;
    private pauseLeftMarker;
    private pauseRightMarker;
    constructor(cfg: ButtonCfg);
    protected renderInner(): void;
    update(cfg: Partial<ButtonCfg>): void;
    protected init(): void;
    destroy(): void;
    private initElement;
    private updateElement;
    private renderMarker;
    /** 获取播放键 marker path */
    private getStartMarkerPath;
}
export {};
