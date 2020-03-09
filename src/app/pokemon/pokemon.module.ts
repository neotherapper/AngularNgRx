import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Material
import { MaterialModule } from '@angular-ngrx/material';
import { PokemonDetailComponent, PokemonSearchComponent, PokemonPreviewComponent, PokemonPreviewListComponent } from './components';
import { ViewPokemonPageComponent } from './containers/view-pokemon-page.container';
import { SelectedPokemonPageComponent } from './containers/selected-pokemon-page.container';

// NGRX

export const COMPONENTS = [
  PokemonDetailComponent,
  PokemonPreviewComponent,
  PokemonPreviewListComponent,
  PokemonSearchComponent
];

export const CONTAINERS = [
  SelectedPokemonPageComponent,
  ViewPokemonPageComponent
];


@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  declarations: [COMPONENTS, CONTAINERS],
})
export class PokemonModule {}
