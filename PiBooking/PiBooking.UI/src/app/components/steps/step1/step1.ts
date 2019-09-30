/// <reference types="ej.web.all" />
import * as $ from 'jquery';
import { HttpClient } from 'aurelia-fetch-client';
import { autoinject, inject } from 'aurelia-framework'; 
import { sessionService } from '../../../services/sessionService' 
import { stepsEnabledService } from '../../../services/stepsEnabledService'
import * as Enumerable from 'linq'
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

        this.currentOrder.TotalAmount = appointments.reduce((previousValue, currentValue, currentIndex, array) => {
            count++;
            return previousValue + currentValue.Rate;
        }, 0);

        this.currentOrder.TotalCount = count;
        this.stepsEnabled.step2.enabled=this.currentOrder.TotalCount > 0 ? true : false;

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
        else if (args.type == "appointmentClick")
        { }

    }

    onAppointmentClick(event) {
        let args: ej.Schedule.AppointmentClickEventArgs = event.detail;

        this.mySched.deleteAppointment(args.appointment);
        //this.refreshTotals(sched.getAppointments());
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
                        text = ts.Rate;
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
        this.MaxDate = moment().add(100, 'days').endOf('week').toDate();

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

    async deactivate() { 
        this.currentOrder.TimeSlots = this.mySched.getAppointments(); 
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
            let myTimeSlots = this.currentOrder.TimeSlots.slice(0);

            this.AppointmentList.dataSource = myTimeSlots;
            this.refreshTotals(myTimeSlots);
 
            let data: TimeSlotViewModel[] = await this.apiEndpoint.find(
                'timeslot/GetAllAvailableByEngineer',
                {
                    engineerID: this.currentOrder.Engineer.EngineerID,
                    startDateRangeJson: JSON.stringify(this.MinDate) ,
                    endDateRangeJson: JSON.stringify(this.MaxDate)
                }
            );
           // let data = await this.remoteTS.GetTimeSlots(this.MinDate, this.MaxDate);

            let myDictionary = data.filter(
                x => {
                    return x.IsBooked === false;
                }
                );
            myDictionary.forEach(x => {
                this.TimeSlots[new Date(x.BeginDatetime).getTime()] = {
                    BeginDatetime: new Date(x.BeginDatetime),
                    EndDatetime: new Date(x.EndDatetime),
                    Rate: x.Rate,
                    IsBooked: x.IsBooked,
                    TimeslotId: x.TimeslotId,
                    EngineerID: x.EngineerID,
                    Status: x.Status
                };

            });


            //populate examples
            let sortedValues = Enumerable.from(data).where(x => x.IsBooked === false).orderBy(x => x.Rate).thenBy(y => y.BeginDatetime).take(3).toArray();

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