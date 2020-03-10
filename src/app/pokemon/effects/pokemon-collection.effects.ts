import { Injectable } from '@angular/core';

import { Pokemon } from '../models';

import { SelectedPokemonPageActions, PokemonCollectionApiActions, PokemonCollectionPageActions } from '../actions';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, catchError, mergeMap, switchMap } from 'rxjs/operators';
import { of, defer } from 'rxjs';
import { PokemonStorageService } from '../services/pokemon-storage.service';

@Injectable()
export class PokemonCollectionEffects {
  /**
   * This effect does not yield any actions back to the store. Set
   * `dispatch` to false to hint to @ngrx/effects that it should
   * ignore any elements of this effect stream.
   *
   * The `defer` observable accepts an observable factory function
   * that is called when the observable is subscribed to.
   * Wrapping the supported call in `defer` makes
   * effect easier to test.
   */
  checkStorageSupport$ = createEffect(
    () => defer(() => this.pokemonStorageService.supported()),
    { dispatch: false }
  );

  loadPokemonCollection$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PokemonCollectionPageActions.loadCollection),
      switchMap(() =>
        this.pokemonStorageService.getCollection().pipe(
          map((pokemons: Pokemon[]) =>
            PokemonCollectionApiActions.loadPokemonsSuccess({ pokemons })
          ),
          catchError(err =>
            of(PokemonCollectionApiActions.loadPokemonsFailure(err))
          )
        )
      )
    );
  });

  addPokemonToCollection$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SelectedPokemonPageActions.addPokemon),
      mergeMap(({ pokemon }) =>
        this.pokemonStorageService.addToCollection([pokemon]).pipe(
          map(() => PokemonCollectionApiActions.addPokemonSuccess({ pokemon })),
          catchError(err =>
            of(PokemonCollectionApiActions.addPokemonFailure({ pokemon }))
          )
        )
      )
    );
  });

  removePokemonFromCollection$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(SelectedPokemonPageActions.removePokemon),
        mergeMap( ({pokemon}) =>
          this.pokemonStorageService.removeFromCollection([pokemon.id.toString()]).pipe(
            map(() => PokemonCollectionApiActions.removePokemonSuccess({pokemon})),
            catchError(err =>
              of(PokemonCollectionApiActions.addPokemonFailure({pokemon}))
            )
          )
        )
      );
  });

  constructor(
    private actions$: Actions,
    private pokemonStorageService: PokemonStorageService
  ) {}
}
