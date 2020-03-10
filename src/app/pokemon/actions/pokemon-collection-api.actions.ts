import { createAction, props } from '@ngrx/store';

import { Pokemon } from '@angular-ngrx/pokemon/models';

/**
 * Add Pokemon to Collection Actions
 */
export const addPokemonSuccess = createAction(
  '[Pokemon/Collection/API] Add Pokemon Success',
  props<{ pokemon: Pokemon }>()
);

export const addPokemonFailure = createAction(
  '[Pokemon/Collection/API] Add Pokemon Failure',
  props<{ pokemon: Pokemon }>()
);

/**
 * Remove Pokemon from Collection Actions
 */
export const removePokemonSuccess = createAction(
  '[Pokemon/Collection/API] Remove Pokemon Success',
  props<{ pokemon: Pokemon }>()
);

export const removePokemonFailure = createAction(
  '[Pokemon/Collection/API] Remove Pokemon Failure',
  props<{ pokemon: Pokemon }>()
);

/**
 * Load Collection Actions
 */
export const loadPokemonsSuccess = createAction(
  '[Pokemon/Collection/API] Load Pokemon Success',
  props<{ pokemons: Pokemon[] }>()
);

export const loadPokemonsFailure = createAction(
  '[Pokemon/Collection/API] Load Pokemon Failure',
  props<{ error: any }>()
);
