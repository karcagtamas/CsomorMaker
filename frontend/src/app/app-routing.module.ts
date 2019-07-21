import { EventsComponent, NewEventComponent } from './components/event';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent, LoginComponent, RegistrationComponent, PageNotFoundComponent } from './components/main';
import { AuthGuard } from './guards/auth.guard';
import { EventGuard } from './guards/event.guard';
import { NewGtComponent, GtsComponent } from './components/gt';
import { GtGuard } from './guards/gt.guard';
import { MyProfileComponent } from 'src/app/components/user';
import { NoAuthGuard } from './guards/no-auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', pathMatch: 'full', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', pathMatch: 'full', component: LoginComponent, canActivate: [NoAuthGuard] },
  { path: 'registration', pathMatch: 'full', component: RegistrationComponent, canActivate: [NoAuthGuard] },
  { path: 'events', pathMatch: 'full', component: EventsComponent, canActivate: [AuthGuard] },
  { path: 'events/:id/:page', pathMatch: 'full', component: EventsComponent, canActivate: [AuthGuard, EventGuard] },
  { path: 'new-event', pathMatch: 'full', component: NewEventComponent, canActivate: [AuthGuard] },
  { path: 'gts', pathMatch: 'full', component: GtsComponent, canActivate: [AuthGuard] },
  { path: 'gts/:id/:page', pathMatch: 'full', component: GtsComponent, canActivate: [AuthGuard, GtGuard] },
  { path: 'new-gt', pathMatch: 'full', component: NewGtComponent, canActivate: [AuthGuard] },
  { path: 'my-profile', pathMatch: 'full', component: MyProfileComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
