import { createAction, props } from '@ngrx/store';

import { Pokemon } from '@angular-ngrx/pokemon/models';

/**
 * Add Pokemon to Collection Actions
 */
export const addPokemonSuccess = createAction(
  '[Pokemon/Collection/API] Add Book Success',
  props<{ pokemon: Pokemon }>()
);

export const addPokemonFailure = createAction(
  '[Pokemon/Collection/API] Add Book Failure',
  props<{ pokemon: Pokemon }>()
);

/**
 * Remove Pokemon from Collection Actions
 */
export const removePokemonSuccess = createAction(
  '[Pokemon/Collection/API] Remove Book Success',
  props<{ pokemon: Pokemon }>()
);

export const removeBookFailure = createAction(
  '[Pokemon/Collection/API] Remove Book Failure',
  props<{ pokemon: Pokemon }>()
);

/**
 * Load Collection Actions
 */
export const loadPokemonSuccess = createAction(
  '[Pokemon/Collection/API] Load Pokemon Success',
  props<{ pokemon: Pokemon[] }>()
);

export const loadPokemonFailure = createAction(
  '[Pokemon/Collection/API] Load Pokemon Failure',
  props<{ error: any }>()
);
