using System;
using System.Web;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

using LoteriasOnline.Models;

namespace LoteriasOnline.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    //[ApiController] //original
    public class JogosController : ControllerBase
    {
        public List<Jogo> jogos { get; set; }

        public JogosController()
        {
            this.jogos = new List<Jogo>(new Jogo[] {
                                                            new Jogo{ id= 100, apostador= new Apostador{ id= 100, name="sorteio" }, produto= new ProdutosController().produtos[0], lista_numeros= new List<int>{2, 14 , 15, 25, 33, 54}, dthr= "11/09/2018 16:41", name= "2 14 15 25 33 54" },
                                                            new Jogo{ id= 1, apostador= new ApostadoresController().apostadores[0], produto= new ProdutosController().produtos[0], lista_numeros= new List<int>{2, 14 , 15, 25, 33, 54}, dthr= "11/09/2018 14:41", name= "2 14 15 25 33 54" },
                                                            new Jogo{ id= 2, apostador= new ApostadoresController().apostadores[1], produto= new ProdutosController().produtos[0], lista_numeros= new List<int>{3, 15, 17, 28, 38, 50}, dthr= "11/09/2018 15:30", name= "3 15 17 28 38 50" }
                                                    }
                                        );
        }

        // GET api/jogos/getJogos
        //[HttpGet] //original
        [ProducesResponseType(200)]
        public List<Jogo> getJogos()
        {
            return this.jogos.OrderBy(x => x.id).ToList();
        }

        // GET api/jogos/getJogo/5
        [HttpGet("{id}", Name = "getJogo")]
        [Route("getJogo/{id}")]
        [ProducesResponseType(200)]
        public Jogo getJogo(int id)
        {
            var retorno = this.jogos.Find(x => x.id.Equals(id));

            return retorno;
        }

        // POST api/jogos/addJogo
        [HttpPost(Name = "addJogo")]
        [Route("addJogo")]
        [ProducesResponseType(200)]
        public Jogo addJogo([FromBody] Jogo jogo)
        {
            try
            {
                jogo.id = (this.jogos != null && this.jogos.Count > 0) ? this.jogos.Max(x => x.id) + 1 : 1;
                string nome = string.Empty;
                if (jogo.lista_numeros != null)
                {
                    switch (jogo.lista_numeros.Count)
                    {
                        case 0:
                            break;
                        case 1:
                            nome = jogo.lista_numeros[0].ToString();
                            break;
                        default:
                            for (int i = 0; i < (jogo.lista_numeros.Count - 2); i++)
                            {
                                nome += jogo.lista_numeros[i].ToString() + " ";
                            }
                            nome += jogo.lista_numeros[jogo.lista_numeros.Count - 1].ToString();
                            break;
                    }
                }
                jogo.name = nome;
                jogo.dthr = DateTime.Now.ToString("dd/MM/yyyy HH:mm");
                this.jogos.Add(jogo);

                return jogo;
            }
            catch (Exception)
            {
                return null;
            }
        }

        //
        //NADA PODE SER ALTERADO!
        //
        // PUT api/jogos/updateJogo
        //[HttpPut("{id}")] //original
        //[HttpPut(Name = "updateJogo")]
        //[Route("updateJogo")]
        //[ProducesResponseType(200)]
        //public int? updateJogo([FromBody] Jogo jogo)
        //{
        //    try
        //    {
        //        int indice = this.jogos.FindIndex(x => x.id.Equals(jogo.id));

        //        //Apenas atributos que podem ser alterados
        //        //NADA PODE SER ALTERADO!

        //        return indice;
        //    }
        //    catch (Exception)
        //    {
        //        return null;
        //    }
        //}

        // DELETE api/jogos/deleteJogo/5
        [HttpDelete("{id}", Name = "deleteJogo")]
        [Route("deleteJogo/{id}")]
        [ProducesResponseType(200)]
        public int? deleteJogo(int id)
        {
            try
            {
                int quantidade = this.jogos.RemoveAll(x => x.id.Equals(id));

                return quantidade;
            }
            catch (Exception)
            {
                return null;
            }
        }

        // api/jogos/surpresinha/1
        [Route("surpresinha/{id_Produto}")]
        [ProducesResponseType(200)]
        public List<int> surpresinha(int id_Produto)
        {
            try
            {
                List<int> retorno = null;

                Produto produto = new ProdutosController().getProduto(id_Produto);

                if (produto != null)
                {
                    retorno = new List<int>();
                    //TODO: se der tempo, aplicar HashSet
                    Random rnd = new Random();
                    //Foi convencionado que a primeira Regra associada ao Produto é sempre referente ao maior prêmio, ou seja, a principal.
                    //(ex. Sena - 6 números, da mega-sena)
                    //Além disso, que a SURPRESINHA contém a quantidade exata do maior prêmio.
                    for (int i = 0; i < (produto.lista_regras[0].qtd_vencer); i++)
                    {
                        //Retorna um número "aleatório" num intervalo de valores mínimo e máximo
                        int novo = rnd.Next(1, produto.qtd_max);

                        //Garantindo que não haja repetição entre os números de um mesmo jogo
                        while (retorno.Exists(x => x.Equals(novo)))
                        {
                            novo = rnd.Next(1, produto.qtd_max);
                        }

                        retorno.Add(novo);
                    }
                }

                return retorno;
            }
            catch (Exception)
            {
                return null;
            }
        }

        // api/jogos/getResultado/1
        [HttpGet("{id}", Name = "getResultado")]
        [Route("getResultado/{id}")]
        [ProducesResponseType(200)]
        public List<Jogo> getResultado(int id)
        {
            try
            {
                List<Jogo> retorno = new List<Jogo>();

                Produto produto = new ProdutosController().getProduto(id);

                //O produto existe?
                if (produto != null && produto.id > 0)
                {
                    //Existem Regras associadas? (pelo menos uma)
                    if (produto.lista_regras != null && produto.lista_regras.Count > 0)
                    {
                        //Existe algum Jogo deste Produto?
                        List<Jogo> jogosDoProduto = getJogos().FindAll(x => x.produto.id.Equals(id));

                        if (jogosDoProduto != null && jogosDoProduto.Count > 0)
                        {
                            //Realiza o SORTEIO
                            List<int> sorteio = surpresinha(id);
                            //Foi convencionado que a primeira Regra associada ao Produto é sempre referente ao maior prêmio, ou seja, a principal.
                            //(ex. Sena - 6 números, da mega-sena)
                            //Além disso, que a SURPRESINHA contém a quantidade exata do maior prêmio.
                            if (sorteio != null && sorteio.Count == produto.lista_regras[0].qtd_vencer)
                            {
                                Jogo sena = new Jogo();
                                sena.id = 0;
                                sena.produto = new Produto();
                                sena.produto = produto;
                                sena.apostador = new Apostador();
                                sena.apostador.name = "SORTEIO";
                                sena.lista_numeros = sorteio;
                                sena.dthr = DateTime.Now.ToString("dd/MM/yyyy HH:mm");

                                //Adiciona no retorno
                                retorno.Add(sena);

                                //Faz a contagem de acertos de cada Jogo do Produto
                                foreach (var jogo in jogosDoProduto)
                                {
                                    int acertos = 0;
                                    foreach (var numero in sorteio)
                                    {
                                        if(jogo.lista_numeros.Exists(x=>x.Equals(numero)))
                                        {
                                            acertos++;
                                        }
                                    }

                                    //Os VENCEDORES serão definidos a partir das Regras associadas ao Produto
                                    if(acertos > 0 && produto.lista_regras.Exists(x=>x.qtd_vencer == acertos))
                                    {
                                        retorno.Add(jogo);
                                    }
                                }
                            }
                        }
                    }
                }

                if (retorno.Count == 1)
                {
                    retorno[0].name = "Não houve vencedores";
                }
                
                return retorno;
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}
