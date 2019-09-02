
import { CustomerModel } from '../models/CustomerModel'
import { JobModel } from '../models/JobModel'
import { TimeSlotModel } from '../models/TimeSlotModel'
import { PaymentModel } from '../models/PaymentModel'

    export class OrderModel { 
        public Customer: CustomerModel;
        public Job: JobModel;
        public TimeSlots: TimeSlotModel[];
        public Payment: PaymentModel;
        public TotalAmount: number;
        public TotalCount: number;
        public Signature:string;

        constructor() {

            this.Customer = new CustomerModel();
            this.Job = new JobModel();
            this.TimeSlots = new Array<TimeSlotModel>();
            this.Payment = new PaymentModel();
            this.TotalCount = 0;
            this.TotalAmount = 0;
        }
    }
