import { createAction, props } from '@ngrx/store';

export const selectPokemon = createAction(
  '[View Pokemon Page] Select Pokemon',
  props<{ id: string }>()
);
