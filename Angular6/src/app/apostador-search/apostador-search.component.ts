import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Apostador } from '../apostador';
import { ApostadorService } from '../apostador.service';

@Component({
  selector: 'app-apostador-search',
  templateUrl: './apostador-search.component.html',
  styleUrls: [ './apostador-search.component.css' ]
})
export class ApostadorSearchComponent implements OnInit {
  apostadores$: Observable<Apostador[]>;
  private searchTerms = new Subject<string>();

  constructor(private apostadorService: ApostadorService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.apostadores$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.apostadorService.searchApostadores(term)),
    );
  }

  selectedApostador: Apostador;
  onSelect(apostador: Apostador): void
  {
      this.selectedApostador = apostador;
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/