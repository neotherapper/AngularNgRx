import { Pokemon } from '@angular-ngrx/pokemon/models';
import {
  createSelector,
  createFeatureSelector,
  combineReducers,
  Action,
} from '@ngrx/store';
import * as fromSearch from '@angular-ngrx/pokemon/reducers/search.reducer';
import * as fromPokemon from '@angular-ngrx/pokemon/reducers/pokemon.reducer';
import * as fromCollection from '@angular-ngrx/pokemon/reducers/pokemon-collection.reducer';
import * as fromRoot from '@angular-ngrx/reducers';

export const pokemonFeatureKey = 'pokemon';

export interface PokemonState {
  [fromSearch.searchFeatureKey]: fromSearch.State;
  [fromPokemon.pokemonFeatureKey]: fromPokemon.State;
  [fromCollection.collectionFeatureKey]: fromCollection.State;
}

export interface State extends fromRoot.State {
  [pokemonFeatureKey]: PokemonState;
}

/** Provide reducer in AoT-compilation happy way */
export function reducers(state: PokemonState | undefined, action: Action) {
  return combineReducers({
    [fromSearch.searchFeatureKey]: fromSearch.reducer,
    [fromPokemon.pokemonFeatureKey]: fromPokemon.reducer,
    [fromCollection.collectionFeatureKey]: fromCollection.reducer,
  })(state, action);
}

/**
 * A selector function is a map function factory. We pass it parameters and it
 * returns a function that maps from the larger state tree into a smaller
 * piece of state. This selector simply selects the `pokemon` state.
 *
 * Selectors are used with the `select` operator.
 *
 * ```ts
 * class MyComponent {
 *   constructor(state$: Observable<State>) {
 *     this.pokemonState$ = state$.pipe(select(getPokemonState));
 *   }
 * }
 * ```
 */

/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */
export const selectPokemonState = createFeatureSelector<State, PokemonState>(
  pokemonFeatureKey
);

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them usable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function creates very efficient selectors that are memoized and
 * only recompute when arguments change. The created selectors can also be composed
 * together to select different pieces of state.
 */
export const selectPokemonEntitiesState = createSelector(
  selectPokemonState,
  state => state.pokemon
);

export const selectSelectedPokemonId = createSelector(
  selectPokemonEntitiesState,
  fromPokemon.selectId
);

/**
 * Adapters created with @ngrx/entity generate
 * commonly used selector functions including
 * getting all ids in the record set, a dictionary
 * of the records by id, an array of records and
 * the total number of records. This reduces boilerplate
 * in selecting records from the entity state.
 */
export const {
  selectIds: selectPokemonIds,
  selectEntities: selectPokemonEntities,
  selectAll: selectAllPokemon,
  selectTotal: selectTotalPokemon,
} = fromPokemon.adapter.getSelectors(selectPokemonEntitiesState);

export const selectSelectedPokemon = createSelector(
  selectPokemonEntities,
  selectSelectedPokemonId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);

/**
 * Just like with the pokemon selectors, we also have to compose the search
 * reducer's and collection reducer's selectors.
 */
export const selectSearchState = createSelector(
  selectPokemonState,
  state => state.search
);

export const selectSearchPokemonIds = createSelector(
  selectSearchState,
  fromSearch.getIds
);
export const selectSearchQuery = createSelector(
  selectSearchState,
  fromSearch.getQuery
);
export const selectSearchLoading = createSelector(
  selectSearchState,
  fromSearch.getLoading
);
export const selectSearchError = createSelector(
  selectSearchState,
  fromSearch.getError
);

/**
 * Some selector functions create joins across parts of state. This selector
 * composes the search result IDs to return an array of pokemon in the store.
 */
export const selectSearchResults = createSelector(
  selectPokemonEntities,
  selectSearchPokemonIds,
  (pokemons, searchIds) => {
    return searchIds
      .map(id => pokemons[id])
      .filter((pokemon): pokemon is Pokemon => pokemon != null);
  }
);

export const selectCollectionState = createSelector(
  selectPokemonState,
  state => state.collection
);

export const selectCollectionLoaded = createSelector(
  selectCollectionState,
  fromCollection.getLoaded
);
export const getCollectionLoading = createSelector(
  selectCollectionState,
  fromCollection.getLoading
);
export const selectCollectionPokemonIds = createSelector(
  selectCollectionState,
  fromCollection.getIds
);

export const selectPokemonCollection = createSelector(
  selectPokemonEntities,
  selectCollectionPokemonIds,
  (entities, ids) => {
    return ids
      .map(id => entities[id])
      .filter((pokemon): pokemon is Pokemon => pokemon != null);
  }
);

export const isSelectedPokemonInCollection = createSelector(
  selectCollectionPokemonIds,
  selectSelectedPokemonId,
  (ids, selected) => {
    return !!selected && ids.indexOf(selected) > -1;
  }
);
