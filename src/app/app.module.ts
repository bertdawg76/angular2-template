import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import {
  SharedModule,
  AppRoutingModule,
  AppComponent,
  ErrorComponent,
  LoginComponent,
  HomeComponent,
} from './';
import {CatComponent} from "./cats/cat.component";
import {CatService} from "./shared/services/cat.service";
import {FooterComponent} from "./footer/footer.component";
import {VideoComponent} from "./modal/video.component";


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    HttpModule,
    FormsModule,
    MaterialModule.forRoot(),
    AppRoutingModule,
    SharedModule,
  ],
  declarations: [
    AppComponent,
    ErrorComponent,
    LoginComponent,
    HomeComponent,
    CatComponent,
    FooterComponent,
    VideoComponent,
  ],
  providers: [
    CatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
