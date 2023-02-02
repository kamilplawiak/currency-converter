import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { createMask } from '@ngneat/input-mask';
import { dateValidator } from '../validators/date.validator';

@Component({
  selector: 'app-contact',
  templateUrl: './contact-pure.component.html',
  styleUrls: ['./contact-pure.component.css']
})
export class ContactPureComponent {
  form = new FormGroup({
    'firstName': new FormControl('', Validators.required),
    'lastName': new FormControl('', Validators.required),
    'email': new FormControl('', [Validators.required, Validators.email]),
    'birthday': new FormControl('', [Validators.required, dateValidator]),
    'voivodeship': new FormControl('', Validators.required),
    'city': new FormControl('', Validators.required),
    'address': new FormControl('', Validators.required),
    'postalCode': new FormControl('', Validators.required),
  })

  formData = {
    'firstName': '',
    'lastName': '',
    'email': '',
    'birthday': '',
    'voivodeship': '',
    'city': '',
    'address': '',
    'postalCode': ''
  }


  maxLengthMask = createMask({
    placeholder: ' ',
    regex: `[a-zA-ZąęłżźńóśĄĘŁŻŹŃÓŚ ]{1,24}`
  });
  maxLengthWithDigitsMask = createMask({
    placeholder: ' ',
    regex: `[0-9a-zA-ZąęłżźńóśĄĘŁŻŹŃÓŚ ]{1,24}`
  });
  postalCodeMask = createMask({
    placeholder: '__-___',
    regex: '\\d{2}-\\d{3}'
  })


  isFormCorrect = this.form.valid;
  isFormSubmitted = false;
  hideRequired = true;

  voivodeships = ['Mazowieckie', 'Pomorskie', 'Warmińsko-mazurskie']
  cities = {
    'Mazowieckie': ['Warszawa', 'Siedlce', 'Grodzisk Mazowiecki', 'Pruszków', 'Legionowo'],
    'Pomorskie': ['Gdańsk', 'Sopot', 'Gdynia', 'Hel', 'Puck'],
    'Warmińsko-mazurskie': ['Olsztyn', 'Elbląg', 'Giżycko', 'Iława', 'Pisz']
  }

  onInputChange() {
    this.isFormCorrect = this.form.valid;
  }

  onSubmit() {
    this.formData = {
      'firstName': this.form.get('firstName').value,
      'lastName': this.form.get('lastName').value,
      'email': this.form.get('email').value,
      'birthday': this.form.get('birthday').value,
      'voivodeship': this.form.get('voivodeship').value,
      'city': this.form.get('city').value,
      'address': this.form.get('address').value,
      'postalCode': this.form.get('postalCode').value,
    }
    this.isFormSubmitted = true;
  }
}
