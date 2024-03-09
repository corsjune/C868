/// <reference types="ej.web.all" />
import * as $ from 'jquery';
import { autoinject, inject } from 'aurelia-framework';
import { sessionService } from '../../../services/sessionService'
import { stepsEnabledService } from '../../../services/stepsEnabledService'

import * as Enumerable from 'linq'
import * as moment from 'moment'
import { ValidationController, ValidationControllerFactory, ValidationRules, Validator, validateTrigger } from 'aurelia-validation';
import { OrderViewModel } from 'app/models'
import { BootstrapFormRenderer } from '../../customrenderer/customrenderer'
import { Router } from 'aurelia-router';
import { Endpoint, Rest } from 'aurelia-api';

@autoinject
export class Step2 {

    public currentOrder: OrderViewModel;
    public validate: ValidationController;


    constructor(public stepsEnabled: stepsEnabledService, sess: sessionService, val: ValidationControllerFactory, private validator: Validator, private myrouter: Router) {
        var self = this;

        self.currentOrder = sess.orderValue;
        self.validate = val.createForCurrentScope();
        self.validate.addRenderer(new BootstrapFormRenderer());
        self.validate.subscribe(event => this.validateWhole());
        self.validate.validateTrigger = validateTrigger.changeOrBlur;

        ValidationRules
            .ensure('email').required().email()
            .ensure('firstName').required()
            .ensure('lastName').required()
            .ensure('address').required()
            .ensure('city').required()
            .ensure('state').required()
            .ensure('phone').required()
            .ensure('zipCode').required()
            .on(self.currentOrder.customer);
    }

    private validateWhole() {
        this.validator.validateObject(this.currentOrder.customer)
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
            this.myrouter.navigateToRoute("step3");
        } catch (ex) {
            console.log(ex); //eat any errors
        }

    }
}