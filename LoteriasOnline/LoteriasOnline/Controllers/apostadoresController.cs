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
    public class ApostadoresController : ControllerBase
    {
        public List<Apostador> apostadores { get; set; }

        public ApostadoresController()
        {
            this.apostadores = new List<Apostador>(new Apostador[] {
                                                        new Apostador{ id= 1, name= "Daniel" },
                                                        new Apostador{ id= 2, name= "Marcos" },
                                                        new Apostador{ id= 3, name= "Marcela" },
                                                        new Apostador{ id= 4, name= "Joaquim" },
                                                        new Apostador{ id= 5, name= "Fernanda" }
                                                      }
            );
        }

        // GET api/apostadores/getApostadores
        //[HttpGet] //original
        [ProducesResponseType(200)]
        public List<Apostador> getApostadores()
        {
            return this.apostadores.OrderBy(x=>x.name).ToList();
        }

        // GET api/apostadores/getApostador/5
        [HttpGet("{id}", Name = "getApostador")]
        [Route("getApostador/{id}")]
        [ProducesResponseType(200)]
        public Apostador getApostador(int id)
        {
            var retorno = this.apostadores.Find(x=>x.id.Equals(id));

            return retorno;
        }

        // POST api/apostadores/addApostador
        [HttpPost(Name = "addApostador")]
        [Route("addApostador")]
        [ProducesResponseType(200)]
        public Apostador addApostador([FromBody] Apostador apostador)
        {
            try
            {
                apostador.id = (this.apostadores != null && this.apostadores.Count > 0) ? this.apostadores.Max(x => x.id) + 1 : 1;

                this.apostadores.Add(apostador);

                return apostador;
            }
            catch (Exception)
            {
                return null;
            }
        }

        // PUT api/apostadores/updateApostador
        //[HttpPut("{id}")] //original
        [HttpPut(Name = "updateApostador")]
        [Route("updateApostador")]
        [ProducesResponseType(200)]
        public int? updateApostador([FromBody] Apostador apostador)
        {
            try
            {
                int indice = this.apostadores.FindIndex(x => x.id.Equals(apostador.id));

                //Apenas atributos que podem ser alterados
                this.apostadores[indice].name = apostador.name;

                return indice;
            }
            catch (Exception)
            {
                return null;
            }
        }

        // DELETE api/apostadores/deleteApostador/5
        //[HttpDelete("{id}")]
        [HttpDelete("{id}", Name = "deleteApostador")]
        [Route("deleteApostador/{id}")]
        [ProducesResponseType(200)]
        public int? deleteApostador(int id)
        {
            try
            {
                int quantidade = this.apostadores.RemoveAll(x => x.id.Equals(id));

                return quantidade;
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}
