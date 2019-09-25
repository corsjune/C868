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
import { HttpClient } from 'aurelia-fetch-client';
import { autoinject } from 'aurelia-framework';
import { RemoteTSService } from '../../../services/RemoteTSService';
import { sessionService } from '../../../services/sessionService';
import { stepsEnabledService } from '../../../services/stepsEnabledService';
import * as Enumerable from 'linq';
import * as moment from 'moment';
var Step1 = (function () {
    function Step1(stepsEnabled, http, x, sess) {
        this.stepsEnabled = stepsEnabled;
        this.currentOrder = sess.orderValue;
        this.remoteTS = x;
        this.TimeSlots = new Object();
        this.TimeInterval = {
            minorSlotCount: 1,
            majorSlot: 60
        };
        this.MinDate = moment().startOf('week').toDate();
        this.MaxDate = moment().add(45, 'days').endOf('week').toDate();
        this.Views = ['workweek'];
        this.WorkHours = { start: 8, end: 20, highlight: false };
        this.myWorkWeek = ['Sunday', 'Monday', 'Tuesday', 'Friday', 'Saturday'];
        this.AppointmentList = {
            id: 'TimeslotId',
            subject: 'Rate',
            startTime: 'BeginDatetime',
            description: 'Rate',
            endTime: 'EndDatetime'
        };
    }
    Step1.prototype.refreshTotals = function (appointments) {
        var count = 0;
        this.currentOrder.TotalAmount = appointments.reduce(function (previousValue, currentValue, currentIndex, array) {
            count++;
            return previousValue + currentValue.Rate;
        }, 0);
        this.currentOrder.TotalCount = count;
        this.stepsEnabled.step2.enabled = this.currentOrder.TotalCount > 0 ? true : false;
    };
    Step1.prototype.onClick = function (event) {
        var args = event.detail;
        if (args.type == "cellClick") {
            var ts = this.TimeSlots[args.startTime.getTime()];
            if (ts != null) {
                this.mySched.saveAppointment(Object.assign({}, ts));
                this.refreshTotals(this.mySched.getAppointments());
            }
        }
        else if (args.type == "appointmentClick") { }
    };
    Step1.prototype.onAppointmentClick = function (event) {
        var args = event.detail;
        this.mySched.deleteAppointment(args.appointment);
    };
    Step1.prototype.appointmentRemoved = function (event) {
        this.refreshTotals(this.mySched.getAppointments());
    };
    Step1.prototype.onAppointmentWindowOpen = function (event) {
        var args = event.detail;
        args.cancel = true;
    };
    Step1.prototype.check = function (event) {
        var args = event.detail;
        switch (args.requestType) {
            case 'workcells':
                var text = void 0;
                if (ej.isNullOrUndefined(this.TimeSlots)) {
                    text = "Not Available";
                    args.element.html("<div class=\"caption\">Loading</div>");
                }
                else {
                    var ts = void 0;
                    if (args.cell.startTime != null) {
                        ts = this.TimeSlots[args.cell.startTime.getTime()];
                    }
                    if (ts != null) {
                        text = ts.Rate;
                        args.element.html("Book for $" + text);
                        args.element.addClass('white-background');
                    }
                    else {
                        args.element.html('');
                        args.element.removeClass('white-background');
                    }
                }
                break;
            case 'monthcells':
                break;
            case 'alldaycells':
                break;
            case 'headercells':
                break;
            case 'appointment':
                break;
            default:
                break;
        }
    };
    Step1.prototype.deactivate = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.currentOrder.TimeSlots = this.mySched.getAppointments();
                return [2];
            });
        });
    };
    Object.defineProperty(Step1.prototype, "canSave", {
        get: function () {
            return this.stepsEnabled.step2.enabled;
        },
        enumerable: true,
        configurable: true
    });
    Step1.prototype.activate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var myTimeSlots, data, myDictionary, sortedValues, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        myTimeSlots = this.currentOrder.TimeSlots.slice(0);
                        this.AppointmentList.dataSource = myTimeSlots;
                        this.refreshTotals(myTimeSlots);
                        return [4, this.remoteTS.GetTimeSlots(this.MinDate, this.MaxDate)];
                    case 1:
                        data = _a.sent();
                        myDictionary = data.filter(function (x) {
                            return x.IsBooked === false;
                        });
                        myDictionary.forEach(function (x) {
                            _this.TimeSlots[new Date(x.BeginDatetime).getTime()] = {
                                BeginDatetime: new Date(x.BeginDatetime),
                                EndDatetime: new Date(x.EndDatetime),
                                Rate: x.Rate,
                                IsBooked: x.IsBooked,
                                TimeslotId: x.TimeslotId
                            };
                        });
                        sortedValues = Enumerable.from(data).where(function (x) { return x.IsBooked === false; }).orderBy(function (x) { return x.Rate; }).thenBy(function (y) { return y.BeginDatetime; }).take(3).toArray();
                        this.example1 = sortedValues[0];
                        this.example2 = sortedValues[1];
                        this.example3 = sortedValues[2];
                        return [3, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error(error_1);
                        return [2, null];
                    case 3: return [2];
                }
            });
        });
    };
    Step1 = __decorate([
        autoinject,
        __metadata("design:paramtypes", [stepsEnabledService, HttpClient, RemoteTSService, sessionService])
    ], Step1);
    return Step1;
}());
export { Step1 };
//# sourceMappingURL=step1.js.map