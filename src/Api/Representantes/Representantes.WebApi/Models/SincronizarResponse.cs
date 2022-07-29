using System.Collections.Generic;

namespace Representantes.WebApi.Models
{
    public class SincronizarResponse
    {
        public List<ClienteModel> Clientes { get; set; }

        public List<ProdutoModel> Produtos { get; set; }

        public List<PedidoModel> Pedidos { get; set; }
    }
}
