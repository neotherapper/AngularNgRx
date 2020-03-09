import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Pokemon } from '@angular-ngrx/pokemon/models';

@Injectable({
  providedIn: 'root',
})
export class PokemonApiService {
  private API_PATH = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private http: HttpClient) {}

  searchPokemon(queryTitle: string): Observable<Pokemon[]> {
    return this.http
      .get<Pokemon[]>(`${this.API_PATH}?limit=81&q=${queryTitle}`)
      .pipe(map(pokemon => pokemon || []));
  }

  retrievePokemon(id: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.API_PATH}/${id}`);
  }
}
