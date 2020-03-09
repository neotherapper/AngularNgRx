import { GameIndice } from './gameindice';
import { Type } from './types';
import { Ability } from './ability';
import { Stat } from './stats';
import { Form } from './form';
import { Move } from './moves';
import { Sprites } from './sprites';
import { Species } from './species';

export interface Pokemon {
  abilities: Ability[];
  base_experience: number;
  forms: Form[];
  game_indices: GameIndice[];
  height: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  name: string;
  order: number;
  species: Species;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  weight: number;
}
