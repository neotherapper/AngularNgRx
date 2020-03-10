import { createAction, props } from '@ngrx/store';

export const searchPokemon = createAction(
  '[Find Pokemon Page] Search Pokemon',
  props<{ query: string }>()
);
