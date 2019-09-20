import { CustomerViewModel } from '../models/CustomerModel';
import { JobViewModel } from '../models/JobModel';
import { PaymentViewModel } from '../models/PaymentModel';
var OrderViewModel = (function () {
    function OrderViewModel() {
        this.Customer = new CustomerViewModel();
        this.Job = new JobViewModel();
        this.TimeSlots = new Array();
        this.Payment = new PaymentViewModel();
        this.TotalCount = 0;
        this.TotalAmount = 0;
    }
    return OrderViewModel;
}());
export { OrderViewModel };
//# sourceMappingURL=OrderModel.js.map