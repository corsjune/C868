import { inject, autoinject } from 'aurelia-framework';
import { Endpoint, Rest } from 'aurelia-api';
import { UserViewModel } from 'app/models';
import { Router } from 'aurelia-router';

@autoinject()
export class Users {

    errors: string = null;
    message: string = null; 
    users: UserViewModel[];

    constructor(@inject(Endpoint.of('api')) public apiEndpoint: Rest, private router: Router) {
 
    }

    add() {  
        this.router.navigateToRoute('userdetails', { id: null }); 
    }

    async delete(id:number)
    {
        let self = this;

        let result = confirm('Are you sure you wish to delete this user ?');

        if (result) {

            let deletedEngineer = await this.apiEndpoint.destroyOne('user', id)
                .catch(
                    e => {
                        self.errors = "An error has occurred. The user did not delete. Please review the data and try again!"
                    });

            this.users = await this.apiEndpoint.find('user'); 
        }
    }

    edit(id:number)
    {
        this.router.navigateToRoute('userdetails', { id: id }); 
    }

    async activate() {
        this.users = await this.apiEndpoint.find('user'); 
    }
}
