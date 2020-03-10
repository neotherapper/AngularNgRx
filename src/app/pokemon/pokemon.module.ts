import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PokemonRoutingModule } from './pokemon-routing.mdule';

// Material
import { MaterialModule } from '@angular-ngrx/material';
import { PokemonDetailComponent, PokemonSearchComponent, PokemonPreviewComponent, PokemonPreviewListComponent } from './components';
import { ViewPokemonPageComponent } from './containers/view-pokemon-page.container';
import { SelectedPokemonPageComponent } from './containers/selected-pokemon-page.container';
import { PokemonCollectionPageComponent, FindPokemonPageComponent } from './containers';


// NGRX
import * as fromPokemon from './reducers';
import { PokemonEffects, PokemonCollectionEffects } from './effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

export const COMPONENTS = [
  PokemonDetailComponent,
  PokemonPreviewComponent,
  PokemonPreviewListComponent,
  PokemonSearchComponent
];

export const CONTAINERS = [
  FindPokemonPageComponent,
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

    /**
     * Effects.forFeature is used to register effects
     * from feature modules. Effects can be loaded
     * eagerly or lazily and will be started immediately.
     *
     * All Effects will only be instantiated once regardless of
     * whether they are registered once or multiple times.
     */
    EffectsModule.forFeature([PokemonEffects, PokemonCollectionEffects]),
  ],
  declarations: [COMPONENTS, CONTAINERS],
})
export class PokemonModule {}
