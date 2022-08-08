using System;
using System.Collections.Generic;

namespace Representantes.WebApi.Models
{
    public class PedidoModel
    {
        public int Id { get; set; }

        public DateTime DataPedido { get; set; }

        public int Status { get; set; }

        public string DescStatus { get; set; }

        public int? ClienteId { get; set; }

        public string NomeCliente { get; set; }

        public int? RepresentanteId { get; set; }

        public string Observacao { get; set; }

        public int QuantidadeItens { get; set; }

        public int QuantidadeProdutos { get; set; }

        public int ValorTotal { get; set; }

        public List<ItemPedidoModel> Itens { get; set; }
    }
}
