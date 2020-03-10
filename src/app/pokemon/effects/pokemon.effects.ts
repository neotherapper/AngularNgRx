import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { asyncScheduler, EMPTY as empty, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  map,
  skip,
  switchMap,
  takeUntil,
} from 'rxjs/operators';

import { Pokemon } from '../models';
import {
  PokemonApiActions,
  FindPokemonPageActions,
} from '../actions';
import { PokemonApiService } from '@angular-ngrx/core/services';

/**
 * Effects offer a way to isolate and easily test side-effects within your
 * application.
 *
 * If you are unfamiliar with the operators being used in these examples, please
 * check out the sources below:
 *
 * Official Docs: http://reactivex.io/rxjs/manual/overview.html#categories-of-operators
 * RxJS 5 Operators By Example: https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35
 */

@Injectable()
export class PokemonEffects {
  search$ = createEffect(
    () => ({ debounce = 300, scheduler = asyncScheduler } = {}) =>
      this.actions$.pipe(
        ofType(FindPokemonPageActions.searchPokemon),
        debounceTime(debounce, scheduler),
        switchMap(({ query }) => {
          if (query === '') {
            return empty;
          }

          const nextSearch$ = this.actions$.pipe(
            ofType(FindPokemonPageActions.searchPokemon),
            skip(1)
          );

          return this.pokemonApiService.searchPokemon(query).pipe(
            takeUntil(nextSearch$),
            map((pokemons: Pokemon[]) => PokemonApiActions.searchSuccess({ pokemons })),
            catchError(err =>
              of(PokemonApiActions.searchFailure({ errorMsg: err.message }))
            )
          );
        })
      )
  );

  constructor(
    private actions$: Actions,
    private pokemonApiService: PokemonApiService
  ) {}
}
