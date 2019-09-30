/// <reference types="ej.web.all" />
import * as $ from 'jquery'; 
import { autoinject } from 'aurelia-framework'; 
 
import { OrderViewModel, PaymentViewModel, TimeSlotViewModel } from 'app/models'
import { environment } from 'app/environment/environment'; 
 
 


@autoinject 
export class Reports {
    private _baseUrl: string;
    private _reporturl: string;
    private parameters: any;
    private reportpath: string;

    constructor(private env: environment) {
        var self = this; 
        this._baseUrl = env.remoteSessionUrl;

        this._reporturl = env.remoteSessionUrl + '/api/Report';
         

    }

    activate(urlParams, routeMap, navInstr) {
        if (routeMap.name === "haspaid") {
            this.reportpath = "HasPaid.RDL"
        }
        else {
            this.reportpath = "Upcoming.RDL"
        }
    }

 
}