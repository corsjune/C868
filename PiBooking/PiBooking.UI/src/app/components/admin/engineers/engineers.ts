import { inject, autoinject } from 'aurelia-framework';
import { Endpoint, Rest } from 'aurelia-api';
import { EngineerViewModel } from 'app/models';
import { Router } from 'aurelia-router';

@autoinject()
export class Engineers {

    errors: string = null;
    message: string = null; 
    engineers: EngineerViewModel[];

    constructor(@inject(Endpoint.of('api')) public apiEndpoint: Rest, private router: Router) {
 
    }

    add() {  
        this.router.navigateToRoute('engineerdetails', { id: null }); 
    }

    async delete(id:number)
    {
        let self = this;

        let result = confirm('Are you sure you wish to delete this engineer ?');

        if (result) {

            let deletedEngineer = await this.apiEndpoint.destroyOne('engineer', id)
                .catch(
                    e => {
                        self.errors = "An error has occurred. The engineer did not save. Please review the data and try again!"
                    });

            this.engineers = await this.apiEndpoint.find('engineer'); 
        }
    }

    edit(id:number)
    {
        this.router.navigateToRoute('engineerdetails', { id: id }); 
    }

    async activate() {
        this.engineers = await this.apiEndpoint.find('engineer'); 
    }
}
