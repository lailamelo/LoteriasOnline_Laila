import { Component, OnInit } from '@angular/core';

import { Regra } from '../regra';
import { RegraService } from '../regra.service';

@Component({
  selector: 'app-regras',
  templateUrl: './regras.component.html',
  styleUrls: ['./regras.component.css']
})
export class RegrasComponent implements OnInit {
  regras: Regra[];

  constructor(private regraService: RegraService) { }

  ngOnInit() {
    this.getRegras();
  }

  getRegras(): void {
    this.regraService.getRegras()
    .subscribe(regras => this.regras = regras);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.regraService.addRegra({ name } as Regra)
      .subscribe(regra => {
        this.regras.push(regra);
      });
  }

  delete(regra: Regra): void {
    this.regras = this.regras.filter(h => h !== regra);
    this.regraService.deleteRegra(regra).subscribe();
  }

}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/