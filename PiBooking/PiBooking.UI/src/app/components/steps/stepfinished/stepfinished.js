var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { autoinject } from 'aurelia-framework';
import { sessionService } from '../../../services/sessionService';
import { ValidationControllerFactory, Validator } from 'aurelia-validation';
import { OrderViewModel, PaymentViewModel } from 'app/models';
var StepFinished = (function () {
    function StepFinished(sess, val, validator) {
        this.validator = validator;
        var self = this;
        this.currentOrder = new OrderViewModel();
        this.currentOrder.Customer = sess.orderValue.Customer;
        this.currentOrder.Job = sess.orderValue.Job;
        this.currentOrder.Job.JobID = "";
        this.currentOrder.TimeSlots = new Array();
        this.currentOrder.Payment = new PaymentViewModel();
        this.currentOrder.TotalCount = 0;
        this.currentOrder.TotalAmount = 0;
        sess.orderValue = this.currentOrder;
    }
    StepFinished = __decorate([
        autoinject,
        __metadata("design:paramtypes", [sessionService, ValidationControllerFactory, Validator])
    ], StepFinished);
    return StepFinished;
}());
export { StepFinished };
//# sourceMappingURL=stepfinished.js.map