import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Apostador } from '../apostador';
import { ApostadorService } from '../apostador.service';

import { Jogo } from '../jogo';
import { JogoService } from '../jogo.service';

import { Produto } from '../produto';
import { ProdutoService } from '../produto.service';

import { Hero } from '../hero';

@Component({
  selector: 'app-jogo-detail',
  templateUrl: './jogo-detail.component.html',
  styleUrls: ['./jogo-detail.component.css']
})

export class JogoDetailComponent implements OnInit {
  jogo: Jogo;
  jogos: Jogo[] = [];
  produto: Produto;
  produtos: Produto[] = [];
  apostadores: Apostador[] = [];
  selectedApostador: Apostador;
  selectedProduto: Produto;
  numeroInformado: number;
  
  constructor(
    private route: ActivatedRoute,
    private jogoService: JogoService,
    private produtoService: ProdutoService,
    private apostadorService : ApostadorService,
    private location: Location
  ) { }

  items: number[];
  createRange(number){
    this.items = [];
    for(var i = 1; i <= number; i++){
       this.items.push(i);
    }
    return this.items;
  }
  
  
  ngOnInit(): void {
	this.getApostadores();
	this.getProdutos();
    this.getJogo();
  }
  
  
  /*//Apostador selecionado
  onSelect(apostador: Apostador): void {
    this.selectedApostador = apostador;
  }
  
  //Produto selecionado
  onSelect(produto: Produto): void {
    this.selectedProduto = produto;
  }*/
  

  getJogo(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    const id_Produto = +this.route.snapshot.paramMap.get('id_Produto');
    if (id !== 0) {
      this.jogoService.getJogo(id)
        .subscribe(jogo => this.jogo = jogo);
    }
	else
	{
		this.jogo = null;
		this.produtoService.getProduto(1).subscribe(produto => this.selectedProduto = produto);
		//this.selectedProduto = produto;
	}
  }
  
  getProdutos(): void {
    this.produtoService.getProdutos()
      .subscribe(produtos => this.produtos = produtos);
  }
  
  getApostadores(): void {
    this.apostadorService.getApostadores()
    .subscribe(apostadores => this.apostadores = apostadores);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.jogoService.updateJogo(this.jogo)
      .subscribe(() => this.goBack());
  }
  
  add(): void {
	//alert('lista_numeros: ' + this.lista_numeros);
	
	//Verificações de preenchimento
	if(
			(this.selectedProduto == undefined || this.selectedProduto == null || this.selectedProduto.id == null)
			||
			(this.selectedApostador == undefined || this.selectedApostador == null)
			||
			(this.lista_numeros == undefined || this.lista_numeros == null)
		)
	{
		alert('Existem campos obrigatórios não preenchidos.');
	}
	else
	{
	if(this.jogo == undefined) { 
		this.jogo = new Jogo();
	}
	
	this.jogo.id = 0;
	//alert('this.jogo.id:' + this.jogo.id);
	this.jogo.apostador = new Apostador();
	this.jogo.apostador = this.selectedApostador;
	//alert('this.jogo.apostador:' + this.jogo.apostador);
	this.produto = new Produto();
	//alert(this.produto);
	//this.jogo.produto = this.produto;
	this.jogo.produto = this.selectedProduto;
	//alert('this.jogo.produto.id:' + this.jogo.produto.id);
	this.jogo.lista_numeros = [];
	this.jogo.lista_numeros = this.lista_numeros;
    //alert('this.jogo.lista_numeros' + this.jogo.lista_numeros);
	
	//this.jogoService.addJogo(this.jogo).subscribe(jogo => {this.jogos.push(jogo)});
	this.jogoService.addJogo(this.jogo)
      .subscribe(() => this.goBack());
	//alert('this.jogo.id: ' + this.jogo.id);
  }};
  
  lista_numeros: number[];
  adicionarNumero(): void {
	
	if(this.jogo == undefined) { 
		this.jogo = new Jogo();
	}
	
	  this.jogo.id = 0;
	  this.jogo.lista_numeros = [];
	  
	  //alert(this.lista_numeros);
	  
	  if(this.numeroInformado == undefined || this.numeroInformado == null)
	  {
		  alert('Atenção: O campo Nº ESCOLHIDO é obrigatório.');
	  }
	  else
	  {
	  if(this.numeroInformado < 1 || this.numeroInformado > this.produtos[0].qtd_max)
	  {
		  alert('Não é possível informar um número fora do intervalo: 1 - ' + this.produtos[0].qtd_max);
	  }
	  else
	  {
	  if(
			this.lista_numeros == undefined
			||
			(this.lista_numeros.length >= 0 && this.lista_numeros.length < this.produtos[0].lista_regras[0].qtd_vencer)
		)
	  {
		  if(this.lista_numeros == undefined) {
			  this.lista_numeros = [];
		  }
		  
		  let existe = 0;
		  for(let i = 0; i < this.lista_numeros.length; i++)
		  {
			  if(this.lista_numeros[i] == this.numeroInformado)
			  {
				  existe++;
			  }
		  }			  
		  
		  if(existe === 0) {
			  this.lista_numeros.push(this.numeroInformado); 
		  }
		  else
		  {
			  alert('Atenção: o número informado ' + this.numeroInformado + ' já existe na lista.');
		  }
		  
	  }
	  else
	  {
		  alert('Não é possível adicionar mais do que a quantidade máxima permitida (' + this.produtos[0].lista_regras[0].qtd_vencer + ' números). Nº informado: ' + this.numeroInformado );
	  }
	  }
	  }
  }

}
/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/