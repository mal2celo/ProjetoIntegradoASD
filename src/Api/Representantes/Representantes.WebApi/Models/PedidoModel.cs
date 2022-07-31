using System;
using System.Collections.Generic;

namespace Representantes.WebApi.Models
{
    public class PedidoModel
    {
        public int Id { get; set; }

        public DateTime DataPedido { get; set; }

        public int Status { get; set; }

        public int? ClienteId { get; set; }

        public int? RepresentanteId { get; set; }

        public string Observacao { get; set; }

        public List<ItemPedidoModel> Itens { get; set; }
    }
}
