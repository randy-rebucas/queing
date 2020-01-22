import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { QueingService } from '../shared/queing.service';
import { Observable } from 'rxjs';
import { Queing } from '../shared/queing';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public queingsObs: Observable<Queing[]>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private angularFireAuth: AngularFireAuth,
    private queingService: QueingService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.angularFireAuth.authState.subscribe((response) => {
      if (!response) {
        this.router.navigate(['/auth']);
      }
    });

    this.queingsObs = this.queingService.get();
  }

  onAddQue() {
    const que  = {
      uniqueNumber: Math.floor(Math.random() * 999999999),
      name: {
        firstname: 'anjoe',
        lastname: 'elyana'
      },
      priority: 'Normal',
      created: new Date()
    };
    this.queingService.insert(que).then((res) => {
      console.log(res);
    });
  }
}
