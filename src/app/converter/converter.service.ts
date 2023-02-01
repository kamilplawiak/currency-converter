import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ExchangeRatesModel } from "./exchange-rates.model";

@Injectable({
    providedIn: 'root'
})
export class ConverterService {
    apiURL: string = environment.apiURL;
    constructor(private http: HttpClient) {}

    getExchangeRates(queryParams: HttpParams) : Observable<ExchangeRatesModel> {
        return this.http.get<ExchangeRatesModel>(this.apiURL, { params: queryParams });
    }
}