using Representantes.WebApi.Data;
using System.Collections.Generic;

namespace Representantes.WebApi.Models
{
    public class SincronizarRequest
    {
        public List<PedidoModel> Pedidos { get; set; }
    }
}
