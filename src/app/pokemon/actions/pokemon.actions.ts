import { createAction, props } from '@ngrx/store';

import { Pokemon } from '@angular-ngrx/pokemon/models';

export const loadPokemon = createAction(
  '[Pokemon Exists Guard] Load Book',
  props<{ pokemon: Pokemon }>()
);
