import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ConverterComponent } from './converter/converter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatDividerModule } from '@angular/material/divider';
import { ContactComponent } from './contact/contact.component';
import { InputMaskModule } from '@ngneat/input-mask';
import { ContactPureComponent } from './contact-pure/contact-pure.component'
 
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ConverterComponent,
    ProfileComponent,
    ContactComponent,
    ContactPureComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    InputMaskModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
