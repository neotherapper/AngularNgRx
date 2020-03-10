import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromRoot from '@angular-ngrx/reducers';
import * as fromAuth from '@angular-ngrx/auth/reducers';
import { AuthActions } from '@angular-ngrx/auth/actions';
import { LayoutActions } from '@angular-ngrx/core/actions';

@Component({
  selector: 'bc-main',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bc-layout>
      <bc-sidenav [open]="showSidenav$ | async" (closeMenu)="closeSidenav()">
        <bc-nav-item
          (navigate)="closeSidenav()"
          *ngIf="loggedIn$ | async"
          routerLink="/"
          icon="book"
          hint="View your Pokemon collection"
        >
          My Collection
        </bc-nav-item>
        <bc-nav-item
          (navigate)="closeSidenav()"
          *ngIf="loggedIn$ | async"
          routerLink="/pokemon/find"
          icon="search"
          hint="Find your next pokemon!"
        >
          Browse Pokemons
        </bc-nav-item>
        <bc-nav-item (navigate)="closeSidenav()" *ngIf="!(loggedIn$ | async)">
          Sign In
        </bc-nav-item>
        <bc-nav-item (navigate)="logout()" *ngIf="loggedIn$ | async">
          Sign Out
        </bc-nav-item>
      </bc-sidenav>
      <bc-toolbar (openMenu)="openSidenav()">
        Pokemons
      </bc-toolbar>
      <router-outlet></router-outlet>
    </bc-layout>
  `,
})
export class AppComponent {
  showSidenav$: Observable<boolean>;
  loggedIn$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State & fromAuth.State>) {
    /**
     * Selectors can be applied with the `select` operator which passes the state
     * tree to the provided selector
     */
    this.showSidenav$ = this.store.pipe(select(fromRoot.selectShowSidenav));
    this.loggedIn$ = this.store.pipe(select(fromAuth.selectLoggedIn));
  }

  closeSidenav() {
    /**
     * All state updates are handled through dispatched actions in 'container'
     * components. This provides a clear, reproducible history of state
     * updates and user interaction through the life of our
     * application.
     */
    this.store.dispatch(LayoutActions.closeSidenav());
  }

  openSidenav() {
    this.store.dispatch(LayoutActions.openSidenav());
  }

  logout() {
    this.store.dispatch(AuthActions.logoutConfirmation());
  }
}
