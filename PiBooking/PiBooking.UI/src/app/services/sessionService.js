import { OrderViewModel } from '../models/OrderModel';
var sessionService = (function () {
    function sessionService() {
        this.orderValue = new OrderViewModel();
    }
    return sessionService;
}());
export { sessionService };
//# sourceMappingURL=sessionService.js.map