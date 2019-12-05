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
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';

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
  EventMessagesService,
  GtService,
  GtTodoesService,
  GtMessagesService,
  GtPayoutsService,
  GtGeneratorService,
  GtMembersService,
  GtClassesService,
  ExportService,
  NewsService,
  UserNotificationService
} from './services';
import {
  HomeComponent,
  NavigatorComponent,
  LoginComponent,
  RegistrationComponent,
  PageNotFoundComponent,
  ResetPasswordComponent
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
  TrustHTMLPipe,
  IsReadyPipe,
  IsLockedPipe
} from './pipes';
import { EventSettingsComponent } from './components/event/event-settings';
import { EventChatComponent } from './components/event/event-chat';
import {
  EventCsomorComponent,
  EventWorkCsomorComponent,
  EventPersonalCsomorComponent
} from './components/event/event-csomor';
import { EventDetailsComponent } from './components/event/event-details';
import {
  EventGeneratorComponent,
  WorkSettingsComponent,
  AddNewWorkComponent,
  WorkerSettingsComponent
} from './components/event/event-generator';
import { EventSummaryComponent, EventPayoutDialogComponent } from './components/event/event-summary';
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
import {
  GtClassesComponent,
  GtClassDialogComponent,
  GtClassMemberDialogComponent,
  GtClassMemberComponent,
  GtClassComponent
} from './components/gt/gt-classes';
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
  GtMemberModifyDialogComponent,
  GtMemberRowComponent,
  GtImportMembersDialogComponent
} from './components/gt/gt-members';
import { GtSettingsComponent } from './components/gt/gt-settings';
import { GtSummaryComponent, GtPayoutDialogComponent } from './components/gt/gt-summary';
import { GtTodoesComponent, GtTodoComponent, GtTodoDialogComponent } from './components/gt/gt-todo';
import { GtsComponent, NewGtComponent } from './components/gt';
import { LoaderComponent } from './components/main/loader/loader.component';
import {
  ProfileComponent,
  MyProfileComponent,
  ChangePasswordDialogComponent,
  UserModifyDialogComponent
} from './components/user';

import { NewsComponent, NewsElementComponent, NewsDialogComponent } from './components/main/news';
import { NotificationsComponent, NotificationComponent } from './components/main/notifications';
import { GtMeetingsComponent, GtMeetingDialogComponent } from './components/gt/gt-meetings';

import {
  GtPresentingsComponent,
  GtPresentingDialogComponent,
  GtPresentingBlockComponent,
  GtPresentingEditorDialogComponent,
  GtPresentingEditorsComponent,
  GtPresentingEditorComponent
} from './components/gt/gt-presentings';
import { EventAdminComponent } from './components/admin/event-admin/event-admin.component';
import { GtAdminComponent } from './components/admin/gt-admin/gt-admin.component';
import { UserAdminComponent } from './components/admin/user-admin/user-admin.component';
import { EventTeamImportModalComponent } from './components/event/event-teams/event-team-import-modal/event-team-import-modal.component';
import { EventRolesComponent } from './components/event/event-roles/event-roles/event-roles.component';
import { EventRoleModalComponent } from './components/event/event-roles/event-role-modal/event-role-modal.component';
import { GtRolesComponent } from './components/gt/gt-roles/gt-roles/gt-roles.component';
import { GtRoleModalComponent } from './components/gt/gt-roles/gt-role-modal/gt-role-modal.component';

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
    GtTodoesComponent,
    GtTodoComponent,
    GtsComponent,
    NewGtComponent,
    EventPersonalCsomorComponent,
    EventWorkCsomorComponent,
    LoaderComponent,
    TodoDialogComponent,
    GtMemberRowComponent,
    GtTodoDialogComponent,
    GtClassComponent,
    GtClassMemberComponent,
    GtPayoutDialogComponent,
    ProfileComponent,
    MyProfileComponent,
    UserModifyDialogComponent,
    ChangePasswordDialogComponent,
    ResetPasswordComponent,
    GtImportMembersDialogComponent,
    NewsComponent,
    NewsElementComponent,
    NewsDialogComponent,
    NotificationsComponent,
    NotificationComponent,
    GtMeetingsComponent,
    GtMeetingDialogComponent,
    GtPresentingsComponent,
    GtPresentingBlockComponent,
    GtPresentingDialogComponent,
    GtPresentingEditorComponent,
    GtPresentingEditorsComponent,
    GtPresentingEditorDialogComponent,
    EventPayoutDialogComponent,
    EventAdminComponent,
    GtAdminComponent,
    UserAdminComponent,
    EventTeamImportModalComponent,
    EventRolesComponent,
    EventRoleModalComponent,
    GtRolesComponent,
    GtRoleModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
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
    MatNativeDateModule,
    MatTooltipModule,
    MatDividerModule
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
    GtService,
    GtTodoesService,
    GtMessagesService,
    GtPayoutsService,
    GtGeneratorService,
    GtClassesService,
    GtMembersService,
    ExportService,
    NewsService,
    UserNotificationService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AddNewWorkComponent,
    ConfirmDialogComponent,
    ModifyEventMemberComponent,
    AddNewMemberModalComponent,
    AddTeamDialogComponent,
    TeamDeatilsDialogComponent,
    AddTeamMemberDialogComponent,
    TodoDialogComponent,
    GtWorkDialogComponent,
    GtAddMemberDialogComponent,
    GtMemberModifyDialogComponent,
    GtTodoDialogComponent,
    GtClassDialogComponent,
    GtClassMemberDialogComponent,
    GtPayoutDialogComponent,
    UserModifyDialogComponent,
    ChangePasswordDialogComponent,
    GtImportMembersDialogComponent,
    NewsDialogComponent,
    GtMeetingDialogComponent,
    GtPresentingDialogComponent,
    GtPresentingEditorDialogComponent,
    EventPayoutDialogComponent,
    EventTeamImportModalComponent,
    EventRoleModalComponent,
    GtRoleModalComponent
  ]
})
export class AppModule {}
