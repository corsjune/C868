/// <reference types="ej.web.all" />
import * as $ from 'jquery';
import { autoinject } from 'aurelia-framework';
import { sessionService } from '../../../services/sessionService'
import { stepsEnabledService } from '../../../services/stepsEnabledService'

import * as Enumerable from 'linq'
import * as moment from 'moment'
import { OrderModel } from '../../../models/OrderModel'
import { RemoteTSService } from '../../../services/RemoteTSService' 
import { environment } from '../../../environment/environment'; 
import { Router } from 'aurelia-router';
declare var Stripe: any; 


@autoinject
export class Step5 {


    private stripe: any;
    private card: any;
    public currentOrder: OrderModel;
    public showErrors: boolean;

    constructor(public stepsEnabled: stepsEnabledService, sess: sessionService, private remote: RemoteTSService, private env:environment,private myrouter:Router) {

        this.showErrors = false;
        this.currentOrder = sess.orderValue;
        this.stripe = Stripe(env.stripePK);

        var elements = this.stripe.elements();
        const style = {
            base: {
                // Add your base input styles here. For example:
                fontSize: '20px',
                lineHeight: '28px',
            }
        };

        // Create an instance of the card Element
        this.card = elements.create('card', { style });

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


    async BookTime() {

        const { token, error } = await this.stripe.createToken(this.card);
        const errorElement = document.getElementById('errors');

        if (error)
        {
            console.log(error);
            // Inform the user if there was an error 
            errorElement.textContent = error.message;
            this.showErrors = true;
        }
        else
        {
            this.currentOrder.Payment.PaymentConfirmationId = token.id;

            try {
                let returnValue = await this.remote.BookTime(this.currentOrder);
                this.myrouter.navigateToRoute("stepfinished"); 
            } catch ( ex) { 
                errorElement.textContent = ex.message;
                console.log(ex);
                this.showErrors = true;
            }
         
        }

    }
}