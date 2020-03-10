import { Component, Input } from '@angular/core';

import { Pokemon } from '../models/pokemon';

@Component({
  selector: 'bc-pokemon-preview',
  template: `
    <a [routerLink]="['/pokemon', id]">
      <mat-card>
        <mat-card-title-group>
          <img mat-card-sm-image *ngIf="thumbnail" [src]="thumbnail" />
          <mat-card-title>{{ title }}</mat-card-title>
          <mat-card-subtitle *ngIf="subtitle">{{
            subtitle
          }}</mat-card-subtitle>
        </mat-card-title-group>
        <mat-card-content>
          <p *ngIf="height">{{ height }}</p>
        </mat-card-content>
      </mat-card>
    </a>
  `,
  styles: [
    `
      :host {
        display: flex;
      }
      :host a {
        display: flex;
      }
      mat-card {
        width: 400px;
        margin: 15px;
        display: flex;
        flex-flow: column;
        justify-content: space-between;
      }
      @media only screen and (max-width: 768px) {
        mat-card {
          margin: 15px 0 !important;
        }
      }
      mat-card:hover {
        box-shadow: 3px 3px 16px -2px rgba(0, 0, 0, 0.5);
      }
      mat-card-title {
        margin-right: 10px;
      }
      mat-card-title-group {
        margin: 0;
      }
      a {
        color: inherit;
        text-decoration: none;
      }
      img {
        width: 60px;
        min-width: 60px;
        margin-left: 5px;
      }
      mat-card-content {
        margin-top: 15px;
        margin: 15px 0 0;
      }
      span {
        display: inline-block;
        font-size: 13px;
      }
      mat-card-footer {
        padding: 0 25px 25px;
      }
    `,
  ],
})
export class PokemonPreviewComponent {
  @Input() pokemon!: Pokemon;

  get id() {
    return this.pokemon.id;
  }

  get title() {
    return this.pokemon.name;
  }

  get subtitle() {
    return this.pokemon.species.name;
  }

  get height() {
    return this.pokemon.height;
  }

  get thumbnail(): string | boolean {
    if (
      this.pokemon &&
      this.pokemon.sprites &&
      this.pokemon.sprites.front_default
    ) {
      return this.pokemon.sprites.front_default.replace('http:', '');
    }

    return false;
  }
}
