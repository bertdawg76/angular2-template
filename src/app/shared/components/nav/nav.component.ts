import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { AuthService } from '../../services';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['nav.component.scss']
})
export class NavComponent implements OnInit {
  private user: Observable<any> = this.auth.user$;

  constructor (private auth: AuthService, private router: Router) { }

  public ngOnInit () { }

  private logout () {
    this.auth.logout();
    // this.router.navigate(['/login']);
  }
}
