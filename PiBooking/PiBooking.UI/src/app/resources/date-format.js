import * as moment from 'moment';
var DateFormatValueConverter = (function () {
    function DateFormatValueConverter() {
    }
    DateFormatValueConverter.prototype.toView = function (value, format) {
        return moment(value).format(format);
    };
    return DateFormatValueConverter;
}());
export { DateFormatValueConverter };
//# sourceMappingURL=date-format.js.map