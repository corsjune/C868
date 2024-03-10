/// <reference types="ej.web.all" />
import * as $ from 'jquery';
import { autoinject } from 'aurelia-framework';
import { sessionService } from '../../../services/sessionService'


import { ValidationController, ValidationControllerFactory, ValidationRules, Validator } from 'aurelia-validation';
import { OrderViewModel, PaymentViewModel, TimeSlotViewModel } from 'app/models'
import { BootstrapFormRenderer } from '../../customrenderer/customrenderer'



@autoinject
export class StepFinished {

    public currentOrder: OrderViewModel;
    public validate: ValidationController;
    public isValid: boolean;


    constructor(sess: sessionService, val: ValidationControllerFactory, private validator: Validator) {
        var self = this;
        this.currentOrder = new OrderViewModel();
        this.currentOrder.engineer = sess.orderValue.engineer;
        this.currentOrder.customer = sess.orderValue.customer;
        this.currentOrder.job = sess.orderValue.job;
        this.currentOrder.job.jobID = 0;
        this.currentOrder.timeSlots = new Array<TimeSlotViewModel>();
        this.currentOrder.payment = new PaymentViewModel();
        this.currentOrder.totalCount = 0;
        this.currentOrder.totalAmount = 0;

        sess.orderValue = this.currentOrder;
    }


}