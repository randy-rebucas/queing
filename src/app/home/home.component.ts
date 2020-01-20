import { Component, OnInit } from '@angular/core';
import { QueingService } from '../shared/queing.service';
import { Observable } from 'rxjs';
import { Queing } from '../shared/queing';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public queing$: Observable<Queing[]>;

  constructor(
    private queingService: QueingService,
    private angularFireAuth: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit() {
    this.angularFireAuth.authState.subscribe((response) => {
      if (!response) {
        this.router.navigate(['/auth']);
      }
    });

    this.queing$ = this.queingService.get();
  }

}
