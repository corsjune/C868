import { OrderViewModel } from 'app/models'

export class sessionService {

    public orderValue: OrderViewModel;

    constructor() {
        this.orderValue = new OrderViewModel();
    }
}
