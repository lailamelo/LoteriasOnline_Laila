using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

using LoteriasOnline.Models;
using System.Data.SqlClient;
using System.Collections;

namespace LoteriasOnline.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    //[ApiController] //original
    public class ProdutosController : ControllerBase
    {
        public List<Produto> produtos { get; set; }

        public ProdutosController()
        {
            this.produtos = new List<Produto>(new Produto[] {
                                                            new Produto{ id= 1, name= "mega-sena", qtd_max= 60, lista_regras= new RegrasController().REGRAS_MEGASENA }
                                                            }
            );
        }

        // GET api/produtos/getProdutos
        //[HttpGet] //original
        [ProducesResponseType(200)]
        public List<Produto> getProdutos()
        {
            return this.produtos.OrderBy(x=>x.id).ToList();
        }

        // GET api/produtos/getProduto/5
        [HttpGet("{id}", Name = "getProduto")]
        [Route("getProduto/{id}")]
        [ProducesResponseType(200)]
        public Produto getProduto(int id)
        {
            var retorno = this.produtos.Find(x=>x.id.Equals(id));

            return retorno;
        }

        // POST api/produtos/addProduto
        [HttpPost(Name = "addProduto")]
        [Route("addProduto")]
        [ProducesResponseType(200)]
        public Produto addProduto([FromBody] Produto produto)
        {
            try
            {
                produto.id = (this.produtos != null && this.produtos.Count > 0) ? this.produtos.Max(x => x.id) + 1 : 1;

                this.produtos.Add(produto);

                return produto;
            }
            catch (Exception)
            {
                return null;
            }
        }

        // PUT api/produtos/updateProduto
        //[HttpPut("{id}")] //original
        [HttpPut(Name = "updateProduto")]
        [Route("updateProduto")]
        [ProducesResponseType(200)]
        public int? updateProduto([FromBody] Produto produto)
        {
            try
            {
                int indice = this.produtos.FindIndex(x => x.id.Equals(produto.id));

                //Apenas atributos que podem ser alterados
                this.produtos[indice].name = produto.name;
                this.produtos[indice].qtd_max = produto.qtd_max;
                this.produtos[indice].lista_regras = produto.lista_regras;

                return indice;
            }
            catch (Exception)
            {
                return null;
            }
        }

        // DELETE api/produtos/deleteProduto/5
        //[HttpDelete("{id}")]
        [HttpDelete("{id}", Name = "deleteProduto")]
        [Route("deleteProduto/{id}")]
        [ProducesResponseType(200)]
        public int? deleteProduto(int id)
        {
            try
            {
                int quantidade = this.produtos.RemoveAll(x => x.id.Equals(id));

                return quantidade;
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}
