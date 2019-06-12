import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventService, UserService, LoginService } from './services';
import {
  HomeComponent,
  NavigatorComponent,
  LoginComponent,
  RegistrationComponent,
  PageNotFoundComponent
} from './components/main';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigatorComponent,
    LoginComponent,
    RegistrationComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [EventService, UserService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule {}
