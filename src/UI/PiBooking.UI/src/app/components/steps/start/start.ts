/// <reference types="ej.web.all" />

import { autoinject, inject } from 'aurelia-framework';
import { sessionService } from '../../../services/sessionService'
import { stepsEnabledService } from '../../../services/stepsEnabledService'
import { ValidationController, ValidationControllerFactory, ValidationRules, Validator, validateTrigger } from 'aurelia-validation';
import { OrderViewModel, TimeSlotViewModel, EngineerViewModel } from 'app/models'
import { Router } from 'aurelia-router';
import { Endpoint, Rest } from 'aurelia-api';

@autoinject
export class Step0 {

    public currentOrder: OrderViewModel;
    private engineerID: number;
    private engineers: EngineerViewModel[];


    constructor(@inject(Endpoint.of('api')) public apiEndpoint: Rest, public stepsEnabled: stepsEnabledService, sess: sessionService, val: ValidationControllerFactory, private validator: Validator, private myrouter: Router) {
        var self = this;

        self.currentOrder = sess.orderValue;
    }



    private engineerChanged() {

        if (this.currentOrder.engineer == null || this.currentOrder.engineer.engineerID === this.engineerID) {
            this.currentOrder.engineer = this.engineers.filter(x => x.engineerID === this.engineerID).pop();
        }

        if (this.currentOrder.engineer.engineerID !== this.engineerID) {

            if (this.currentOrder.timeSlots.length) {
                let result = confirm('Are you sure you wish to change this engineer. This will remove any selected timeslots.');
                if (result) {
                    this.currentOrder.engineer = this.engineers.filter(x => x.engineerID === this.engineerID).pop();
                    this.currentOrder.timeSlots = new Array<TimeSlotViewModel>();

                }
                else {

                    this.engineerID = this.currentOrder.engineer.engineerID;
                }
            }
            else {
                this.currentOrder.engineer = this.engineers.filter(x => x.engineerID === this.engineerID).pop();
                this.currentOrder.timeSlots = new Array<TimeSlotViewModel>();
            }

        }

        this.stepsEnabled.step1.enabled = !!this.currentOrder.engineer;
    }



    async activate(params) {

        this.engineers = await this.apiEndpoint.find('engineer');
        this.engineerID = this.currentOrder.engineer && this.currentOrder.engineer.engineerID || null;
    }


    async Step1() {

        try {

            this.myrouter.navigateToRoute("step1");
        } catch (ex) {
            console.log(ex); //eat any errors
        }

    }
}