/// <reference types="ej.web.all" />
import * as $ from 'jquery';
import { autoinject } from 'aurelia-framework';
import { sessionService } from '../../../services/sessionService'
import { stepsEnabledService } from '../../../services/stepsEnabledService'

import * as Enumerable from 'linq'
import * as moment from 'moment'

import { OrderViewModel } from 'app/models'
import { ValidationController, ValidationControllerFactory, ValidationRules, Validator, validateTrigger } from 'aurelia-validation';
import { BootstrapFormRenderer } from '../../customrenderer/customrenderer'
import { Router } from 'aurelia-router';

@autoinject
export class Step3 {

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
            .ensure('jobName').required()
            .ensure('jobDescription').required()
            .on(self.currentOrder.job);

    }

    private validateWhole() {
        this.validator.validateObject(this.currentOrder.job)
            .then(results => this.stepsEnabled.step4.enabled = results.every(result => result.valid));
    }

    get canSave() {
        return this.stepsEnabled.step4.enabled;
    }

    canActivate() {
        if (this.stepsEnabled.step3.enabled) {
            return true;
        } else return false;
    }

    async Step4() {


        try {
            this.myrouter.navigateToRoute("step4");
        } catch (ex) {
            console.log(ex); //eat any errors
        }

    }
}