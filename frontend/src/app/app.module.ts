import { LoaderInterceptor } from './interceptors/loader.interceptor';
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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  EventService,
  UserService,
  LoginService,
  NotificationService,
  CommonService,
  EventGeneratorService,
  EventMembersService,
  EventPayOutsService,
  EventTeamsService,
  EventTodoesService,
  LoaderService,
  EventMessagesService
} from './services';
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
import {
  EventGeneratorComponent,
  WorkSettingsComponent,
  AddNewWorkComponent,
  WorkerSettingsComponent
} from './components/event/event-generator';
import {
  EventSummaryComponent,
  NewPayOutDialogComponent,
  DeletePayOutDialogComponent
} from './components/event/event-summary';
import { EventToDoComponent, TodoDialogComponent } from './components/event/event-todo';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import {
  EventMembersComponent,
  ModifyEventMemberComponent,
  EventMemberItemComponent,
  AddNewMemberModalComponent
} from './components/event/event-members';
import {
  EventTeamsComponent,
  AddTeamDialogComponent,
  TeamDeatilsDialogComponent,
  AddTeamMemberDialogComponent,
  EventTeamComponent
} from './components/event/event-teams';
import { GtChatComponent } from './components/gt/gt-chat';
import { GtClassesComponent, GtClassDialogComponent, GtClassMemberDialogComponent } from './components/gt/gt-classes';
import { GtCsomorComponent, GtCsomorPersonalComponent, GtCsomorWorkComponent } from './components/gt/gt-csomor';
import { GtDetailsComponent } from './components/gt/gt-details';
import {
  GtGeneratorComponent,
  GtWorkerSettingsComponent,
  GtWorkDetailsComponent,
  GtWorkDialogComponent
} from './components/gt/gt-generator';
import {
  GtMembersComponent,
  GtAddMemberDialogComponent,
  GtMemberModifyDialogComponent
} from './components/gt/gt-members';
import { GtSettingsComponent } from './components/gt/gt-settings';
import { GtSummaryComponent, GtPayoutComponent } from './components/gt/gt-summary';
import { GtTodoesComponent, GtTodoComponent } from './components/gt/gt-todo';
import { GtsComponent, NewGtComponent } from './components/gt';
import { EventPersonalCsomorComponent } from './components/event/event-csomor/event-personal-csomor/event-personal-csomor.component';
import { EventWorkCsomorComponent } from './components/event/event-csomor/event-work-csomor/event-work-csomor.component';
import { LoaderComponent } from './components/main/loader/loader.component';
import { MatNativeDateModule } from '@angular/material/core';
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
    IsReadyPipe,
    NewPayOutDialogComponent,
    DeletePayOutDialogComponent,
    WorkSettingsComponent,
    AddNewWorkComponent,
    WorkerSettingsComponent,
    ConfirmDialogComponent,
    EventMembersComponent,
    EventMemberItemComponent,
    ModifyEventMemberComponent,
    AddNewMemberModalComponent,
    EventTeamsComponent,
    AddTeamDialogComponent,
    TeamDeatilsDialogComponent,
    AddTeamMemberDialogComponent,
    EventTeamComponent,
    GtChatComponent,
    GtClassesComponent,
    GtClassDialogComponent,
    GtClassMemberDialogComponent,
    GtCsomorComponent,
    GtCsomorPersonalComponent,
    GtCsomorWorkComponent,
    GtDetailsComponent,
    GtGeneratorComponent,
    GtWorkerSettingsComponent,
    GtWorkDetailsComponent,
    GtWorkDialogComponent,
    GtMembersComponent,
    GtAddMemberDialogComponent,
    GtMemberModifyDialogComponent,
    GtSettingsComponent,
    GtSummaryComponent,
    GtPayoutComponent,
    GtTodoesComponent,
    GtTodoComponent,
    GtsComponent,
    NewGtComponent,
    EventPersonalCsomorComponent,
    EventWorkCsomorComponent,
    LoaderComponent,
    TodoDialogComponent
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
    HttpClientModule,
    MatDialogModule,
    MatSelectModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatNativeDateModule
  ],
  providers: [
    EventService,
    UserService,
    LoginService,
    NotificationService,
    CommonService,
    EventGeneratorService,
    EventMembersService,
    EventPayOutsService,
    EventTeamsService,
    EventTodoesService,
    LoaderService,
    EventMessagesService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    NewPayOutDialogComponent,
    DeletePayOutDialogComponent,
    AddNewWorkComponent,
    ConfirmDialogComponent,
    ModifyEventMemberComponent,
    AddNewMemberModalComponent,
    AddTeamDialogComponent,
    TeamDeatilsDialogComponent,
    AddTeamMemberDialogComponent,
    TodoDialogComponent,
    GtWorkDialogComponent
  ]
})
export class AppModule {}
