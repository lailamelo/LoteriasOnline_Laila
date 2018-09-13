import { Component, OnInit } from '@angular/core';

import { Jogo } from '../jogo';
import { JogoService } from '../jogo.service';

@Component({
  selector: 'app-resultado-mega-sena',
  templateUrl: './resultado-mega-sena.component.html',
  styleUrls: ['./resultado-mega-sena.component.css']
})

export class ResultadoMegaSenaComponent implements OnInit {
  
  vencedores: Jogo[] = [];

  constructor(private jogoService: JogoService) { }

  private concurso: Jogo;
  
  ngOnInit() {
    this.getResultado();
	
	//this.concurso = this.vencedores
  }


//Jogo concurso  -> (max (jogos.id) && apostador.name ="sorteio" && produto.id = 1)
//List<Jogo> vencedores -> retorno do api/jogos/resultado/1
 // getResultado(): void {
    
      // for(let i = 0; i < this.jogos.length; i++)
      // {
        // if (this.resultado.apostador.name.toLowerCase() == 'sorteio' && this.resultado.produto.id == 1 )
        // {
			
        // }
      // }
	  //this.jogoService.getResultado(1)
      //.subscribe(vencedores => this.vencedores = vencedores);
	  //alert(this.vencedores);

  //}
  
  getResultado(): void {
    this.jogoService.getResultado(1)
      .subscribe(vencedores => this.vencedores = vencedores);
  }



  // pesquisaTipoGuiaTISS(event) {        
  //   let filtrados : TipoGuiaTISS[] = [];
  //   for(let i = 0; i < this.listaTipoGuiaTISS.length; i++) {
  //       let tipoGuiaTISS = this.listaTipoGuiaTISS[i];
  //       // Em qualquer parte do texto (ES6 -> string.includes())
  //       if(tipoGuiaTISS.descricao.toLowerCase().indexOf(event.query.toLowerCase()) != -1) 
  //       {
  //         //filtra na lista e remove os que já existem
  //         if ((filtrados.find(x => x.id == tipoGuiaTISS.id)==null) && this.servico.listaTipoGuiaTISS.find(x => x.id == tipoGuiaTISS.id) == null )
  //         {
  //             //let resultado = this.servico.listaTipoGuiaTISS.find(x => x.id == tipoGuiaTISS.id);
  //             //if (resultado == null)
  //             //{
  //               filtrados.push(tipoGuiaTISS);
  //             //}
  //         }
  //       }
  //   }
  //   this.filtroTipoGuiaTISS = filtrados;
  // }

}