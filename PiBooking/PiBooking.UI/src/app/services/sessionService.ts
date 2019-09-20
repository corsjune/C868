import { OrderViewModel } from '../models/OrderModel'

export class sessionService {

    public orderValue:  OrderViewModel;  



    constructor() { 

        this.orderValue = new OrderViewModel(); 
 
    }
}
