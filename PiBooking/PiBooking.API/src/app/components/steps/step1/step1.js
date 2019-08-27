"use strict";
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
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference types="ej.web.all" />
var $ = require("jquery");
var aurelia_fetch_client_1 = require("aurelia-fetch-client");
var aurelia_framework_1 = require("aurelia-framework");
var TimeSlotFunction_1 = require("../../../services/TimeSlotFunction");
var QueryCellInfo = (function () {
    function QueryCellInfo(http, x) {
        var self = this;
        self.remoteTS = x;
        //grid
        self.gridData = [];
        self.gridSort = { sortedColumns: [{ field: 'BeginDatetime', direction: 'ascending' }, { field: 'Rate' }] };
        self.TimeSlots = new Object();
        self.TimeInterval = {
            minorSlotCount: 1,
            majorSlot: 60
        };
        self.MinDate = self.addHours(0, new Date(Date.now()));
        self.MaxDate = self.addHours(336, new Date(Date.now()));
        while (self.MaxDate.getDay() !== 6) {
            self.MaxDate = self.addHours(24, self.MaxDate); //we need to end this on a Saturday
        }
        while (self.MinDate.getDay() !== 0) {
            self.MinDate = self.addHours(-24, self.MinDate); //we need to end this on a Saturday
        }
        self.Views = ['workweek'];
        self.WorkHours = { start: 8, end: 20, highlight: false };
        self.AppointmentList = {
            id: 'TimeslotId',
            subject: 'Rate',
            startTime: 'BeginDatetime',
            description: 'Rate',
            endTime: 'EndDatetime'
        };
    }
    QueryCellInfo.prototype.addHours = function (hours, myDate) {
        myDate.setHours(myDate.getHours() + hours);
        return myDate;
    };
    QueryCellInfo.prototype.onClick = function (event) {
        var args = event.detail;
        var self = this;
        var sched = $("#Schedule8").data("ejSchedule");
        if (args.type == "cellClick") {
            var ts = self.TimeSlots[args.startTime.getTime()];
            if (ts != null) {
                sched.saveAppointment(Object.assign({}, ts));
                var appointments = sched.getAppointments();
                self.gridData = appointments.slice(0);
            }
        }
        else if (args.type == "appointmentClick") { }
    };
    QueryCellInfo.prototype.onAppointmentClick = function (event) {
        var args = event.detail;
        var self = this;
        var sched = $("#Schedule8").data("ejSchedule");
        sched.deleteAppointment(args.appointment);
        var appointments = sched.getAppointments();
        self.gridData = appointments.slice(0);
    };
    QueryCellInfo.prototype.onAppointmentWindowOpen = function (event) {
        var args = event.detail;
        var self = this;
        args.cancel = true;
    };
    QueryCellInfo.prototype.check = function (event) {
        var args = event.detail;
        var self = this;
        switch (args.requestType) {
            case 'workcells':
                var text = void 0;
                if (ej.isNullOrUndefined(self.TimeSlots)) {
                    text = "Not Available";
                    args.element.html("<div class=\"caption\">Loading</div>");
                }
                else {
                    var ts = void 0;
                    if (args.cell.startTime != null) {
                        ts = self.TimeSlots[args.cell.startTime.getTime()];
                    }
                    if (ts != null) {
                        text = ts.Rate;
                        args.element.html("Book for $" + text);
                        args.element.addClass('white-background');
                    }
                    else {
                        args.element.html('<span>   </span>');
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
    QueryCellInfo.prototype.activate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self, data, myDictionary, sortedValues, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        self = this;
                        return [4 /*yield*/, self.remoteTS.GetTimeSlotsForThisWeek(self.MinDate, self.MaxDate)];
                    case 1:
                        data = _a.sent();
                        self.AppointmentList.dataSource = data.filter(function (x) { return x.IsBooked === true; });
                        myDictionary = data.filter(function (x) { return x.IsBooked === false; });
                        myDictionary.forEach(function (x) {
                            self.TimeSlots[new Date(x.BeginDatetime).getTime()] = {
                                BeginDatetime: new Date(x.BeginDatetime),
                                EndDatetime: new Date(x.EndDatetime),
                                Rate: x.Rate,
                                IsBooked: x.IsBooked,
                                TimeslotId: x.TimeslotId
                            };
                        });
                        sortedValues = data.filter(function (x) { return x.IsBooked === false; }).splice(0);
                        //sort by rate
                        sortedValues.sort(function (left, right) {
                            if (left.Rate < right.Rate)
                                return -1;
                            if (left.Rate > right.Rate)
                                return 1;
                            return 0;
                        });
                        sortedValues = sortedValues.splice(0, 3);
                        //sort by date
                        sortedValues.sort(function (left, right) {
                            if (left.BeginDatetime < right.BeginDatetime)
                                return -1;
                            if (left.BeginDatetime > right.BeginDatetime)
                                return 1;
                            return 0;
                        });
                        self.example1 = sortedValues[0];
                        self.example2 = sortedValues[1];
                        self.example3 = sortedValues[2];
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error(error_1);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    QueryCellInfo = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [aurelia_fetch_client_1.HttpClient, TimeSlotFunction_1.TimeSlotFunction])
    ], QueryCellInfo);
    return QueryCellInfo;
}());
exports.QueryCellInfo = QueryCellInfo;
//# sourceMappingURL=step1.js.map