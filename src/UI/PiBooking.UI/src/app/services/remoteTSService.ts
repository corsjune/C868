
import { HttpClient, json } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';
import { buildQueryString } from 'aurelia-path';

import { TimeSlotViewModel, OrderViewModel } from 'app/models';
import { environment } from '../environment/environment';



@inject(HttpClient, environment)
export class RemoteTSService {

    _http: HttpClient;
    _baseUrl: string;

    constructor(http: HttpClient, private env: environment) {
        this._baseUrl = env.remoteSessionUrl;
        this._http = http;


    }

    public async UpdateProgress(myOrderModel: OrderViewModel) {

        let url = this._baseUrl + '/api/UpdateProgress';

        let response = await this._http.fetch(url, {
            method: 'post',
            body: json(myOrderModel)
        });

        if (response.ok) {
            var returnValue = await response.json();
            myOrderModel.job.jobID = returnValue;
        }
        else {
            throw new Error((await response.json()).message)
        }
    }

    public async BookTime(myOrderModel: OrderViewModel): Promise<number> {

        let url = this._baseUrl + '/api/Order';

        let response = await this._http.fetch(url, {
            method: 'post',
            body: json(myOrderModel)
        });

        if (response.ok) return await response.json() as Promise<number>;
        throw new Error((await response.json()).message)

    }

    public async GetTimeSlots(engineerID: number, startDate: Date, endDate: Date): Promise<TimeSlotViewModel[]> {

        let url = this._baseUrl + '/api/TimeSlot/GetAllAvailableByEngineer';
        let params = { startDateRangeJson: JSON.stringify(startDate), endDateRangeJson: JSON.stringify(endDate) };

        //Object.keys(params).forEach(key => url.params.append(key, params[key]))

        let queryString = buildQueryString(params);
        url += queryString ? `?${queryString}` : ''

        let result = await this._http.fetch(url);

        return result.json() as Promise<TimeSlotViewModel[]>;
    }
}
