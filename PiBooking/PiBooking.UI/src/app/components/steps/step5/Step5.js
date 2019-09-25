var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { autoinject } from 'aurelia-framework';
import { sessionService } from '../../../services/sessionService';
import { stepsEnabledService } from '../../../services/stepsEnabledService';
import { RemoteTSService } from '../../../services/RemoteTSService';
import { environment } from '../../../environment/environment';
import { Router } from 'aurelia-router';
var Step5 = (function () {
    function Step5(stepsEnabled, sess, remote, env, myrouter) {
        this.stepsEnabled = stepsEnabled;
        this.remote = remote;
        this.env = env;
        this.myrouter = myrouter;
        this.showErrors = false;
        this.currentOrder = sess.orderValue;
        var style = {
            base: {
                fontSize: '20px',
                lineHeight: '28px',
            }
        };
    }
    Step5.prototype.attached = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.card.mount('#card-element');
                return [2];
            });
        });
    };
    Step5.prototype.canActivate = function () {
        if (this.stepsEnabled.step5.enabled) {
            return true;
        }
        else
            return false;
    };
    Step5.prototype.BookTime = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, token, error, errorElement, returnValue, ex_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.stripe.createToken(this.card)];
                    case 1:
                        _a = _b.sent(), token = _a.token, error = _a.error;
                        errorElement = document.getElementById('errors');
                        if (!error) return [3, 2];
                        console.log(error);
                        errorElement.textContent = error.message;
                        this.showErrors = true;
                        return [3, 6];
                    case 2:
                        this.currentOrder.Payment.PaymentConfirmationId = token.id;
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 5, , 6]);
                        return [4, this.remote.BookTime(this.currentOrder)];
                    case 4:
                        returnValue = _b.sent();
                        this.myrouter.navigateToRoute("stepfinished");
                        return [3, 6];
                    case 5:
                        ex_1 = _b.sent();
                        errorElement.textContent = ex_1.message;
                        console.log(ex_1);
                        this.showErrors = true;
                        return [3, 6];
                    case 6: return [2];
                }
            });
        });
    };
    Step5 = __decorate([
        autoinject,
        __metadata("design:paramtypes", [stepsEnabledService, sessionService, RemoteTSService, environment, Router])
    ], Step5);
    return Step5;
}());
export { Step5 };
//# sourceMappingURL=Step5.js.map