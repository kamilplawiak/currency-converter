import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Form, FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatTooltip } from '@angular/material/tooltip';
import { CurrencyService } from '../currency-service.service';
import { checkCurrencyValue } from '../validators/currency.validator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  form = new FormGroup({
    'allFunds': new FormArray([
      new FormGroup({
        'amount': new FormControl('1', checkCurrencyValue),
        'currency': new FormControl('USD')
      })
    ])
  });
  userBalance: {
    [currency: string]: number
  } = {}
  balanceInBaseCurrency = 0;
  submitted = false;
  formData: {
    [balanceInCurrency: string]: number
  } = {}
  isFieldCorrect = true;
  @ViewChildren('tooltip') tooltips: QueryList<MatTooltip>;

  constructor(public currencyService: CurrencyService) {}

  ngOnInit() {
    this.currencyService.setBaseCurrencyForAllExchangeRates('USD');
    this.currencyService.updateAllExchangeRates();
  }

  onSelectChange(currency: string) {
    this.currencyService.setBaseCurrencyForAllExchangeRates(currency);
    this.currencyService.updateAllExchangeRates();
  }

  onCurrencyAdd() {
    (<FormArray>this.form.get('allFunds')).push(new FormGroup({
      'amount': new FormControl(1, checkCurrencyValue),
      'currency': new FormControl('USD')
    }))
  }

  checkCurrencyInput(group: FormGroup, index: number) {
    this.tooltips.get(index).disabled = true;
    const formControl = group.get('amount');
    checkCurrencyValue(formControl);
    this.isFieldCorrect = !formControl.errors?.invalidCurrencyValue;

    if(!this.isFieldCorrect) {
      this.tooltips.get(index).disabled = false;
      this.tooltips.get(index).show();
    }
  }

  onSubmit() {
    this.userBalance = {};
    this.balanceInBaseCurrency = 0;

    for(let control of this.form.get('allFunds')['controls'])
      this.userBalance[control['controls']['currency'].value] = +control['controls']['amount'].value;

    this.calculateBalanceInBaseCurrency();

    this.submitted = true;
    for(let currency in this.currencyService.getAllExchangeRates().rates) {
      this.formData[currency] = Math.round(
                                  this.balanceInBaseCurrency *
                                  this.currencyService.getAllExchangeRates().rates[currency]
                                  * 100) / 100;
    }
  }

  calculateBalanceInBaseCurrency() {
    for(let currency in this.userBalance) {
      const rate = this.currencyService.getAllExchangeRates().rates[currency];
      this.balanceInBaseCurrency += this.userBalance[currency] * (1 / rate);
    }
  }

  getFunds() {
    return (<FormArray>this.form.get('allFunds'));
  }
}
