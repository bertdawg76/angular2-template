import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../shared';


@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: [ './login.component.scss' ],
  providers: [],
})

export class LoginComponent implements OnDestroy {
  private username: '';
  private password: '';
  private error: any = '';
  private authSub: any = {};
  private resetSub: any = {};

  constructor(private auth: AuthService, private router: Router) {}

  public login() {
    this.error = '';
    this.authSub = this.auth.login(this.username, this.password)
      .subscribe(
        () => this.router.navigate(['/']),
        () => this.error = 'Incorrect credentials. Please try again.'
      );
  }

  public resetPassword() {
    this.resetSub = this.auth.resetPassword(this.username)
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }

  public ngOnDestroy () {
    if (this.authSub && this.authSub.unsubscribe) {
      this.authSub.unsubscribe();
    }
    if (this.resetSub && this.resetSub.unsubscribe) {
      this.resetSub.unsubscribe();
    }
  }
}
