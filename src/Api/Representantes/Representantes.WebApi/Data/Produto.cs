﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Representantes.WebApi.Data
{
    public class Produto
    {
        public int Id { get; set; }

        public int Codigo { get; set; }

        public string Descricao { get; set; }

        public int Preco { get; set; }
    }
}
