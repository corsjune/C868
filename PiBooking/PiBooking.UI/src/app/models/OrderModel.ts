
import { CustomerViewModel } from '../models/CustomerModel'
import { JobViewModel } from '../models/JobModel'
import { TimeSlotViewModel } from '../models/TimeSlotModel'
import { PaymentViewModel } from '../models/PaymentModel'

    export class OrderViewModel { 
        public Customer: CustomerViewModel;
        public Job: JobViewModel;
        public TimeSlots: TimeSlotViewModel[];
        public Payment: PaymentViewModel;
        public TotalAmount: number;
        public TotalCount: number;
        public Signature:string;

        constructor() {

            this.Customer = new CustomerViewModel();
            this.Job = new JobViewModel();
            this.TimeSlots = new Array<TimeSlotViewModel>();
            this.Payment = new PaymentViewModel();
            this.TotalCount = 0;
            this.TotalAmount = 0;
        }
    }
