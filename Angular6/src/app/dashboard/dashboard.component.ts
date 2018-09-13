import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

import { Apostador } from '../apostador';
import { ApostadorService } from '../apostador.service';

import { Jogo } from '../jogo';
import { JogoService } from '../jogo.service';

import { Produto } from '../produto';
import { ProdutoService } from '../produto.service';

import { Regra } from '../regra';
import { RegraService } from '../regra.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  apostadores: Apostador[] = [];
  jogos: Jogo[] = [];
  produtos: Produto[] = [];
  regras: Regra[] =[];

  constructor(
    private heroService: HeroService, 
    private apostadorService: ApostadorService,
    private jogoService: JogoService, 
    private produtoService: ProdutoService,
    private regraService: RegraService) { }

  ngOnInit() {
    /*this.getHeroes();*/
    this.getJogos();

    this.getProdutos();
  }

  // getHeroes(): void {
  //   this.heroService.getHeroes()
  //     .subscribe(heroes => this.heroes = heroes.slice(0, 6));
  // }

  getProdutos(): void {
    this.produtoService.getProdutos()
      .subscribe(produtos => this.produtos = produtos);
  }

  getJogos(): void {
    this.jogoService.getJogos()
      .subscribe(jogos => this.jogos = jogos);
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/