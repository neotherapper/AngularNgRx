import { createReducer, on } from '@ngrx/store';

import {
  PokemonCollectionApiActions,
  PokemonCollectionPageActions,
} from '@angular-ngrx/pokemon/actions';

export const collectionFeatureKey = 'collection';

export interface State {
  loaded: boolean;
  loading: boolean;
  ids: string[];
}

const initialState: State = {
  loaded: false,
  loading: false,
  ids: [],
};

export const reducer = createReducer(
         initialState,
         on(PokemonCollectionPageActions.loadCollection, state => ({
           ...state,
           loading: true,
         })),
         on(
           PokemonCollectionApiActions.loadPokemonSuccess,
           (state, { pokemon }) => ({
             loaded: true,
             loading: false,
             ids: pokemon.map(pok => pok.id.toString()),
           })
         ),
         // Supports handing multiple types of actions
         on(
           PokemonCollectionApiActions.addPokemonSuccess,
           PokemonCollectionApiActions.removePokemonFailure,
           (state, { pokemon }) => {
             if (state.ids.indexOf(pokemon.id.toString()) > -1) {
               return state;
             }
             return {
               ...state,
               ids: [...state.ids, pokemon.id.toString()],
             };
           }
         ),
         on(
           PokemonCollectionApiActions.removePokemonSuccess,
           PokemonCollectionApiActions.addPokemonFailure,
           (state, { pokemon }) => ({
             ...state,
             ids: state.ids.filter(id => id !== pokemon.id.toString()),
           })
         )
       );

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getIds = (state: State) => state.ids;
