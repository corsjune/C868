var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
import { inject, autoinject } from 'aurelia-framework';
import { Endpoint, Rest } from 'aurelia-api';
import { ValidationControllerFactory, Validator, ValidationRules, validateTrigger } from 'aurelia-validation';
import { Router } from 'aurelia-router';
import { BootstrapFormRenderer } from '../../customrenderer/customrenderer';
var BookingsDetails = (function () {
    function BookingsDetails(apiEndpoint, val, validator, myrouter) {
        var _this = this;
        this.apiEndpoint = apiEndpoint;
        this.validator = validator;
        this.myrouter = myrouter;
        this.errors = null;
        this.message = null;
        var self = this;
        self.validate = val.createForCurrentScope();
        self.validate.addRenderer(new BootstrapFormRenderer());
        self.validate.subscribe(function (event) { return _this.validateWhole(); });
        self.validate.validateTrigger = validateTrigger.changeOrBlur;
        ValidationRules.customRule('integerRange', function (value, obj, min, max) {
            var num = Number.parseInt(value);
            return num === null || num === undefined || (Number.isInteger(num) && num >= min && num <= max);
        }, "${$displayName} must be an integer between ${$config.min} and ${$config.max}.", function (min, max) { return ({ min: min, max: max }); });
    }
    BookingsDetails.prototype.bind = function () {
        ValidationRules
            .ensure('Total').required().between(-9999999999999, 9999999999999)
            .on(this.order);
    };
    BookingsDetails.prototype.Save = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self, savedOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.errors = null;
                        this.message = null;
                        self = this;
                        if (!(this.order.OrderID != null)) return [3, 2];
                        return [4, this.apiEndpoint.update('order', this.order.OrderID, this.order)];
                    case 1:
                        savedOrder = _a.sent();
                        return [3, 2];
                    case 2:
                        if (savedOrder != null) {
                            this.order = savedOrder;
                            this.message = "Order has been saved.";
                            this.cansave = false;
                        }
                        return [2];
                }
            });
        });
    };
    BookingsDetails.prototype.validateWhole = function () {
        var _this = this;
        this.validator.validateObject(this.order)
            .then(function (results) { return _this.cansave = results.every(function (result) { return result.valid; }); });
    };
    Object.defineProperty(BookingsDetails.prototype, "canSave", {
        get: function () {
            return this.cansave;
        },
        enumerable: true,
        configurable: true
    });
    BookingsDetails.prototype.activate = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!params.id) return [3, 2];
                        _a = this;
                        return [4, this.apiEndpoint.find('order', params.id)];
                    case 1:
                        _a.order = _b.sent();
                        _b.label = 2;
                    case 2: return [2];
                }
            });
        });
    };
    BookingsDetails = __decorate([
        autoinject(),
        __param(0, inject(Endpoint.of('api'))),
        __metadata("design:paramtypes", [Rest, ValidationControllerFactory, Validator, Router])
    ], BookingsDetails);
    return BookingsDetails;
}());
export { BookingsDetails };
//# sourceMappingURL=bookingsdetails.js.map