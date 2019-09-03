import * as numeral from 'numeral';
var CurrencyFormatValueConverter = (function () {
    function CurrencyFormatValueConverter() {
    }
    CurrencyFormatValueConverter.prototype.toView = function (value) {
        return numeral(value).format('($0,0.00)');
    };
    return CurrencyFormatValueConverter;
}());
export { CurrencyFormatValueConverter };
//# sourceMappingURL=currency-format.js.map