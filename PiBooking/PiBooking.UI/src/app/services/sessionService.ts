import { OrderModel } from '../models/OrderModel'

export class sessionService {

    public orderValue:  OrderModel;  



    constructor() { 

        this.orderValue = new OrderModel(); 
 
    }
}
