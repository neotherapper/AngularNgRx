import { Component, Input } from '@angular/core';

import { Pokemon } from '../models/pokemon';

@Component({
  selector: 'bc-pokemon-preview-list',
  template: `
    <bc-pokemon-preview
      *ngFor="let poke of pokemon"
      [pokemon]="poke"
    ></bc-pokemon-preview>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      }
    `,
  ],
})
export class PokemonPreviewListComponent {
  @Input() pokemon!: Pokemon[];
}
