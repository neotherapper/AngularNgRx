import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  ViewPokemonPageComponent, FindPokemonPageComponent,
} from './containers';

export const routes: Routes = [
  {
    path: 'find',
    component: FindPokemonPageComponent,
    data: { title: 'Find book' },
  },
  {
    path: ':id',
    component: ViewPokemonPageComponent,
    data: { title: 'Pokemon details' },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokemonRoutingModule {}
