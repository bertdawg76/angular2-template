import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { AuthService, ToastService, ConfirmComponent, Data } from '../shared';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private dialogRef: MdDialogRef<ConfirmComponent>;
  private user: Observable<any> = this.auth.user$;
  showDialog = false;

  public constructor (
    private auth: AuthService,
    private toast: ToastService,
    private dialog: MdDialog,
    private viewContainerRef: ViewContainerRef,
    private data: Data,
  ) {}

  public ngOnInit () {
    this.toast.info('hello toast worl!');
  }

  private openDialog () {
    let config = new MdDialogConfig();
    config.viewContainerRef = this.viewContainerRef;
    this.dialogRef = this.dialog.open(ConfirmComponent, config);
    this.dialogRef.componentInstance.data = {title: 'Please Confrim'};
    this.dialogRef.afterClosed().subscribe(result => {
      console.log('result: ' + result);
      this.dialogRef = null;
    });
  }
}
