
import { CustomerViewModel } from './CustomerViewModel'
import { JobViewModel } from './JobViewModel'
import { TimeSlotViewModel } from './TimeSlotViewModel'
import { PaymentViewModel } from './PaymentViewModel'
import { EngineerViewModel } from './EngineerViewModel'

    export class OrderViewModel { 
        public Customer: CustomerViewModel;
        public Job: JobViewModel;
        public TimeSlots: TimeSlotViewModel[];
        public Payment: PaymentViewModel;
        public TotalAmount: number;
        public TotalCount: number;
        public Signature: string;
        public Engineer: EngineerViewModel = null;

        constructor() {

            this.Customer = new CustomerViewModel();
            this.Job = new JobViewModel();
            this.TimeSlots = new Array<TimeSlotViewModel>();
            this.Payment = new PaymentViewModel();
            this.TotalCount = 0;
            this.TotalAmount = 0;
        }
    }
