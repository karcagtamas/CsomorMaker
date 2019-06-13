import { EventsComponent, NewEventComponent } from './components/event';
import { PageNotFoundComponent } from './components/main/page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent, LoginComponent, RegistrationComponent } from './components/main';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', pathMatch: 'full', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', pathMatch: 'full', component: LoginComponent },
  { path: 'registration', pathMatch: 'full', component: RegistrationComponent },
  { path: 'events', pathMatch: 'full', component: EventsComponent },
  { path: 'events/:id/:page', pathMatch: 'full', component: EventsComponent },
  { path: 'new-event', pathMatch: 'full', component: NewEventComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
