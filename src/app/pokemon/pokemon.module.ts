import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

export const COMPONENTS = [];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: COMPONENTS,
})
export class PokemonModule {}
