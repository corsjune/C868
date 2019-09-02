/// <reference types="ej.web.all" />
import * as $ from 'jquery'; 
import { autoinject } from 'aurelia-framework'; 
import { sessionService } from '../../../services/sessionService'

import * as Enumerable from 'linq'
import * as moment from 'moment'
import { ValidationController, ValidationControllerFactory, ValidationRules, Validator } from 'aurelia-validation';
import { OrderModel } from '../../../models/OrderModel'
import { BootstrapFormRenderer } from '../../customrenderer/customrenderer'
import { TimeSlotModel } from '../../../models/TimeSlotModel'
import { PaymentModel } from '../../../models/PaymentModel'


@autoinject 
export class StepFinished {
     
    public currentOrder: OrderModel;
    public validate: ValidationController;
    public isValid: boolean;


    constructor(sess: sessionService, val: ValidationControllerFactory, private validator: Validator ) {
        var self = this; 
        this.currentOrder = new OrderModel();
        this.currentOrder.Customer= sess.orderValue.Customer;
        this.currentOrder.Job= sess.orderValue.Job;
        this.currentOrder.Job.JobID= "";
        this.currentOrder.TimeSlots = new Array<TimeSlotModel>();
        this.currentOrder.Payment = new PaymentModel();
        this.currentOrder.TotalCount = 0;
        this.currentOrder.TotalAmount = 0;

        sess.orderValue= this.currentOrder;
    }

 
}