import { HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { CurrencyService } from '../currency-service.service';
import { ConverterService } from './converter.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements AfterViewInit, OnInit {
  currencies: string[] = this.currencyService.getCurrencies();
  exchangeRate: {
    baseCurrency: string,
    rates: {
      [symbol: string]: number
    }
  };
  form: FormGroup;
  currencyFromValue: number;
  currenciesToValues: number[] = [];

  constructor(private converter: ConverterService, private currencyService: CurrencyService) {}

  ngOnInit() {
    this.form = new FormGroup({
      'currencyFrom': new FormGroup({
        'amount': new FormControl('1'),
        'symbol': new FormControl('USD')
      }),
      'currenciesTo': new FormArray([
        new FormGroup({
          'amount': new FormControl('1'),
          'symbol': new FormControl('USD')
        })
      ])
    });

    this.currencyService.currentExchangeRate.subscribe((obj) => {
      this.exchangeRate = obj;
    })
  }

  ngAfterViewInit(): void {
    this.updateExchangeRates();
  }

  onSelectChange() {
    this.updateExchangeRates();
  }

  onInputFromChange(exclude: number = -1) {
    this.currencyFromValue = this.form.get('currencyFrom').get('amount').value;

    for(let group of this.getCurrenciesArray().controls) {
      if(this.getCurrenciesArray().controls.indexOf(group) === exclude) continue;

      const amount = Math.round(
        this.form.get('currencyFrom').get('amount').value * 
        this.exchangeRate.rates[group['controls']['symbol'].value] *
        100) / 100;

      group.setValue({
        symbol: group['controls']['symbol'].value,
        amount: isNaN(amount) ? 0 : amount
      })
    }
  }

  onInputToChange(n: number, value: string) {
    const amount =  Math.round(
      this.form.get('currenciesTo')['controls'][n]['controls']['amount'].value *
      (1 / this.exchangeRate.rates[
        this.form.get('currenciesTo')['controls'][n]['controls']['symbol'].value
      ]) *
      100) / 100;

    this.form.get('currencyFrom').setValue({
      symbol: this.form.get('currencyFrom')['controls']['symbol'].value,
      amount: isNaN(amount) ? 0 : amount
    })

    this.onInputFromChange(n);
    

    // for(let group of this.getCurrencies().controls) {
    //   group.setValue({
    //     symbol: group['controls']['symbol'].value,
    //     amount: this.form.get('currencyFrom').get('amount').value * this.exchangeRate.rates[group['controls']['symbol'].value]
    //   })
    // }
  }

  updateExchangeRates() {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('base_currency', this.form.get('currencyFrom').get('symbol').value);
    queryParams = queryParams.append('currencies', this.getTargetCurrencies().join(','));
    this.converter.getExchangeRates(queryParams).subscribe(
      (obj) => {
        // const currencies: { [currency: string]: number } = {};
        // for(let currency in obj.data) {
        //   currencies[currency] = obj.data[currency]; 
        // }

        this.currencyService.onExchangeRateUpdate({
          baseCurrency: this.form.get('currencyFrom').get('symbol').value,
          rates: obj.data
        });

        this.onInputFromChange();
      } 
    );
  }

  addCurrency() {
    (<FormArray>this.form.get('currenciesTo')).push(new FormGroup({
      'amount': new FormControl('1'),
      'symbol': new FormControl('USD')
    }));
  }

  getTargetCurrencies() {
    const arr: string[] = [];
    for(let group of this.getCurrenciesArray().controls) {
      arr.push(group['controls']['symbol'].value);
    }

    return arr;
  }

  getCurrenciesArray() {
    return (<FormArray>this.form.get('currenciesTo'));
  }
}
