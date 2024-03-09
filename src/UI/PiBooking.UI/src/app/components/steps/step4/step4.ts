/// <reference types="ej.web.all" />
import * as $ from 'jquery';
import { autoinject } from 'aurelia-framework';
import { OrderViewModel } from 'app/models'
import { sessionService } from '../../../services/sessionService'
import { stepsEnabledService } from '../../../services/stepsEnabledService'

@autoinject
export class Step4 {

    public gridData: any;
    public gridSort: any;
    public currentOrder: OrderViewModel;

    public mySignature: any;

    constructor(public stepsEnabled: stepsEnabledService, sess: sessionService) {
        var self = this;
        self.currentOrder = sess.orderValue;

        this.gridData = [];
        this.gridSort = { sortedColumns: [{ field: 'beginDatetime', direction: 'ascending' }, { field: 'Rate' }] };

    }

    async activate() {
        var self = this;
        let myTimeSlots = self.currentOrder.timeSlots.slice(0);
        this.gridData = myTimeSlots;
        this.stepsEnabled.step5.enabled = true;
    }

    canActivate() {
        if (this.stepsEnabled.step4.enabled) {
            return true;
        } else return false;
    }

    get canSave() {
        return this.stepsEnabled.step5.enabled;
    }

    async deactivate() {
        this.currentOrder.signature = this.mySignature._canvas[0].toDataURL();
    }
}