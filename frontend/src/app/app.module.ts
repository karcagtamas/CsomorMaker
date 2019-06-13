import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';

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
import { EventsComponent, NewEventComponent } from './components/event';
import {
  ChatDatePipe,
  ConvertToHourPipe,
  CreateLetterPipe,
  ExistsPipe,
  ForintPipe,
  HoursPipe,
  IsAdminPipe,
  PersonCountPipe,
  TestPipe,
  TrustHTMLPipe,
  IsReadyPipe,
  IsLockedPipe
} from './pipes';
import { EventSettingsComponent } from './components/event/event-settings';
import { EventChatComponent } from './components/event/event-chat';
import { EventCsomorComponent } from './components/event/event-csomor';
import { EventDetailsComponent } from './components/event/event-details';
import { EventGeneratorComponent } from './components/event/event-generator';
import { EventSummaryComponent } from './components/event/event-summary';
import { EventToDoComponent } from './components/event/event-todo';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigatorComponent,
    LoginComponent,
    RegistrationComponent,
    PageNotFoundComponent,
    EventsComponent,
    ChatDatePipe,
    ConvertToHourPipe,
    CreateLetterPipe,
    ExistsPipe,
    ForintPipe,
    HoursPipe,
    IsAdminPipe,
    PersonCountPipe,
    TestPipe,
    TrustHTMLPipe,
    NewEventComponent,
    EventSettingsComponent,
    EventChatComponent,
    EventCsomorComponent,
    EventDetailsComponent,
    EventGeneratorComponent,
    EventSummaryComponent,
    EventToDoComponent,
    IsLockedPipe,
    IsReadyPipe
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
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule
  ],
  providers: [EventService, UserService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule {}
