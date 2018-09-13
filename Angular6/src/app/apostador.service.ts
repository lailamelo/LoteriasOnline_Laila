import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Apostador } from './apostador';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class ApostadorService {

  //private apostadoresUrl = 'api/apostadores';  // URL to web api (Angular)
  private apostadoresUrl = 'http://localhost:38869/api/apostadores';  // URL to web api (C#)

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET apostadores from the server */
  getApostadores (): Observable<Apostador[]> {
    return this.http.get<Apostador[]>(this.apostadoresUrl)
      .pipe(
        tap(apostadores => this.log('fetched apostadores')),
        catchError(this.handleError('getApostadores', []))
      );
  }

  /** GET apostador by id. Return `undefined` when id not found */
  getApostadorNo404<Data>(id: number): Observable<Apostador> {
    const url = `${this.apostadoresUrl}/?id=${id}`;
    return this.http.get<Apostador[]>(url)
      .pipe(
        map(apostadores => apostadores[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} apostador id=${id}`);
        }),
        catchError(this.handleError<Apostador>(`getApostador id=${id}`))
      );
  }

  /** GET apostador by id. Will 404 if id not found */
  getApostador(id: number): Observable<Apostador> {
    const url = `${this.apostadoresUrl}/${id}`;
    return this.http.get<Apostador>(url).pipe(
      tap(_ => this.log(`fetched apostador id=${id}`)),
      catchError(this.handleError<Apostador>(`getApostador id=${id}`))
    );
  }

  /* GET apostadores whose name contains search term */
  searchApostadores(term: string): Observable<Apostador[]> {
    if (!term.trim()) {
      // if not search term, return empty apostador array.
      return of([]);
    }
    
    return this.http.get<Apostador[]>(`${this.apostadoresUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found apostadores matching "${term}"`)),
      catchError(this.handleError<Apostador[]>('searchApostadores', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new apostador to the server */
  addApostador (apostador: Apostador): Observable<Apostador> {
    return this.http.post<Apostador>(this.apostadoresUrl, apostador, httpOptions).pipe(
      tap((apostador: Apostador) => this.log(`added apostador w/ id=${apostador.id}`)),
      catchError(this.handleError<Apostador>('addApostador'))
    );
  }

  /** DELETE: delete the apostador from the server */
  deleteApostador (apostador: Apostador | number): Observable<Apostador> {
    const id = typeof apostador === 'number' ? apostador : apostador.id;
    const url = `${this.apostadoresUrl}/${id}`;

    return this.http.delete<Apostador>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted apostador id=${id}`)),
      catchError(this.handleError<Apostador>('deleteApostador'))
    );
  }

  /** PUT: update the apostador on the server */
  updateApostador (apostador: Apostador): Observable<any> {
    return this.http.put(this.apostadoresUrl, apostador, httpOptions).pipe(
      tap(_ => this.log(`updated apostador id=${apostador.id}`)),
      catchError(this.handleError<any>('updateApostador'))
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

  /** Log a ApostadorService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ApostadorService: ${message}`);
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/