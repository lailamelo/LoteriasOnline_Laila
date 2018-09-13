import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Regra } from './regra';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class RegraService {

  //private regrasUrl = 'api/regras';  // URL to web api (Angular)
  private regrasUrl = 'http://localhost:38869/api/regras';  // URL to web api (C#)

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET regras from the server */
  getRegras (): Observable<Regra[]> {
    return this.http.get<Regra[]>(this.regrasUrl)
      .pipe(
        tap(regras => this.log('fetched regras')),
        catchError(this.handleError('getRegras', []))
      );
  }

  /** GET regra by id. Return `undefined` when id not found */
  getRegraNo404<Data>(id: number): Observable<Regra> {
    const url = `${this.regrasUrl}/?id=${id}`;
    return this.http.get<Regra[]>(url)
      .pipe(
        map(regras => regras[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} regra id=${id}`);
        }),
        catchError(this.handleError<Regra>(`getRegra id=${id}`))
      );
  }

  /** GET regra by id. Will 404 if id not found */
  getRegra(id: number): Observable<Regra> {
    const url = `${this.regrasUrl}/${id}`;
    return this.http.get<Regra>(url).pipe(
      tap(_ => this.log(`fetched regra id=${id}`)),
      catchError(this.handleError<Regra>(`getRegra id=${id}`))
    );
  }

  /* GET regras whose name contains search term */
  searchRegras(term: string): Observable<Regra[]> {
    if (!term.trim()) {
      // if not search term, return empty regra array.
      return of([]);
    }
    return this.http.get<Regra[]>(`${this.regrasUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found regras matching "${term}"`)),
      catchError(this.handleError<Regra[]>('searchRegras', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new regra to the server */
  addRegra (regra: Regra): Observable<Regra> {
    return this.http.post<Regra>(this.regrasUrl, regra, httpOptions).pipe(
      tap((regra: Regra) => this.log(`added regra w/ id=${regra.id}`)),
      catchError(this.handleError<Regra>('addRegra'))
    );
  }

  /** DELETE: delete the regra from the server */
  deleteRegra (regra: Regra | number): Observable<Regra> {
    const id = typeof regra === 'number' ? regra : regra.id;
    const url = `${this.regrasUrl}/${id}`;

    return this.http.delete<Regra>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted regra id=${id}`)),
      catchError(this.handleError<Regra>('deleteRegra'))
    );
  }

  /** PUT: update the regra on the server */
  updateRegra (regra: Regra): Observable<any> {
    return this.http.put(this.regrasUrl, regra, httpOptions).pipe(
      tap(_ => this.log(`updated regra id=${regra.id}`)),
      catchError(this.handleError<any>('updateRegra'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a RegraService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`RegraService: ${message}`);
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/