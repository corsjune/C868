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
import { Router } from 'aurelia-router';
var Bookings = (function () {
    function Bookings(apiEndpoint, router) {
        this.apiEndpoint = apiEndpoint;
        this.router = router;
        this.errors = null;
        this.message = null;
    }
    Bookings.prototype.filterChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.filtercustomerID) return [3, 2];
                        _a = this;
                        return [4, this.apiEndpoint.find('order/GetByCustomer', {
                                customerID: this.filtercustomerID
                            })];
                    case 1:
                        _a.orders = _c.sent();
                        return [3, 4];
                    case 2:
                        _b = this;
                        return [4, this.apiEndpoint.find('order')];
                    case 3:
                        _b.orders = _c.sent();
                        _c.label = 4;
                    case 4: return [2];
                }
            });
        });
    };
    Bookings.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var self, result, deletedEngineer, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        self = this;
                        result = confirm('Are you sure you wish to delete this booking ?');
                        if (!result) return [3, 3];
                        return [4, this.apiEndpoint.destroyOne('order', id)
                                .catch(function (e) {
                                self.errors = "An error has occurred. The booking did not save. Please review the data and try again!";
                            })];
                    case 1:
                        deletedEngineer = _b.sent();
                        _a = this;
                        return [4, this.apiEndpoint.find('order')];
                    case 2:
                        _a.orders = _b.sent();
                        _b.label = 3;
                    case 3: return [2];
                }
            });
        });
    };
    Bookings.prototype.edit = function (id) {
        this.router.navigateToRoute('bookingsdetails', { id: id });
    };
    Bookings.prototype.activate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this;
                        return [4, this.apiEndpoint.find('order')];
                    case 1:
                        _a.orders = _c.sent();
                        _b = this;
                        return [4, this.apiEndpoint.find('order/GetAllCustomers')];
                    case 2:
                        _b.allcustomers = _c.sent();
                        return [2];
                }
            });
        });
    };
    Bookings = __decorate([
        autoinject(),
        __param(0, inject(Endpoint.of('api'))),
        __metadata("design:paramtypes", [Rest, Router])
    ], Bookings);
    return Bookings;
}());
export { Bookings };
//# sourceMappingURL=bookings.js.map