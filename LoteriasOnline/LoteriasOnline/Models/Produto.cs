using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace LoteriasOnline.Models
{
    public class Produto
    {
        public int id { get; set; }
        public string name { get; set; }
        public int qtd_max { get; set; }
        public List<Regra> lista_regras { get; set; }
    }
}
