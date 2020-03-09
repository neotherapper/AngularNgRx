import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Credentials } from '@angular-ngrx/auth/models';
import * as fromAuth from '@angular-ngrx/auth/reducers';
import { LoginPageActions } from '@angular-ngrx/auth/actions';

@Component({
  selector: 'bc-login-page',
  template: `
    <bc-login-form
      (submitted)="onSubmit($event)"
      [pending]="pending$ | async"
      [errorMessage]="error$ | async"
    >
    </bc-login-form>
  `,
  styles: [],
})
export class LoginPageComponent implements OnInit {
  pending$ = this.store.pipe(select(fromAuth.selectLoginPagePending));
  error$ = this.store.pipe(select(fromAuth.selectLoginPageError));

  constructor(private store: Store<fromAuth.State>) {}

  ngOnInit() {}

  onSubmit(credentials: Credentials) {
    this.store.dispatch(LoginPageActions.login({ credentials }));
  }
}
