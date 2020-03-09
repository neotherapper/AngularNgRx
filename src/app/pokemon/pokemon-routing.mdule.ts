import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  ViewPokemonPageComponent,
} from './containers';

export const routes: Routes = [
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
