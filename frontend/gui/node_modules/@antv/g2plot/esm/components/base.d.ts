import EventEmitter from '@antv/event-emitter';
import { Canvas, IGroup, BBox } from '../dependents';
export interface BaseComponentConfig {
    container: IGroup;
}
export default abstract class BaseComponent<T extends BaseComponentConfig = BaseComponentConfig> extends EventEmitter {
    protected container: IGroup;
    protected group: IGroup;
    protected destroyed: boolean;
    protected config: T;
    private disposables;
    constructor(config: T);
    getGroup(): IGroup;
    getBBox(): BBox;
    clear(): void;
    render(): void;
    update(config: Partial<T>): void;
    destroy(): void;
    protected getCanvas(): Canvas;
    protected addDisposable(fn: () => void): void;
    protected abstract init(config: T): void;
    protected abstract renderInner(group: IGroup): void;
}
