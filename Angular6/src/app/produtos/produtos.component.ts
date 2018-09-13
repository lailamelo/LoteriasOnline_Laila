import { Component, OnInit } from '@angular/core';

import { Produto } from '../produto';
import { ProdutoService } from '../produto.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {
  produtos: Produto[];

  constructor(private produtoService: ProdutoService) { }

  ngOnInit() {
    this.getProdutos();
  }

  getProdutos(): void {
    this.produtoService.getProdutos()
    .subscribe(produtos => this.produtos = produtos);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.produtoService.addProduto({ name } as Produto)
      .subscribe(produto => {
        this.produtos.push(produto);
      });
  }

  delete(produto: Produto): void {
    this.produtos = this.produtos.filter(h => h !== produto);
    this.produtoService.deleteProduto(produto).subscribe();
  }

}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/