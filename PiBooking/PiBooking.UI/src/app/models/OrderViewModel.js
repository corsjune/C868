import { CustomerViewModel } from './CustomerViewModel';
import { JobViewModel } from './JobViewModel';
import { PaymentViewModel } from './PaymentViewModel';
var OrderViewModel = (function () {
    function OrderViewModel() {
        this.Engineer = null;
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
//# sourceMappingURL=OrderViewModel.js.map