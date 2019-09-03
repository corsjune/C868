import { CustomerModel } from '../models/CustomerModel';
import { JobModel } from '../models/JobModel';
import { PaymentModel } from '../models/PaymentModel';
var OrderModel = (function () {
    function OrderModel() {
        this.Customer = new CustomerModel();
        this.Job = new JobModel();
        this.TimeSlots = new Array();
        this.Payment = new PaymentModel();
        this.TotalCount = 0;
        this.TotalAmount = 0;
    }
    return OrderModel;
}());
export { OrderModel };
//# sourceMappingURL=OrderModel.js.map