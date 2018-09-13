using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace LoteriasOnline.Models
{
    public class Jogo
    {
        public int id { get; set; }
        public Apostador apostador { get; set; }
        public Produto produto { get; set; }
        public List<int> lista_numeros { get; set; }
        public string dthr { get; set; }
        public string name { get; set; }
    }
}
