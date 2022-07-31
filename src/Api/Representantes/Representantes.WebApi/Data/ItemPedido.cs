namespace Representantes.WebApi.Data
{
    public class ItemPedido
    {
        public int Id { get; set; }

        public int? PedidoId { get; set; }

        public int? ProdutoId { get; set; }

        public int Quantidade { get; set; }

        public int ValorVenda { get; set; }

        public string Observacao { get; set; }

        public virtual Pedido Pedido { get; set; }

        public virtual Produto Produto { get; set; }
    }
}
