import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Apostador }         from '../apostador';
import { ApostadorService }  from '../apostador.service';

@Component({
  selector: 'app-apostador-detail',
  templateUrl: './apostador-detail.component.html',
  styleUrls: [ './apostador-detail.component.css' ]
})
export class ApostadorDetailComponent implements OnInit {
  @Input() apostador: Apostador;

  constructor(
    private route: ActivatedRoute,
    private apostadorService: ApostadorService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getApostador();
  }

  getApostador(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.apostadorService.getApostador(id)
      .subscribe(apostador => this.apostador = apostador);
  }

  goBack(): void {
    this.location.back();
  }

 save(): void {
    this.apostadorService.updateApostador(this.apostador)
      .subscribe(() => this.goBack());
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/