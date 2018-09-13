import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';

import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

import { ApostadoresComponent } from './apostadores/apostadores.component';
import { ApostadorDetailComponent } from './apostador-detail/apostador-detail.component';

import { JogosComponent } from './jogos/jogos.component';
import { JogoDetailComponent } from './jogo-detail/jogo-detail.component';

import { ProdutosComponent } from './produtos/produtos.component';
import { ProdutoDetailComponent } from './produto-detail/produto-detail.component';

import { RegrasComponent } from './regras/regras.component';
import { RegraDetailComponent } from './regra-detail/regra-detail.component';

import { MessagesComponent } from './messages/messages.component';

import { ResultadoMegaSenaComponent } from './resultado-mega-sena/resultado-mega-sena.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'detailHero/:id', component: HeroDetailComponent },
  { path: 'apostadores', component: ApostadoresComponent },
  { path: 'detailApostador/:id', component: ApostadorDetailComponent },
  { path: 'jogos', component: JogosComponent },
  { path: 'detailJogo/:id/:id_Produto', component: JogoDetailComponent },
  { path: 'produtos', component: ProdutosComponent },
  { path: 'detailProduto/:id', component: ProdutoDetailComponent },
  { path: 'regras', component: RegrasComponent },
  { path: 'detailRegra/:id', component: RegraDetailComponent },
  { path: 'messages', component: MessagesComponent },
  { path: 'resultado', component: ResultadoMegaSenaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/