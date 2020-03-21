/**
 * 注册新的图表主题
 * @param type
 * @param theme
 */
export declare function registerTheme(type: string, theme: object): void;
/**
 * 根据类型获取主题
 * @param type plotType, such as line, column, bar, pie, bullet, radar and so on
 */
export declare function getTheme(type: string): any;
