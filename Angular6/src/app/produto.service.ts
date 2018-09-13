import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Produto } from './produto';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class ProdutoService {

  //private produtosUrl = 'api/produtos';  // URL to web api (Angular)
  private produtosUrl = 'http://localhost:38869/api/produtos';  // URL to web api (C#)

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET produtos from the server */
  getProdutos (): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.produtosUrl)
      .pipe(
        tap(produtos => this.log('fetched produtos')),
        catchError(this.handleError('getProdutos', []))
      );
  }

  /** GET produto by id. Return `undefined` when id not found */
  getProdutoNo404<Data>(id: number): Observable<Produto> {
    const url = `${this.produtosUrl}/?id=${id}`;
    return this.http.get<Produto[]>(url)
      .pipe(
        map(produtos => produtos[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} produto id=${id}`);
        }),
        catchError(this.handleError<Produto>(`getProduto id=${id}`))
      );
  }

  /** GET produto by id. Will 404 if id not found */
  getProduto(id: number): Observable<Produto> {
    const url = `${this.produtosUrl}/${id}`;
    return this.http.get<Produto>(url).pipe(
      tap(_ => this.log(`fetched produto id=${id}`)),
      catchError(this.handleError<Produto>(`getProduto id=${id}`))
    );
  }

  /* GET produtos whose name contains search term */
  searchProdutos(term: string): Observable<Produto[]> {
    if (!term.trim()) {
      // if not search term, return empty produto array.
      return of([]);
    }
    return this.http.get<Produto[]>(`${this.produtosUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found produtos matching "${term}"`)),
      catchError(this.handleError<Produto[]>('searchProdutos', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new produto to the server */
  addProduto (produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.produtosUrl, produto, httpOptions).pipe(
      tap((produto: Produto) => this.log(`added produto w/ id=${produto.id}`)),
      catchError(this.handleError<Produto>('addProduto'))
    );
  }

  /** DELETE: delete the produto from the server */
  deleteProduto (produto: Produto | number): Observable<Produto> {
    const id = typeof produto === 'number' ? produto : produto.id;
    const url = `${this.produtosUrl}/${id}`;

    return this.http.delete<Produto>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted produto id=${id}`)),
      catchError(this.handleError<Produto>('deleteProduto'))
    );
  }

  /** PUT: update the produto on the server */
  updateProduto (produto: Produto): Observable<any> {
    return this.http.put(this.produtosUrl, produto, httpOptions).pipe(
      tap(_ => this.log(`updated produto id=${produto.id}`)),
      catchError(this.handleError<any>('updateProduto'))
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

  /** Log a ProdutoService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ProdutoService: ${message}`);
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/