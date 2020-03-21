import { each, set, has, isEmpty } from '@antv/util';
/**
 * 所有的 plot theme object，每个图类型只会存在一个 theme
 */
var PLOT_THEME_MAP = {};
/**
 * 将 主题 转换为 G2 主题配置
 * @param type plotType
 */
function convertThemeToG2Theme(type, theme) {
    var styleMapShape = {
        lineStyle: 'line.line',
        columnStyle: 'interval.rect',
        pointStyle: 'point.circle',
    };
    var g2Theme = {};
    if (type === 'area') {
        styleMapShape = {
            areaStyle: 'area.area',
            lineStyle: 'area.line',
            pointStyle: 'point.circle',
        };
    }
    var geometryTheme = {};
    each(theme, function (style, styleKey) {
        if (has(styleMapShape, styleKey)) {
            var shapePath_1 = styleMapShape[styleKey];
            each(style, function (v, k) {
                set(geometryTheme, shapePath_1 + "." + [k === 'normal' ? 'default' : k] + ".style", v);
            });
        }
        else {
            set(g2Theme, styleKey, style);
        }
    });
    if (!isEmpty(geometryTheme)) {
        set(g2Theme, 'geometries', geometryTheme);
    }
    return g2Theme;
}
/**
 * 注册新的图表主题
 * @param type
 * @param theme
 */
export function registerTheme(type, theme) {
    PLOT_THEME_MAP[type.toLowerCase()] = convertThemeToG2Theme(type, theme);
}
/**
 * 根据类型获取主题
 * @param type plotType, such as line, column, bar, pie, bullet, radar and so on
 */
export function getTheme(type) {
    return PLOT_THEME_MAP[type.toLowerCase()] || {};
}
//# sourceMappingURL=theme.js.map