import { OrderViewModel, UserViewModel } from 'app/models'

export class sessionService {

    public orderValue: OrderViewModel;
    public currentUser: UserViewModel;

    constructor() {
        this.orderValue = new OrderViewModel();
         
    }
}
