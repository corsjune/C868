
import { CustomerViewModel } from './CustomerViewModel'
import { JobViewModel } from './JobViewModel'
import { TimeSlotViewModel } from './TimeSlotViewModel'
import { PaymentViewModel } from './PaymentViewModel'
import { EngineerViewModel } from './EngineerViewModel'

export class OrderViewModel {
    public customer: CustomerViewModel;
    public job: JobViewModel;
    public timeSlots: TimeSlotViewModel[];
    public payment: PaymentViewModel;
    public totalAmount: number; //one way to server
    public totalCount: number;
    public signature: string;
    public engineer: EngineerViewModel = null;
    public orderID: number;
    public total: number //one way from server

    constructor() {

        this.customer = new CustomerViewModel();
        this.job = new JobViewModel();
        this.timeSlots = new Array<TimeSlotViewModel>();
        this.payment = new PaymentViewModel();
        this.totalCount = 0;
        this.totalAmount = 0;
    }
}
