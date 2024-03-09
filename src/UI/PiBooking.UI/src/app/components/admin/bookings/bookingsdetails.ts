import { inject, autoinject } from 'aurelia-framework';
import { Endpoint, Rest } from 'aurelia-api';
import { EngineerViewModel, OrderViewModel } from 'app/models';
import { ValidationControllerFactory, Validator, ValidationController, ValidationRules, validateTrigger } from 'aurelia-validation';
import { Router } from 'aurelia-router';
import { BootstrapFormRenderer } from '../../customrenderer/customrenderer';


@autoinject()
export class BookingsDetails {

    cansave: boolean;

    errors: string = null;
    message: string = null;

    order: OrderViewModel;
    public validate: ValidationController;


    constructor(@inject(Endpoint.of('api')) public apiEndpoint: Rest, val: ValidationControllerFactory, private validator: Validator, private myrouter: Router) {

        var self = this;

        //self.currentOrder = sess.orderValue;
        self.validate = val.createForCurrentScope();
        self.validate.addRenderer(new BootstrapFormRenderer());
        self.validate.subscribe(event => this.validateWhole());
        self.validate.validateTrigger = validateTrigger.changeOrBlur;

        //Code was adapted from the following reference
        //http://www.sobell.net/aurelia-validation-part-3-custom-rules-and-validations/
        ValidationRules.customRule(
            'integerRange',
            (value, obj, min, max) => {
                var num = Number.parseInt(value);
                return num === null || num === undefined || (Number.isInteger(num) && num >= min && num <= max);
            },
            "${$displayName} must be an integer between ${$config.min} and ${$config.max}.",
            (min, max) => ({ min, max })
        );
    }

    bind() {
        ValidationRules
            .ensure('total').required().between(-9999999999999, 9999999999999)
            .on(this.order);
    }

    async Save() {

        this.errors = null;
        this.message = null;
        let self = this;

        let savedOrder: OrderViewModel;

        if (this.order.orderID != null) {

            savedOrder = await this.apiEndpoint.update('order', this.order.orderID, this.order);
        }
        else {
            //not applicable
        }

        if (savedOrder != null) {
            this.order = savedOrder;

            this.message = "Order has been saved.";
            this.cansave = false;
        }
    }

    private validateWhole() {
        this.validator.validateObject(this.order)
            .then(
                results => this.cansave = results.every(result => result.valid)
            );
    }

    get canSave() {
        return this.cansave;
    }

    async activate(params) {

        if (params.id) {
            this.order = await this.apiEndpoint.find('order', params.id);
        }

    }
}
