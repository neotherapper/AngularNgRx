import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import * as fromPokemon from '@angular-ngrx/pokemon/reducers';
import { ViewPokemonPageActions } from '@angular-ngrx/pokemon/actions';

/**
 * Note: Container components are also reusable. Whether or not
 * a component is a presentation component or a container
 * component is an implementation detail.
 *
 * The View Pokemon Page's responsibility is to map router params
 * to a 'Select' Pokemon action. Actually showing the selected
 * pokemon remains a responsibility of the
 * SelectedPokemonkPageComponent
 */
@Component({
  selector: 'bc-view-pokemon-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bc-selected-pokemon-page></bc-selected-pokemon-page>
  `,
})
export class ViewPokemonPageComponent implements OnDestroy {
  actionsSubscription: Subscription;

  constructor(store: Store<fromPokemon.State>, route: ActivatedRoute) {
    this.actionsSubscription = route.params
      .pipe(map(params => ViewPokemonPageActions.selectPokemon({ id: params.id })))
      .subscribe(action => store.dispatch(action));
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }
}
