import { FC } from 'react';
import { AutoChartOptions } from '@antv/chart-advisor';
export interface AVAProps extends AutoChartOptions {
    data: any[];
}
declare const AVA: FC<AVAProps>;
export default AVA;
