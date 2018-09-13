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
    public class RegrasController : ControllerBase
    {
        public List<Regra> regras { get; set; }
        public List<Regra> REGRAS_MEGASENA { get; set; }

        public RegrasController()
        {
            this.regras = new List<Regra>(new Regra[] {
                                                        new Regra{ id= 1, name= "Sena", qtd_vencer= 6 },
                                                        new Regra{ id= 2, name= "Quina", qtd_vencer= 5 },
                                                        new Regra{ id= 3, name= "Quadra", qtd_vencer= 4 }
                                                      }
            );

            this.REGRAS_MEGASENA = new List<Regra>(new Regra[] {
                                                        new Regra{ id= 1, name= "Sena", qtd_vencer= 6 },
                                                        new Regra{ id= 2, name= "Quina", qtd_vencer= 5 },
                                                        new Regra{ id= 3, name= "Quadra", qtd_vencer= 4 }
                                                      }
            );
        }

        // GET api/regras/getRegras
        //[HttpGet] //original
        [ProducesResponseType(200)]
        public List<Regra> getRegras()
        {
            return this.regras.OrderBy(x=>x.id).ToList();
        }

        // GET api/regras/getRegra/5
        [HttpGet("{id}", Name = "getRegra")]
        [Route("getRegra/{id}")]
        [ProducesResponseType(200)]
        public Regra getRegra(int id)
        {
            var retorno = this.regras.Find(x=>x.id.Equals(id));

            return retorno;
        }

        // POST api/regras/addRegra
        [HttpPost(Name = "addRegra")]
        [Route("addRegra")]
        [ProducesResponseType(200)]
        public Regra addRegra([FromBody] Regra regra)
        {
            try
            {
                regra.id = (this.regras != null && this.regras.Count > 0) ? this.regras.Max(x => x.id) + 1 : 1;

                this.regras.Add(regra);

                return regra;
            }
            catch (Exception)
            {
                return null;
            }
        }

        // PUT api/regras/updateRegra
        //[HttpPut("{id}")] //original
        [HttpPut(Name = "updateJogo")]
        [Route("updateJogo")]
        [ProducesResponseType(200)]
        public int? updateRegra([FromBody] Regra regra)
        {
            try
            {
                int indice = this.regras.FindIndex(x => x.id.Equals(regra.id));

                //Apenas atributos que podem ser alterados
                this.regras[indice].name = regra.name;
                this.regras[indice].qtd_vencer = regra.qtd_vencer;

                return indice;
            }
            catch (Exception)
            {
                return null;
            }
        }

        // DELETE api/regras/deleteRegra/5
        //[HttpDelete("{id}")]
        [HttpDelete("{id}", Name = "deleteRegra")]
        [Route("deleteRegra/{id}")]
        [ProducesResponseType(200)]
        public int? deleteRegra(int id)
        {
            try
            {
                int quantidade = this.regras.RemoveAll(x => x.id.Equals(id));

                return quantidade;
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}
