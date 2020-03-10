import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of, from } from 'rxjs';
import { map } from 'rxjs/operators';

import { Pokemon, PokemonShort } from '@angular-ngrx/pokemon/models';

@Injectable({
  providedIn: 'root',
})
export class PokemonApiService {
  private API_PATH = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private http: HttpClient) {}

  searchPokemon(queryTitle: string): Observable<Pokemon[]> {
    return from(this.getFirstPokemonFullData());
  }

  searchPokemons(queryTitle: string): Observable<Pokemon[]> {
    return this.http
      .get<{
        previous: number;
        next: string;
        count: number;
        results: Pokemon[];
      }>(`${this.API_PATH}?limit=5`)
      .pipe(map(pokemon => pokemon.results || []));
  }

  getFirstPokemon(): Promise<PokemonShort[]> {
    return this.http
      .get<{
        previous: number;
        next: string;
        count: number;
        results: PokemonShort[];
      }>(`${this.API_PATH}?limit=3`)
      .pipe(map(pokemon => pokemon.results || []))
      .toPromise();
  }

  async getFirstPokemonFullData(): Promise<Pokemon[]> {
    const firstPokemon = await this.getFirstPokemon();
    let pokemonData: Pokemon[] = [];
    const pokemonUrlsToSearch = firstPokemon.map(pokemon => pokemon.url);

    return Promise.all(
      pokemonUrlsToSearch.map(url => this.retrievePokemonByUrl(url))
    ).then(data => (pokemonData = data));
  }

  retrievePokemonByUrl(url: string): Promise<Pokemon> {
    return this.http.get<Pokemon>(url).toPromise();
  }

  retrievePokemon(id: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.API_PATH}/${id}`);
  }
}
