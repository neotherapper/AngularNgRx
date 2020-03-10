import { Inject, Injectable, InjectionToken } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Pokemon } from '../models';

export function storageFactory() {
  return typeof window === undefined || typeof localStorage === undefined
    ? null
    : localStorage;
}

export const LOCAL_STORAGE_TOKEN = new InjectionToken(
  'angular-ngrx-local-storage',
  { factory: storageFactory }
);

@Injectable({ providedIn: 'root' })
export class PokemonStorageService {
  private collectionKey = 'pokemon-collection';

  supported(): Observable<boolean> {
    return this.storage !== null
      ? of(true)
      : throwError('Local Storage Not Supported');
  }

  getCollection(): Observable<Pokemon[]> {
    return this.supported().pipe(
      map(_ => this.storage.getItem(this.collectionKey)),
      map((value: string | null) => (value ? JSON.parse(value) : []))
    );
  }

  addToCollection(records: Pokemon[]): Observable<Pokemon[]> {
    return this.getCollection().pipe(
      map((value: Pokemon[]) => [...value, ...records]),
      tap((value: Pokemon[]) =>
        this.storage.setItem(this.collectionKey, JSON.stringify(value))
      )
    );
  }

  removeFromCollection(ids: Array<string>): Observable<Pokemon[]> {
    return this.getCollection().pipe(
      map((value: Pokemon[]) => value.filter(item => !ids.includes(item.id.toString()))),
      tap((value: Pokemon[]) =>
        this.storage.setItem(this.collectionKey, JSON.stringify(value))
      )
    );
  }

  deleteCollection(): Observable<boolean> {
    return this.supported().pipe(
      tap(() => this.storage.removeItem(this.collectionKey))
    );
  }

  constructor(@Inject(LOCAL_STORAGE_TOKEN) private storage: Storage) {}
}
