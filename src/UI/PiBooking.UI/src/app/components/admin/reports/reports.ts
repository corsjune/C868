/// <reference types="ej.web.all" />
import * as $ from 'jquery';
import { autoinject } from 'aurelia-framework';

import { OrderViewModel, PaymentViewModel, TimeSlotViewModel } from 'app/models'
import environment from 'environment';




@autoinject
export class Reports {
    private _baseUrl: string;
    private _reporturl: string;
    private parameters: any;
    private reportpath: string;

    constructor() {
        var self = this;
        this._baseUrl = environment.remoteSessionUrl;

        this._reporturl = environment.remoteSessionUrl + 'Report';


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