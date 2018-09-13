import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Regra }         from '../regra';
import { RegraService }  from '../regra.service';

@Component({
  selector: 'app-regra-detail',
  templateUrl: './regra-detail.component.html',
  styleUrls: [ './regra-detail.component.css' ]
})
export class RegraDetailComponent implements OnInit {
  @Input() regra: Regra;

  constructor(
    private route: ActivatedRoute,
    private regraService: RegraService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getRegra();
  }

  getRegra(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.regraService.getRegra(id)
      .subscribe(regra => this.regra = regra);
  }

  goBack(): void {
    this.location.back();
  }

 save(): void {
    this.regraService.updateRegra(this.regra)
      .subscribe(() => this.goBack());
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/