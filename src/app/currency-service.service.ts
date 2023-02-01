import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ConverterService } from "./converter/converter.service";

@Injectable({
    providedIn: 'root'
})
export class CurrencyService {
    private currencies = ['AUD', 'CAD', 'CHF', 'CZK', 'EUR', 'GBP', 'JPY', 'RUB', 'PLN', 'USD'];
    private allExchangeRates: {
        baseCurrency: string,
        rates: {
          [symbol: string]: number
        }
    } = {
        baseCurrency: 'USD',
        rates: {
            'USD': 1
        }
    };
    private exchangeRate = new BehaviorSubject<{
        baseCurrency: string,
        rates: {
          [symbol: string]: number
        }
    }>({
        baseCurrency: 'USD',
        rates: {
            'USD': 1
        }
    })
    currentExchangeRate = this.exchangeRate.asObservable();

    constructor(private converter: ConverterService) { }

    updateAllExchangeRates() {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('base_currency', this.allExchangeRates.baseCurrency);
        queryParams = queryParams.append('currencies', this.currencies.join(','));

        this.converter.getExchangeRates(queryParams).subscribe((obj) => {
            for(let prop in obj.data)
                this.allExchangeRates.rates[prop] = obj.data[prop];

        });
    }

    public getCurrencies() : string[] {
        return this.currencies;
    }
    
    public getAllExchangeRates() {
        return this.allExchangeRates;
    }

    public setBaseCurrencyForAllExchangeRates(currency: string) {
        this.allExchangeRates.baseCurrency = currency;
    }

    public onExchangeRateUpdate(obj: { baseCurrency: string, rates: { [symbol: string]: number } }) {
        this.exchangeRate.next(obj);
    }
}