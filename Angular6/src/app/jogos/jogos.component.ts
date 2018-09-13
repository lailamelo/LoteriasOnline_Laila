import { Component, OnInit } from '@angular/core';

import { Jogo } from '../jogo';
import { JogoService } from '../jogo.service';

@Component({
  selector: 'app-jogos',
  templateUrl: './jogos.component.html',
  styleUrls: ['./jogos.component.css']
})
export class JogosComponent implements OnInit {
  jogos: Jogo[];

  constructor(private jogoService: JogoService) { }

  ngOnInit() {
    this.getJogos();
  }

  getJogos(): void {
    this.jogoService.getJogos()
    .subscribe(jogos => this.jogos = jogos);
  }

  // add(name: string): void {
  //   name = name.trim();
  //   if (!name) { return; }
  //   this.jogoService.addJogo({ name } as Jogo)
  //     .subscribe(jogo => {
  //       this.jogos.push(jogo);
  //     });
  // }

  delete(jogo: Jogo): void {
    this.jogos = this.jogos.filter(h => h !== jogo);
    this.jogoService.deleteJogo(jogo).subscribe();
  }

}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/