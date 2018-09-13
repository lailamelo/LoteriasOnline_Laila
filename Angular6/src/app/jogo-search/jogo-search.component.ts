import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Jogo } from '../jogo';
import { JogoService } from '../jogo.service';

@Component({
  selector: 'app-jogo-search',
  templateUrl: './jogo-search.component.html',
  styleUrls: [ './jogo-search.component.css' ]
})
export class JogoSearchComponent implements OnInit {
  jogos$: Observable<Jogo[]>;
  private searchTerms = new Subject<string>();

  constructor(private jogoService: JogoService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.jogos$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.jogoService.searchJogos(term)),
    );
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/