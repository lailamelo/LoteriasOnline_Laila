import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Jogo } from './jogo';
export const JOGOS: Jogo[] = [];

import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class JogoService {

  //private jogosUrl = 'api/jogos';  // URL to web api (Angular)
  private jogosUrl = 'http://localhost:38869/api/jogos';  // URL to web api (C#)

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET jogos from the server */
  getJogos (): Observable<Jogo[]> {
    return this.http.get<Jogo[]>(this.jogosUrl)
      .pipe(
        tap(jogos => this.log('fetched jogos')),
        catchError(this.handleError('getJogos', []))
      );
  }
  
  getResultado(id: number): Observable<Jogo[]> {
	  const url = `${this.jogosUrl}/getResultado/${id}`;
    return this.http.get<Jogo[]>(url)
      .pipe(
        tap(jogos => this.log('fetched getResultado')),
        catchError(this.handleError('getResultado', []))
      );
  }

  /** GET jogo by id. Return `undefined` when id not found */
  getJogoNo404<Data>(id: number): Observable<Jogo> {
    const url = `${this.jogosUrl}/?id=${id}`;
    return this.http.get<Jogo[]>(url)
      .pipe(
        map(jogos => jogos[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} jogo id=${id}`);
        }),
        catchError(this.handleError<Jogo>(`getJogo id=${id}`))
      );
  }

  /** GET jogo by id. Will 404 if id not found */
  getJogo(id: number): Observable<Jogo> {
    const url = `${this.jogosUrl}/${id}`;
    return this.http.get<Jogo>(url).pipe(
      tap(_ => this.log(`fetched jogo id=${id}`)),
      catchError(this.handleError<Jogo>(`getJogo id=${id}`))
    );
  }

  /* GET jogos whose name contains search term */
  searchJogos(term: string): Observable<Jogo[]> {
    if (!term.trim()) {
      // if not search term, return empty jogo array.
      return of([]);
    }
    return this.http.get<Jogo[]>(`${this.jogosUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found jogos matching "${term}"`)),
      catchError(this.handleError<Jogo[]>('searchJogos', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new jogo to the server */
  addJogo (jogo: Jogo): Observable<Jogo> {
    return this.http.post<Jogo>(this.jogosUrl, jogo, httpOptions).pipe(
      tap((jogo: Jogo) => this.log(`added jogo w/ id=${jogo.id}`)),
      catchError(this.handleError<Jogo>('addJogo'))
    );
  }

  /** DELETE: delete the jogo from the server */
  deleteJogo (jogo: Jogo | number): Observable<Jogo> {
    const id = typeof jogo === 'number' ? jogo : jogo.id;
    const url = `${this.jogosUrl}/${id}`;

    return this.http.delete<Jogo>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted jogo id=${id}`)),
      catchError(this.handleError<Jogo>('deleteJogo'))
    );
  }

  /** PUT: update the jogo on the server */
  updateJogo (jogo: Jogo): Observable<any> {
    return this.http.put(this.jogosUrl, jogo, httpOptions).pipe(
      tap(_ => this.log(`updated jogo id=${jogo.id}`)),
      catchError(this.handleError<any>('updateJogo'))
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

  /** Log a JogoService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`JogoService: ${message}`);
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/