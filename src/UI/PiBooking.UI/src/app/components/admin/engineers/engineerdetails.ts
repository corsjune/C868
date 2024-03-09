import { inject, autoinject } from 'aurelia-framework';
import { Endpoint, Rest } from 'aurelia-api';
import { EngineerViewModel } from 'app/models';
import { ValidationControllerFactory, Validator, ValidationController, ValidationRules, validateTrigger } from 'aurelia-validation';
import { Router } from 'aurelia-router';
import { BootstrapFormRenderer } from '../../customrenderer/customrenderer';


@autoinject()
export class EngineerDetails {

    cansave: boolean;

    errors: string = null;
    message: string = null;

    engineer: EngineerViewModel;
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
            .ensure('email').required().email()
            .ensure('firstName').required()
            .ensure('lastName').required()
            .ensure('phone').required()
            .ensure('rate').required().range(0, 20000)
            .ensure('employeeID').required().satisfiesRule('integerRange', 1, 75000)
            .on(this.engineer);
    }

    async Save() {

        this.errors = null;
        this.message = null;
        let self = this;




        let savedEngineer: EngineerViewModel;
        //BUGFIX:  the syncfusion is old and timeselection is not working
        this.engineer.workDayBeginTime = "08:00 AM";
        this.engineer.workDayEndTime = "7:00 PM";

        if (this.engineer.engineerID != null) {

            savedEngineer = await this.apiEndpoint.update('engineer', this.engineer.engineerID, this.engineer);
        }
        else {

            savedEngineer = await this.apiEndpoint.post('engineer', this.engineer);
        }

        if (savedEngineer != null) {
            this.engineer = savedEngineer;

            this.message = "Engineer has been saved.";
            this.cansave = false;
        }
    }

    private validateWhole() {
        this.validator.validateObject(this.engineer)
            .then(
                results => this.cansave = results.every(result => result.valid)
            );
    }

    get canSave() {
        return this.cansave;
    }

    async activate(params) {

        if (params.id) {
            this.engineer = await this.apiEndpoint.find('engineer', params.id);
        }
        else {
            this.engineer = new EngineerViewModel();
        }

    }
}
