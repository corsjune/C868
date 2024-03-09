import { inject, autoinject } from 'aurelia-framework';
import { Endpoint, Rest } from 'aurelia-api';
import { EngineerViewModel, OrderViewModel, CustomerViewModel } from 'app/models';
import { Router } from 'aurelia-router';

@autoinject()
export class Bookings {

    errors: string = null;
    message: string = null; 
    orders: OrderViewModel[];
    filtercustomerID: null;
    allcustomers: CustomerViewModel[];


    constructor(@inject(Endpoint.of('api')) public apiEndpoint: Rest, private router: Router) {
 
    }

    async filterChanged() {
        if (this.filtercustomerID) {
            this.orders = await this.apiEndpoint.find('order/GetByCustomer',
                {
                    customerID: this.filtercustomerID
                }); 
        }
        else {
            this.orders = await this.apiEndpoint.find('order');
        }
    }

    async delete(id:number)
    {
        let self = this;

        let result = confirm('Are you sure you wish to delete this booking ?');

        if (result) {

            let deletedEngineer = await this.apiEndpoint.destroyOne('order', id)
                .catch(
                    e => {
                        self.errors = "An error has occurred. The booking did not save. Please review the data and try again!"
                    });

            this.orders = await this.apiEndpoint.find('order'); 
        }
    }

    edit(id:number)
    {
        this.router.navigateToRoute('bookingsdetails', { id: id }); 
    }

    async activate() {
        this.orders = await this.apiEndpoint.find('order');
        this.allcustomers = await this.apiEndpoint.find('order/GetAllCustomers');
        
    }
}
