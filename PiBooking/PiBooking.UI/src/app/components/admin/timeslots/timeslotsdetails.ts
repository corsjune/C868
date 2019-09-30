/// <reference types="ej.web.all" />
import { inject, autoinject } from 'aurelia-framework';
import { Endpoint, Rest } from 'aurelia-api';
import { TimeSlotViewModel, EngineerViewModel } from 'app/models'
import { ValidationControllerFactory, Validator, ValidationController, ValidationRules, validateTrigger } from 'aurelia-validation';
import { Router } from 'aurelia-router';
import { BootstrapFormRenderer } from '../../customrenderer/customrenderer';
 

@autoinject()
export class TimeslotsDetails {

    cansave: boolean; 

    errors: string = null;
    message: string = null; 
    engineers: EngineerViewModel[];
    timeslot: TimeSlotViewModel;
    statuses: any;

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
         
        this.statuses = [{ "TimeSlotStatusID": 1, "TimeSlotName": "Available" },
                        { "TimeSlotStatusID": 2, "TimeSlotName": "Not Available" },
                        { "TimeSlotStatusID": 10, "TimeSlotName": "Personal" },
                        { "TimeSlotStatusID": 11, "TimeSlotName": "Holiday" },
                        { "TimeSlotStatusID": 12, "TimeSlotName": "Vacation" },
                        { "TimeSlotStatusID": 13, "TimeSlotName": "Training" },
                        { "TimeSlotStatusID": 14, "TimeSlotName": "Sales" }];

    }

    bind() {
        ValidationRules 
            .ensure('BeginDatetime').required()
            .ensure('EndDatetime').required()
            .ensure('EngineerID').required()
            .ensure('Status').required()
            .on(this.timeslot);
    }

    startimeChanged(args) {
    
        if (args.detail.value) {
            
            this.timeslot.EndDatetime = new Date(Date.parse(args.detail.value) + (59 * 60000));
 
        }
    }

    async Save() {

        this.errors = null;
        this.message = null;
        let self = this;

        let savedTimeslot: TimeSlotViewModel; 
        if (this.timeslot.TimeslotId != null) {

            savedTimeslot = await this.apiEndpoint.update('timeslot', this.timeslot.TimeslotId, this.timeslot);
        }
        else {

            savedTimeslot = await this.apiEndpoint.post('timeslot', this.timeslot);
        } 

        if (savedTimeslot!= null) { 
            this.timeslot = savedTimeslot;

            this.message = "Timeslot has been saved.";
            this.cansave = false;
        }
    }

    private validateWhole() {
        this.validator.validateObject(this.timeslot)
            .then(
                results => this.cansave = results.every(result => result.valid)
            ); 
    }

  

    get canSave() {
        return this.cansave;
    }

    async activate(params) {

        if (params.id) {
            this.timeslot = await this.apiEndpoint.find('timeslot', params.id);
        }
        else  {
            this.timeslot = new TimeSlotViewModel();
        }

        this.engineers = await this.apiEndpoint.find('engineer');

    }
}
