/// <reference types="ej.web.all" />
import * as $ from 'jquery';
import { HttpClient } from 'aurelia-fetch-client';
import { autoinject, inject } from 'aurelia-framework';
import { sessionService } from '../../../services/sessionService'
import { stepsEnabledService } from '../../../services/stepsEnabledService'
import * as moment from 'moment'

import { TimeSlotViewModel, OrderViewModel } from 'app/models'
import { Endpoint, Rest } from 'aurelia-api';

@autoinject
export class Step1 {

    public Views: any;
    public WorkHours: any;
    public AppointmentList: ej.Schedule.AppointmentSettings;
    public TimeSlots: object;
    public TimeInterval: any;
    public TimeZone: string;
    public MinDate: Date;
    public MaxDate: Date;

    public example1: TimeSlotViewModel;
    public example2: TimeSlotViewModel;
    public example3: TimeSlotViewModel;

    public myWorkWeek: Array<string>;

    public currentOrder: OrderViewModel;

    public mySched: any;

    refreshTotals(appointments: Array<any>) {

        let count = 0;

        this.currentOrder.totalAmount = appointments.reduce((previousValue, currentValue, currentIndex, array) => {
            count++;
            return previousValue + currentValue.rate;
        }, 0);

        this.currentOrder.totalCount = count;
        this.stepsEnabled.step2.enabled = this.currentOrder.totalCount > 0 ? true : false;

    }

    onClick(event) {
        let args: ej.Schedule.CellClickEventArgs = event.detail;

        if (args.type == "cellClick") {
            let ts = this.TimeSlots[args.startTime.getTime()];
            if (ts != null) {
                this.mySched.saveAppointment(Object.assign({}, ts));
                this.refreshTotals(this.mySched.getAppointments());
            }
        }
        else if (args.type == "appointmentClick") { }

    }

    onAppointmentClick(event) {

        let args: ej.Schedule.AppointmentClickEventArgs = event.detail;
        this.mySched.deleteAppointment(args.appointment);
    }

    appointmentRemoved(event) {
        this.refreshTotals(this.mySched.getAppointments());
    }

    onAppointmentWindowOpen(event) {

        let args: ej.Schedule.AppointmentWindowOpenEventArgs = event.detail;

        args.cancel = true;

    }



    check(event) {
        let args: ej.Schedule.QueryCellInfoEventArgs = event.detail;

        switch (args.requestType) {
            case 'workcells':


                let text;
                if (ej.isNullOrUndefined(this.TimeSlots)) {
                    text = "Not Available";
                    args.element.html(`<div class="caption">Loading</div>`);
                }
                else {
                    let ts;
                    if (args.cell.startTime != null) {
                        ts = this.TimeSlots[args.cell.startTime.getTime()];
                    }
                    if (ts != null) {
                        text = ts.rate;
                        args.element.html(`Book for $${text}`);
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
    }
    constructor(@inject(Endpoint.of('api')) public apiEndpoint: Rest, public stepsEnabled: stepsEnabledService, sess: sessionService) {


        this.currentOrder = sess.orderValue;


        this.TimeSlots = new Object();

        this.TimeInterval = {
            minorSlotCount: 1,
            majorSlot: 60
        };

        this.MinDate = moment().startOf('week').toDate();
        this.MaxDate = moment().add(30, 'days').endOf('week').toDate();

        this.Views = ['workweek'];
        this.WorkHours = { start: 8, end: 20, highlight: false };
        this.myWorkWeek = ['Sunday', 'Monday', 'Tuesday', 'Friday', 'Saturday'];
        this.AppointmentList = {
            id: 'timeslotId',
            subject: 'rate',
            startTime: 'beginDatetime',
            description: 'rate',
            endTime: 'endDatetime'
        };

    }

    async deactivate() {
        this.currentOrder.timeSlots = this.mySched.getAppointments();
    }

    canActivate() {
        if (this.stepsEnabled.step1.enabled) {
            return true;
        } else return false;
    }


    get canSave() {
        return this.stepsEnabled.step2.enabled;
    }

    async activate() {
        try {
            let myTimeSlots = this.currentOrder.timeSlots.slice(0);

            this.AppointmentList.dataSource = myTimeSlots;
            this.refreshTotals(myTimeSlots);

            let data: TimeSlotViewModel[] = await this.apiEndpoint.find(
                'timeslot/GetAllAvailableByEngineer',
                {
                    engineerID: this.currentOrder.engineer.engineerID,
                    startDateRangeJson: JSON.stringify(this.MinDate),
                    endDateRangeJson: JSON.stringify(this.MaxDate)
                }
            );
            // let data = await this.remoteTS.GetTimeSlots(this.MinDate, this.MaxDate);


            let myDictionary = data
                .filter(x => !x.isBooked);

            myDictionary.forEach(x => {
                this.TimeSlots[new Date(x.beginDatetime).getTime()] = {
                    beginDatetime: new Date(x.beginDatetime),
                    endDatetime: new Date(x.endDatetime),
                    rate: x.rate,
                    isBooked: x.isBooked,
                    timeslotId: x.timeslotId,
                    engineerID: x.engineerID,
                    status: x.status
                };

            });


            //populate examples
            const sortedValues = data
                .filter(x => {
                    return x.isBooked === false;
                })
                .sort((a, b) => {
                    if (a.rate !== b.rate) {
                        return a.rate - b.rate;
                    } else {
                        return a.beginDatetime.toString().localeCompare(b.beginDatetime.toString());
                    }
                })
                .slice(0, 3);

            this.example1 = sortedValues[0];
            this.example2 = sortedValues[1];
            this.example3 = sortedValues[2];

        }
        catch (error) {
            console.error(error);
            return null;
        }

    }
}