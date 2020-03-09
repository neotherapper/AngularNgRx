import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PokemonDetailComponent, PokemonSearchComponent } from '@angular-ngrx/pokemon/components';

export const COMPONENTS = [PokemonDetailComponent, PokemonSearchComponent];

export const CONTAINERS = [];


@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [COMPONENTS, CONTAINERS],
})
export class PokemonModule {}
