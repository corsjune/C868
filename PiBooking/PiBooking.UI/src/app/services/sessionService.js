import { OrderModel } from '../models/OrderModel';
var sessionService = (function () {
    function sessionService() {
        this.orderValue = new OrderModel();
    }
    return sessionService;
}());
export { sessionService };
//# sourceMappingURL=sessionService.js.map