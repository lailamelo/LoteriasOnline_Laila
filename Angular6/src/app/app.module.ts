import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { InMemoryDataService } from './in-memory-data.service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';

import { ApostadoresComponent } from './apostadores/apostadores.component';
import { ApostadorDetailComponent } from './apostador-detail/apostador-detail.component';
import { ApostadorSearchComponent } from './apostador-search/apostador-search.component';
import { ApostadorService } from './apostador.service';

import { JogosComponent } from './jogos/jogos.component';
import { JogoDetailComponent } from './jogo-detail/jogo-detail.component';
import { JogoService } from './jogo.service';

import { ProdutosComponent } from './produtos/produtos.component';
import { ProdutoDetailComponent } from './produto-detail/produto-detail.component';
import { ProdutoService } from './produto.service';

import { RegrasComponent } from './regras/regras.component';
import { RegraDetailComponent } from './regra-detail/regra-detail.component';
import { RegraService } from './regra.service';

import { MessagesComponent } from './messages/messages.component';
import { ResultadoMegaSenaComponent } from './resultado-mega-sena/resultado-mega-sena.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule/*,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )*/
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    HeroSearchComponent,
    JogoDetailComponent,
    JogosComponent,
    ProdutoDetailComponent,
    ProdutosComponent,
    ApostadorSearchComponent,
    RegrasComponent,
    RegraDetailComponent,
    ApostadoresComponent,
    ApostadorDetailComponent,
    ResultadoMegaSenaComponent
  ],
  bootstrap: [AppComponent],
  providers: [ApostadorService, JogoService, ProdutoService, RegraService]
})
export class AppModule { }


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/