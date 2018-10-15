import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisterUserComponent } from './register-user/register-user.component';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserRegisteredComponent } from './user-registered/user-registered.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterUserComponent,
    UserRegistrationFormComponent,
    UserRegisteredComponent
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
