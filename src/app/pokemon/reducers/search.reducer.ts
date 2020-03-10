import {
  PokemonApiActions,
  FindPokemonPageActions,
} from '@angular-ngrx/pokemon/actions';
import { createReducer, on } from '@ngrx/store';

export const searchFeatureKey = 'search';

export interface State {
  ids: string[];
  loading: boolean;
  error: string;
  query: string;
}

const initialState: State = {
  ids: [],
  loading: false,
  error: '',
  query: '',
};

export const reducer = createReducer(
  initialState,
  on(FindPokemonPageActions.searchPokemon, (state, { query }) => {
    return query === ''
      ? {
          ids: [],
          loading: false,
          error: '',
          query,
        }
      : {
          ...state,
          loading: true,
          error: '',
          query,
        };
  }),
  on(PokemonApiActions.searchSuccess, (state, { pokemons }) => ({
    ids: pokemons.map(pokemon => pokemon.id.toString()),
    loading: false,
    error: '',
    query: state.query,
  })),
  on(PokemonApiActions.searchFailure, (state, { errorMsg }) => ({
    ...state,
    loading: false,
    error: errorMsg,
  }))
);

export const getIds = (state: State) => state.ids;

export const getQuery = (state: State) => state.query;

export const getLoading = (state: State) => state.loading;

export const getError = (state: State) => state.error;
