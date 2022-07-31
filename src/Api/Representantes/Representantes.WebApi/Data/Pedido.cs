using System;

namespace Representantes.WebApi.Data
{
    public class Pedido
    {
        public int Id { get; set; }

        public DateTime DataPedido { get; set; }

        public int Status { get; set; }

        public int? ClienteId { get; set; }

        public int? RepresentanteId { get; set; }

        public string Observacao { get; set; }

        public virtual Cliente Cliente { get; set; }

        public virtual Usuario Representante { get; set; }
    }
}
