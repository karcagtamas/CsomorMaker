import { PageNotFoundComponent } from './components/main/page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent, LoginComponent, RegistrationComponent } from './components/main';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', pathMatch: 'full', component: HomeComponent },
  { path: 'login', pathMatch: 'full', component: LoginComponent },
  { path: 'registration', pathMatch: 'full', component: RegistrationComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
