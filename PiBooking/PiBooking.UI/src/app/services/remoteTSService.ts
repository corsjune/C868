
import { HttpClient,json } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';
import { buildQueryString } from 'aurelia-path';

import { TimeSlotModel } from '../models/TimeSlotModel';
import { OrderModel } from '../models/OrderModel'; 
import { environment } from '../environment/environment'; 



@inject(HttpClient, environment)
export class RemoteTSService {

    _http: HttpClient;
    _baseUrl: string;

    constructor(http: HttpClient,  private env:environment) { 
        this._baseUrl = env.remoteSessionUrl;
        this._http = http;


    }

    public async  UpdateProgress(myOrderModel: OrderModel)  {

        let url = this._baseUrl + '/api/UpdateProgress';

        let response = await this._http.fetch(url, {
            method: 'post',
            body: json(myOrderModel)
        });

        if (response.ok) {
            var returnValue = await response.json();
            myOrderModel.Job.JobID = returnValue; 
        }
        else {
            throw new Error((await response.json()).Message)
        }
    }

    public async  BookTime(myOrderModel: OrderModel): Promise<number> {

        let url = this._baseUrl + '/api/BookTime';  

        let response = await this._http.fetch(url, {
                method: 'post',
                body: json(myOrderModel)
        });

        if (response.ok) return await response.json() as Promise<number>;
        throw new Error((await response.json()).Message)

    }

    public async  GetTimeSlots(startDate:Date, endDate:Date): Promise<TimeSlotModel[]> {

        let url = this._baseUrl + '/api/TimeSlot';
        let params = { startDate: JSON.stringify(startDate), endDate: JSON.stringify(endDate) };

        //Object.keys(params).forEach(key => url.params.append(key, params[key]))

        let queryString = buildQueryString(params);
        url += queryString ? `?${queryString}` : ''

        let result = await this._http.fetch(url); 

        return result.json() as Promise<TimeSlotModel[]>;
    }
}
