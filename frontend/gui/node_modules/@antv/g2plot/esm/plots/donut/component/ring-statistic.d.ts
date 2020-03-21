import { View } from '../../../dependents';
import StatisticHtml, { IStaticticHtml } from './statistic';
import Ring, { DonutViewConfig } from '../layer';
interface IRingStatictic extends IStaticticHtml {
    view: View;
    plot: any;
}
export default class RingStatistic extends StatisticHtml {
    protected view: View;
    protected plot: Ring;
    protected statisticClass: string;
    protected options: DonutViewConfig['statistic'];
    constructor(cfg: IRingStatictic);
    triggerOn(): void;
    protected adjustOptions(): void;
    private getTotalValue;
    private parseStatisticData;
    private getStatisticTemplate;
    private getStatisticSize;
    private getStatisticHtmlString;
}
export {};
