import { OrderViewModel } from 'app/models';
var sessionService = (function () {
    function sessionService() {
        this.orderValue = new OrderViewModel();
    }
    return sessionService;
}());
export { sessionService };
//# sourceMappingURL=sessionService.js.map