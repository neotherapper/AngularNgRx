import { ChangeDetectionStrategy, Component } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { FindPokemonPageActions } from '../actions';
import { Pokemon } from '../models';
import * as fromPokemon from '../reducers';

@Component({
  selector: 'bc-find-pokemon-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bc-pokemon-search
      [query]="searchQuery$ | async"
      [searching]="loading$ | async"
      [error]="error$ | async"
      (search)="search($event)"
    >
    </bc-pokemon-search>
    <bc-pokemon-preview-list [pokemons]="pokemons$ | async"> </bc-pokemon-preview-list>
  `,
})
export class FindPokemonPageComponent {
  searchQuery$: Observable<string>;
  pokemons$: Observable<Pokemon[]>;
  loading$: Observable<boolean>;
  error$: Observable<string>;

  constructor(private store: Store<fromPokemon.State>) {
    this.searchQuery$ = store.pipe(
      select(fromPokemon.selectSearchQuery),
      take(1)
    );
    this.pokemons$ = store.pipe(select(fromPokemon.selectSearchResults));
    this.loading$ = store.pipe(select(fromPokemon.selectSearchLoading));
    this.error$ = store.pipe(select(fromPokemon.selectSearchError));
  }

  search(query: string) {
    this.store.dispatch(FindPokemonPageActions.searchPokemon({ query }));
  }
}
