import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationError, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private routerSub: Subscription;
  private dataSub: Subscription;

  constructor(
    private router: Router,
    private title: Title,
  ) {}

  public ngOnInit () {
    let routerSub = this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe(event => {
          // scroll to top on route change
          window.scrollTo(0, 0);
          // change browser tab/window title on route change
          this.dataSub = this.router.routerState.root.firstChild.data.subscribe((data: any) => {
            let titleStr = data.title || this.router.routerState.root.firstChild.routeConfig.path;
            this.setTitle(titleStr);
          });
      });
  }

  public ngOnDestroy () {
    this.routerSub.unsubscribe();
    this.dataSub.unsubscribe();
  }

  private setTitle (moreTitle: string) {
    let title = 'angular2-template';
    if (moreTitle) {
      title += ` | ${moreTitle}`;
    }
    this.title.setTitle(title);
  }
}
