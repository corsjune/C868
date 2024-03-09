import { json } from 'aurelia-fetch-client';
/// <reference types="ej.web.all" />
import * as $ from 'jquery';
import { autoinject, inject } from 'aurelia-framework';
import { sessionService } from '../../../services/sessionService'
import { stepsEnabledService } from '../../../services/stepsEnabledService'

import * as Enumerable from 'linq'
import * as moment from 'moment'
import { OrderViewModel } from 'app/models'
import { environment } from '../../../environment/environment';
import { Router } from 'aurelia-router';
import { Endpoint, Rest } from 'aurelia-api';
declare var Stripe: any;


@autoinject
export class Step5 {


    private stripe: any;
    private card: any;
    public currentOrder: OrderViewModel;
    public showErrors: boolean;

    constructor(@inject(Endpoint.of('api')) public apiEndpoint: Rest, public stepsEnabled: stepsEnabledService, sess: sessionService, private env: environment, private myrouter: Router) {

        this.showErrors = false;
        this.currentOrder = sess.orderValue;


        //the production version (not the academic one) will use Stripe for CC processing
        //this.stripe = Stripe(env.stripePK); 
        //var elements = this.stripe.elements();
        const style = {
            base: {
                // Add your base input styles here. For example:
                fontSize: '20px',
                lineHeight: '28px',
            }
        };

        // Create an instance of the card Element
        //this.card = elements.create('card', { style });

    }

    async attached() {

        // Add an instance of the card UI component into the `card-element` <div>
        this.card.mount('#card-element');

    }

    canActivate() {
        if (this.stepsEnabled.step5.enabled) {
            return true;
        } else return false;
    }


    /* future CC processing */
    async BookTimeO() {

        const { token, error } = await this.stripe.createToken(this.card);
        const errorElement = document.getElementById('errors');

        if (error) {
            console.log(error);
            // Inform the user if there was an error 
            errorElement.textContent = error.message;
            this.showErrors = true;
        }
        else {
            this.currentOrder.payment.paymentConfirmationId = token.id;

            try {

                this.myrouter.navigateToRoute("stepfinished");
            } catch (ex) {
                errorElement.textContent = ex.message;
                console.log(ex);
                this.showErrors = true;
            }

        }

    }

    async BookTime() {
        const errorElement = document.getElementById('errors');

        try {
            let response: OrderViewModel = await this.apiEndpoint.post('order', this.currentOrder);

            if (response.orderID > 0) {
                this.myrouter.navigateToRoute("stepfinished");
            }

        }
        catch (response) {
            errorElement.textContent = (await response.json()).Message;
            this.showErrors = true;
        }

    }
}