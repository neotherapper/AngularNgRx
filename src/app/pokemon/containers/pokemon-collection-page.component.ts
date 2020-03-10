import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { PokemonCollectionPageActions } from '../actions';
import { Pokemon } from '../models';
import * as fromPokemon from '../reducers';

@Component({
  selector: 'bc-pokemon-collection-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card>
      <mat-card-title>My Collection</mat-card-title>
    </mat-card>
    <bc-pokemon-preview-list [pokemons]="pokemons$ | async"></bc-pokemon-preview-list>
  `,
  /**
   * Container components are permitted to have just enough styles
   * to bring the view together. If the number of styles grow,
   * consider breaking them out into presentational
   * components.
   */
  styles: [
    `
      mat-card-title {
        display: flex;
        justify-content: center;
      }
    `,
  ],
})
export class PokemonCollectionPageComponent implements OnInit {
  pokemons$: Observable<Pokemon[]>;

  constructor(private store: Store<fromPokemon.State>) {
    this.pokemons$ = store.pipe(select(fromPokemon.selectPokemonCollection));
  }

  ngOnInit() {
    this.store.dispatch(PokemonCollectionPageActions.loadCollection());
  }
}
