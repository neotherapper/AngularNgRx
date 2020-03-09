import { createAction, props } from '@ngrx/store';

import { Pokemon } from '@angular-ngrx/books/models';

/**
 * Add Pokemon to Collection Action
 */
export const addPokemon = createAction(
  '[Selected Pokemon Page] Add Pokemon',
  props<{ pokemon: Pokemon }>()
);

/**
 * Remove Pokemon from Collection Action
 */
export const removePokemon = createAction(
  '[Selected Pokemon Page] Remove Pokemon',
  props<{ pokemon: Pokemon }>()
);
