import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Pokemon } from '@angular-ngrx/pokemon/models';

@Component({
  selector: 'bc-pokemon-detail',
  template: `
    <mat-card *ngIf="pokemon">
      <mat-card-title-group>
        <mat-card-title>{{ title }}</mat-card-title>
        <mat-card-subtitle *ngIf="subtitle">{{ subtitle }}</mat-card-subtitle>
        <img mat-card-sm-image *ngIf="thumbnail" [src]="thumbnail" />
      </mat-card-title-group>
      <mat-card-content>
        <p [innerHtml]="height"></p>
      </mat-card-content>
      <mat-card-actions align="start">
        <button
          mat-raised-button
          color="warn"
          *ngIf="inCollection"
          (click)="remove.emit(pokemon)"
        >
          Remove Pokemon from Collection
        </button>
        <button
          mat-raised-button
          color="primary"
          *ngIf="!inCollection"
          (click)="add.emit(pokemon)"
        >
          Add Pokemon to Collection
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [
    `
      :host {
        display: flex;
        justify-content: center;
        margin: 75px 0;
      }
      mat-card {
        max-width: 600px;
      }
      mat-card-title-group {
        margin-left: 0;
      }
      img {
        width: 60px;
        min-width: 60px;
        margin-left: 5px;
      }
      mat-card-content {
        margin: 15px 0 50px;
      }
      mat-card-actions {
        margin: 25px 0 0 !important;
      }
      mat-card-footer {
        padding: 0 25px 25px;
        position: relative;
      }
    `,
  ],
})
export class PokemonDetailComponent {
  /**
   * Presentational components receive data through @Input() and communicate events
   * through @Output() but generally maintain no internal state of their
   * own. All decisions are delegated to 'container', or 'smart'
   * components before data updates flow back down.
   *
   * More on 'smart' and 'presentational' components: https://gist.github.com/btroncone/a6e4347326749f938510#utilizing-container-components
   */
  @Input() pokemon!: Pokemon;
  @Input() inCollection!: boolean;
  @Output() add = new EventEmitter<Pokemon>();
  @Output() remove = new EventEmitter<Pokemon>();

  /**
   * Tip: Utilize getters to keep templates clean
   */
  get id() {
    return this.pokemon.id;
  }

  get title() {
    if (this.pokemon && this.pokemon.name) {
      return this.pokemon.name;
    }
  }

  get subtitle() {
    if (this.pokemon && this.pokemon.species && this.pokemon.species.name) {
      return this.pokemon.species.name;
    }
  }

  get height() {
    return this.pokemon.height;
  }

  get thumbnail() {
    return (
      this.pokemon.sprites.back_default &&
      this.pokemon.sprites.back_default.replace('http:', '')
    );
  }
}
