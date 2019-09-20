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

    delete(id:number)
    {
        alert('delete' + id);
    }

    edit(id:number)
    {
        this.router.navigateToRoute('engineerdetails', { id: id }); 
    }

    async activate() {
        this.engineers = await this.apiEndpoint.find('engineer'); 
    }
}
