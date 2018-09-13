import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Produto }         from '../produto';
import { ProdutoService }  from '../produto.service';

@Component({
  selector: 'app-produto-detail',
  templateUrl: './produto-detail.component.html',
  styleUrls: [ './produto-detail.component.css' ]
})
export class ProdutoDetailComponent implements OnInit {
  @Input() produto: Produto;

  constructor(
    private route: ActivatedRoute,
    private produtoService: ProdutoService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getProduto();
  }

  getProduto(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.produtoService.getProduto(id)
      .subscribe(produto => this.produto = produto);
  }

  goBack(): void {
    this.location.back();
  }

 save(): void {
    this.produtoService.updateProduto(this.produto)
      .subscribe(() => this.goBack());
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/