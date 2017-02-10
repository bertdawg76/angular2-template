import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  CanActivateViaAuthGuard,
  ErrorComponent,
  LoginComponent,
  HomeComponent,
  CatComponent,
} from './';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    // canActivate: [ CanActivateViaAuthGuard ],  // auth protection
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'cats',
    component: CatComponent,
  },
  {
    path: '**',
    component: ErrorComponent,
    data: { title: 'Page Not Found'},  // because title str should differ from path str
  }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
