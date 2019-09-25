/// <reference types="ej.web.all" />
import * as $ from 'jquery';
import { autoinject } from 'aurelia-framework';
import { sessionService } from '../../../services/sessionService'
import { stepsEnabledService } from '../../../services/stepsEnabledService'

import * as Enumerable from 'linq'
import * as moment from 'moment'
import { ValidationController, ValidationControllerFactory, ValidationRules, Validator, validateTrigger } from 'aurelia-validation';
import { OrderViewModel } from 'app/models'
import { BootstrapFormRenderer } from '../../customrenderer/customrenderer'
import { RemoteTSService } from "../../../services/RemoteTSService";
import { Router } from 'aurelia-router';

@autoinject
export class Step2 {

    public currentOrder: OrderViewModel;
    public validate: ValidationController; 
 

    constructor(public stepsEnabled: stepsEnabledService, sess: sessionService, private remote: RemoteTSService, val: ValidationControllerFactory, private validator: Validator, private myrouter: Router) {
        var self = this;
 
        self.currentOrder = sess.orderValue;
        self.validate = val.createForCurrentScope();
        self.validate.addRenderer(new BootstrapFormRenderer());
        self.validate.subscribe(event => this.validateWhole());
        self.validate.validateTrigger = validateTrigger.changeOrBlur;

        ValidationRules
            .ensure('Email').required().email()
            .ensure('FirstName').required()
            .ensure('LastName').required()
            .ensure('Address').required()
            .ensure('City').required()
            .ensure('State').required()
            .ensure('Phone').required()
            .ensure('ZipCode').required()
            .on(self.currentOrder.Customer);
    }

    private validateWhole() {
        this.validator.validateObject(this.currentOrder.Customer)
            .then(results => this.stepsEnabled.step3.enabled = results.every(result => result.valid));
    }

    get canSave() {
        return this.stepsEnabled.step3.enabled;
    }

    canActivate() {
        if (this.stepsEnabled.step2.enabled) {
            return true;
        } else return false;
    }

    async Step3() { 

        try {
            await this.remote.UpdateProgress(this.currentOrder);
            this.myrouter.navigateToRoute("step3");
        } catch (ex) {
            console.log(ex); //eat any errors
        }

    }
}