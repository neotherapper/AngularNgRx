import { createAction, props } from '@ngrx/store';

import { Pokemon } from '@angular-ngrx/pokemon/models';

export const searchSuccess = createAction(
  '[Pokemon/API] Search Success',
  props<{ pokemons: Pokemon[] }>()
);

export const searchFailure = createAction(
  '[Pokemon/API] Search Failure',
  props<{ errorMsg: string }>()
);
