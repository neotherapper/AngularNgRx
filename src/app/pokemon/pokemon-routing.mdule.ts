import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  ViewPokemonPageComponent, FindPokemonPageComponent, PokemonCollectionPageComponent,
} from './containers';

export const routes: Routes = [
  {
    path: 'find',
    component: FindPokemonPageComponent,
    data: { title: 'Find Pokemon' },
  },
  {
    path: ':id',
    component: ViewPokemonPageComponent,
    data: { title: 'Pokemon details' },
  },
  {
    path: '',
    component: PokemonCollectionPageComponent,
    data: { title: 'Pokemon Collection' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokemonRoutingModule {}
