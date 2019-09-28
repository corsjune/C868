/// <reference types="ej.web.all" />
import * as $ from 'jquery';
import { autoinject, inject } from 'aurelia-framework';
import { sessionService } from '../../../services/sessionService'
import { stepsEnabledService } from '../../../services/stepsEnabledService'

import * as Enumerable from 'linq'
import * as moment from 'moment'
import { ValidationController, ValidationControllerFactory, ValidationRules, Validator, validateTrigger } from 'aurelia-validation';
import { OrderViewModel, TimeSlotViewModel, EngineerViewModel } from 'app/models'
import { BootstrapFormRenderer } from '../../customrenderer/customrenderer' 
import { Router } from 'aurelia-router';
import { Endpoint, Rest } from 'aurelia-api';

@autoinject
export class Step0 {

    public currentOrder: OrderViewModel;
    private engineerID: number; 
    private engineers: EngineerViewModel[];


    constructor(@inject(Endpoint.of('api')) public apiEndpoint: Rest, public stepsEnabled: stepsEnabledService, sess: sessionService,  val: ValidationControllerFactory, private validator: Validator, private myrouter: Router) {
        var self = this;

        self.currentOrder = sess.orderValue; 
    }

 

    private engineerChanged() { 
 
        if (this.currentOrder.Engineer == null || this.currentOrder.Engineer.EngineerID === this.engineerID) {
            this.currentOrder.Engineer = this.engineers.filter(x => x.EngineerID === this.engineerID).pop();
        }

        if (this.currentOrder.Engineer.EngineerID !== this.engineerID) {

            if (this.currentOrder.TimeSlots.length) {
                let result = confirm('Are you sure you wish to change this engineer. This will remove any selected timeslots.');
                if (result) {
                    this.currentOrder.Engineer = this.engineers.filter(x => x.EngineerID === this.engineerID).pop();
                    this.currentOrder.TimeSlots = new Array<TimeSlotViewModel>();

                }
                else {

                    this.engineerID = this.currentOrder.Engineer.EngineerID;
                }
            }
            else {
                this.currentOrder.Engineer = this.engineers.filter(x => x.EngineerID === this.engineerID).pop();
                this.currentOrder.TimeSlots = new Array<TimeSlotViewModel>();
            }

         }
  
        this.stepsEnabled.step1.enabled = !! this.currentOrder.Engineer;
    } 

 

    async activate(params) { 

        this.engineers = await this.apiEndpoint.find('engineer');
        this.engineerID = this.currentOrder.Engineer && this.currentOrder.Engineer.EngineerID || null;
    }


    async Step1() {

        try { 

            this.myrouter.navigateToRoute("step1");
        } catch (ex) {
            console.log(ex); //eat any errors
        }

    }
}