/// <reference types="ej.web.all" />
import { inject, autoinject } from 'aurelia-framework';
import { Endpoint, Rest } from 'aurelia-api';
import { TimeSlotViewModel } from 'app/models';
import { Router } from 'aurelia-router';

@autoinject()
export class Timeslots {

    errors: string = null;
    message: string = null; 
    timeslots:any;

    constructor(@inject(Endpoint.of('api')) public apiEndpoint: Rest, private router: Router) {
 
    }

    add() {  
        this.router.navigateToRoute('timeslotdetails', { id: null }); 
    }

    async delete(id:number)
    {
        let self = this;

        let result = confirm('Are you sure you wish to delete this timeslot ?');

        if (result) {

            let deletedEngineer = await this.apiEndpoint.destroyOne('timeslot', id)
                .catch(
                    e => {
                        self.errors = "An error has occurred. The timeslot did not save. Please review the data and try again!"
                    });

            this.timeslots = ej.parseJSON(await this.apiEndpoint.find('timeslot')); ; 
        }
    }

    edit(id:number)
    {
        this.router.navigateToRoute('timeslotdetails', { id: id }); 
    }

    async activate() {
   
        this.timeslots = ej.parseJSON(await this.apiEndpoint.find('timeslot')); 

    }
}
