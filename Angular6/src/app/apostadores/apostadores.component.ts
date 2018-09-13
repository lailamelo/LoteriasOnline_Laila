import { Component, OnInit } from '@angular/core';

import { Apostador } from '../apostador';
import { ApostadorService } from '../apostador.service';

@Component({
  selector: 'app-apostadores',
  templateUrl: './apostadores.component.html',
  styleUrls: ['./apostadores.component.css']
})
export class ApostadoresComponent implements OnInit {
  apostadores: Apostador[];

  constructor(private apostadorService: ApostadorService) { }

  ngOnInit() {
    this.getApostadores();
  }

  getApostadores(): void {
    this.apostadorService.getApostadores()
    .subscribe(apostadores => this.apostadores = apostadores);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.apostadorService.addApostador({ name } as Apostador)
      .subscribe(apostador => {
        this.apostadores.push(apostador);
      });
  }

  delete(apostador: Apostador): void {
    this.apostadores = this.apostadores.filter(h => h !== apostador);
    this.apostadorService.deleteApostador(apostador).subscribe();
  }

}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/