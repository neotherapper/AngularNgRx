
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { SelectedPokemonPageActions } from '@angular-ngrx/pokemon/actions';
import { Pokemon } from '@angular-ngrx/pokemon/models';
import * as fromPokemon from '@angular-ngrx/pokemon/reducers';

@Component({
  selector: 'bc-selected-book-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bc-pokemon-detail
      [pokemon]="pokemon$ | async"
      [inCollection]="isSelectedPokemonInCollection$ | async"
      (add)="addToCollection($event)"
      (remove)="removeFromCollection($event)"
    >
    </bc-pokemon-detail>
  `,
})
export class SelectedPokemonPageComponent {
  pokemon$: Observable<Pokemon>;
  isSelectedPokemonInCollection$: Observable<boolean>;

  constructor(private store: Store<fromPokemon.State>) {
    this.pokemon$ = store.pipe(select(fromPokemon.selectSelectedPokemon)) as Observable<
      Pokemon
    >;
    this.isSelectedPokemonInCollection$ = store.pipe(
      select(fromPokemon.isSelectedPokemonInCollection)
    );
  }

  addToCollection(pokemon: Pokemon) {
    this.store.dispatch(SelectedPokemonPageActions.addPokemon({ pokemon }));
  }

  removeFromCollection(pokemon: Pokemon) {
    this.store.dispatch(SelectedPokemonPageActions.removePokemon({ pokemon }));
  }
}
