import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ModalsModule } from './components/modals/modals.module';

import {
  // Components
  ToastComponent,
  NavComponent,
  // Services
  LocalStorageService,
  SessionStorageService,
  HttpService,
  APIConfigService,
  AuthService,
  CanActivateViaAuthGuard,
  ValidationService,
  ToastService,
  Data,
} from './';


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    HttpModule,
    FormsModule,
    ModalsModule,
  ],
  exports: [
    ToastComponent,
    NavComponent,
  ],
  declarations: [
    ToastComponent,
    NavComponent,
  ],
  providers: [
    LocalStorageService,
    SessionStorageService,
    HttpService,
    APIConfigService,
    AuthService,
    CanActivateViaAuthGuard,
    ValidationService,
    ToastService,
    Data,
  ],
})
export class SharedModule {
  // https://angular.io/styleguide#!#04-12
  constructor( @Optional() @SkipSelf() parentModule: SharedModule) {
    if (parentModule) {
      throw new Error('SharedModule has already been loaded. Import SharedModule in the AppModule only.');
    }
  }
}
