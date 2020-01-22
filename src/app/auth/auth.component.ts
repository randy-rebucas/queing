import { Component, OnInit } from '@angular/core';
import { FirebaseUISignInSuccessWithAuthResult, FirebaseUISignInFailure } from 'firebaseui-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, Route } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit() {
    this.angularFireAuth.authState.subscribe((response) => {
      if (response) {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/auth']);
      }
    });
  }

  successCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult) {
    // check if its new user
    if (signInSuccessData.authResult.additionalUserInfo.isNewUser) {
      // signInSuccessData.authResult.additionalUserInfo.providerId
      // this.user = signInSuccessData.authResult.user;
      this.router.navigate(['/dashboard']);
      // this.usersService.insert(this.user).then(() => {
      //   this.router.navigateByUrl('/setup');
      // });
    }
  }

  errorCallback(errorData: FirebaseUISignInFailure) {
    console.log(errorData);
  }

}
