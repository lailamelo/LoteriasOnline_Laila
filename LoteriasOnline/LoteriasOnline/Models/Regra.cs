﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace LoteriasOnline.Models
{
    public class Regra
    {
        public int id { get; set; }
        public string name { get; set; }
        public int qtd_vencer { get; set; }
    }
}
