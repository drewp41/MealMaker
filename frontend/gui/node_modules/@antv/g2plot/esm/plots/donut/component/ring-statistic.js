import { __extends } from "tslib";
import StatisticHtml from './statistic';
import * as statisticTemplate from './statistic-template';
import { debounce, each, isString, isObject, isFunction, keys } from '@antv/util';
var RingStatistic = /** @class */ (function (_super) {
    __extends(RingStatistic, _super);
    function RingStatistic(cfg) {
        var _this = _super.call(this, cfg) || this;
        _this.view = cfg.view;
        _this.plot = cfg.plot;
        _this.statisticClass = cfg.statisticClass;
        _this.adjustOptions();
        return _this;
    }
    RingStatistic.prototype.triggerOn = function () {
        var _this = this;
        var triggerOnEvent = this.options.triggerOn;
        this.view.on("interval:" + triggerOnEvent, debounce(function (e) {
            var displayData = _this.parseStatisticData(e.data.data);
            var htmlString = _this.getStatisticHtmlString(displayData);
            _this.updateHtml(htmlString);
        }, 150));
        var triggerOffEvent = this.options.triggerOff ? this.options.triggerOff : 'mouseleave';
        this.view.on("interval:" + triggerOffEvent, debounce(function () {
            var totalValue = _this.getTotalValue();
            var displayData = _this.parseStatisticData(totalValue);
            var htmlString = _this.getStatisticHtmlString(displayData);
            _this.updateHtml(htmlString);
        }, 150));
    };
    RingStatistic.prototype.adjustOptions = function () {
        var displayData;
        if (this.options.content) {
            displayData = this.options.content;
        }
        else {
            /** 用户没有指定文本内容时，默认显示总计 */
            var data = this.getTotalValue();
            displayData = this.parseStatisticData(data);
        }
        /** 中心文本显示 */
        var htmlString;
        if (this.options.htmlContent) {
            htmlString = this.options.htmlContent(displayData);
        }
        else {
            htmlString = this.getStatisticTemplate(displayData);
        }
        this.html = htmlString;
        var _a = this.view.coordinateBBox, minX = _a.minX, minY = _a.minY, width = _a.width, height = _a.height;
        this.x = minX + width / 2;
        this.y = minY + height / 2;
    };
    RingStatistic.prototype.getTotalValue = function () {
        var _a;
        var total = 0;
        var _b = this.plot.options, angleField = _b.angleField, colorField = _b.colorField;
        var totalLabel = this.options.totalLabel;
        each(this.plot.options.data, function (item) {
            if (typeof item[angleField] === 'number') {
                total += item[angleField];
            }
        });
        var data = (_a = {},
            _a[angleField] = total,
            _a[colorField] = totalLabel,
            _a);
        return data;
    };
    RingStatistic.prototype.parseStatisticData = function (data) {
        var _a = this.plot.options, angleField = _a.angleField, colorField = _a.colorField;
        return colorField ? { name: data[colorField], value: data[angleField] } : data[angleField];
    };
    RingStatistic.prototype.getStatisticTemplate = function (data) {
        var size = this.getStatisticSize();
        var htmlString;
        /** 如果文本内容为string或单条数据 */
        if (isString(data)) {
            htmlString = statisticTemplate.getSingleDataTemplate(data, this.statisticClass, size);
        }
        else if (isObject(data) && keys(data).length === 2) {
            /** 如果文本内容为两条数据 */
            var content = data;
            htmlString = statisticTemplate.getTwoDataTemplate(content.name, content.value, this.statisticClass, size);
        }
        /** 更为复杂的文本要求用户自行制定html模板 */
        return htmlString;
    };
    RingStatistic.prototype.getStatisticSize = function () {
        var viewRange = this.plot.view.coordinateBBox;
        var _a = this.plot.options, radius = _a.radius, innerRadius = _a.innerRadius;
        var minContainerSize = Math.min(viewRange.width, viewRange.height);
        var size = minContainerSize * radius * innerRadius;
        return size;
    };
    RingStatistic.prototype.getStatisticHtmlString = function (data) {
        var triggerOnConfig = this.options.triggerOn;
        var htmlString;
        if (isString(triggerOnConfig)) {
            htmlString = this.getStatisticTemplate(data);
        }
        if (isFunction(triggerOnConfig)) {
            htmlString = triggerOnConfig(data);
            htmlString = "<div class=\"ring-guide-html " + this.statisticClass + "\">" + htmlString + "</div>";
        }
        return htmlString;
    };
    return RingStatistic;
}(StatisticHtml));
export default RingStatistic;
//# sourceMappingURL=ring-statistic.js.map