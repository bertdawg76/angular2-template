import { Component, OnInit, Input } from '@angular/core';
import { MdDialogRef } from '@angular/material';


@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit  {
  @Input() data;
  private dataDefaults: {} = {
    title: 'Confirm',
    body: 'Are you sure?',
    okText: 'OK',
    cancelText: 'Cancel',
  };
  constructor(public dialogRef: MdDialogRef<ConfirmComponent>) {}
  public ngOnInit () {
    this.data = Object.assign({}, this.dataDefaults, this.data);
  }
}
