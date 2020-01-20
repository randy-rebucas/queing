import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  userIsAuthenticated: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private angularFireAuth: AngularFireAuth,
  ) {
    this.userIsAuthenticated = false;
  }
  
  ngOnInit(): void {
    this.angularFireAuth.authState.subscribe((response) => {
      if (response) {
        this.userIsAuthenticated = true;
      } else {
        this.userIsAuthenticated = false;
      }
    });
  }

  onLogout() {
    this.angularFireAuth.auth.signOut();
  }
}
