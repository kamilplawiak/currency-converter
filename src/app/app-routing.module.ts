import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { ContactPureComponent } from "./contact-pure/contact-pure.component";
import { ContactComponent } from "./contact/contact.component";
import { ConverterComponent } from "./converter/converter.component";
import { ProfileComponent } from "./profile/profile.component";

const appRoutes: Routes = [
    { path: 'convert', component: ConverterComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'contact-pure', component: ContactPureComponent }
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}