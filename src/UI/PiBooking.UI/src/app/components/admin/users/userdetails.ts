import { inject, autoinject } from 'aurelia-framework';
import { Endpoint, Rest } from 'aurelia-api';
import { UserViewModel } from 'app/models';
import { ValidationControllerFactory, Validator, ValidationController, ValidationRules, validateTrigger } from 'aurelia-validation';
import { Router } from 'aurelia-router';
import { BootstrapFormRenderer } from '../../customrenderer/customrenderer';


@autoinject()
export class UserDetails {

    cansave: boolean;

    errors: string = null;
    message: string = null;

    user: UserViewModel;
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
            .ensure('firstName').required()
            .ensure('lastName').required()
            .ensure('username').required()
            .ensure('password').required()
            .on(this.user);
    }

    async Save() {

        this.errors = null;
        this.message = null;
        let self = this;

        let savedUser: UserViewModel;

        if (this.user.id != null) {

            savedUser = await this.apiEndpoint.update('user', this.user.id, this.user);
        }
        else {

            savedUser = await this.apiEndpoint.post('user', this.user);
        }

        if (savedUser != null) {
            this.user = savedUser;

            this.message = "User has been saved.";
            this.cansave = false;
        }
    }

    private validateWhole() {
        this.validator.validateObject(this.user)
            .then(
                results => this.cansave = results.every(result => result.valid)
            );
    }

    get canSave() {
        return this.cansave;
    }

    async activate(params) {

        if (params.id) {
            this.user = await this.apiEndpoint.find('user', params.id);
        }
        else {
            this.user = new UserViewModel();
        }

    }
}
