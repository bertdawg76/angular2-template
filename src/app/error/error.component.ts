import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../shared';


@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: [ './error.component.scss' ],
})

export class ErrorComponent implements OnInit, OnDestroy {
  private interval: any;
  private remainingSeconds: number = 5;

  public constructor (
    private router: Router,
    private auth: AuthService
  ) {}

  public ngOnInit () {
    this.countdown();
  }

  public ngOnDestroy () {
    clearInterval(this.interval);
  }

  private countdown () {
    this.interval = setInterval(() => {
      this.remainingSeconds--;
      if (this.remainingSeconds === 0) {
        clearInterval(this.interval);
        this.redirect();
      }
    }, 1000);
  }

  private redirect () {
    this.router.navigate(['/']);
  }
}
