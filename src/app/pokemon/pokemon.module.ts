import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PokemonRoutingModule } from './pokemon-routing.mdule';

// Material
import { MaterialModule } from '@angular-ngrx/material';
import { PokemonDetailComponent, PokemonSearchComponent, PokemonPreviewComponent, PokemonPreviewListComponent } from './components';
import { ViewPokemonPageComponent } from './containers/view-pokemon-page.container';
import { SelectedPokemonPageComponent } from './containers/selected-pokemon-page.container';
import { PokemonCollectionPageComponent } from './containers';


// NGRX
import * as fromPokemon from '@angular-ngrx/pokemon/reducers';
import { StoreModule } from '@ngrx/store';

export const COMPONENTS = [
  PokemonDetailComponent,
  PokemonPreviewComponent,
  PokemonPreviewListComponent,
  PokemonSearchComponent
];

export const CONTAINERS = [
  PokemonCollectionPageComponent,
  SelectedPokemonPageComponent,
  ViewPokemonPageComponent
];


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    PokemonRoutingModule,

    /**
     * StoreModule.forFeature is used for composing state
     * from feature modules. These modules can be loaded
     * eagerly or lazily and will be dynamically added to
     * the existing state.
     */
    StoreModule.forFeature(fromPokemon.pokemonFeatureKey, fromPokemon.reducers),
  ],
  declarations: [COMPONENTS, CONTAINERS],
})
export class PokemonModule {}
