using System.Linq;
using Representantes.Data;
using System.Collections.Generic;
using Representantes.WebApi.Data;
using Representantes.WebApi.Models;
using static Representantes.WebApi.Commons.Enums;

namespace Representantes.WebApi.Services
{
    public interface IPedidoService
    {
        List<PedidoModel> ConsultarPedidos();
        PedidoModel ConsultarPedido(int idPedido);
        int AprovarPedido(int idPedido);
        int ReprovarPedido(int idPedido);
    }

    public class PedidoService : IPedidoService
    {
        private readonly AppDbContext _context;
        private Usuario _user;

        public PedidoService(AppDbContext context)
        {
            _context = context;
        }

        public List<PedidoModel> ConsultarPedidos()
        {
            List<PedidoModel> list = new List<PedidoModel>();
            var pedidos = _context.Pedidos.OrderByDescending(a => a.Id).ToList();

            foreach (var pedido in pedidos)
            {
                var pedidoModel = new PedidoModel();
                pedidoModel.Id = pedido.Id;
                pedidoModel.DataPedido = pedido.DataPedido;
                pedidoModel.Status = pedido.Status;
                pedidoModel.DescStatus = GetDescStatus((StatusPedido)pedido.Status);

                pedidoModel.ClienteId = pedido.ClienteId;

                pedido.Cliente = _context.Clientes.Find(pedidoModel.ClienteId);
                pedidoModel.NomeCliente = pedido.Cliente.Nome;

                pedidoModel.RepresentanteId = pedido.RepresentanteId;
                pedidoModel.Observacao = pedido.Observacao;

                list.Add(pedidoModel);
            }

            return list;
        }

        public PedidoModel ConsultarPedido(int idPedido)
        {
            var pedido = _context.Pedidos.Find(idPedido);

            var pedidoModel = new PedidoModel();
            pedidoModel.Id = pedido.Id;
            pedidoModel.DataPedido = pedido.DataPedido;
            pedidoModel.Status = pedido.Status;
            pedidoModel.ClienteId = pedido.ClienteId;
            pedidoModel.RepresentanteId = pedido.RepresentanteId;
            pedidoModel.Observacao = pedido.Observacao;

            pedidoModel.DescStatus = GetDescStatus((StatusPedido)pedido.Status);
            pedido.Cliente = _context.Clientes.Find(pedidoModel.ClienteId);
            pedidoModel.NomeCliente = pedido.Cliente.Nome;

            List<ItemPedidoModel> listItens = new List<ItemPedidoModel>();

            var itensPedidos = _context.ItensPedidos.Where(a => a.Pedido.Id == pedido.Id).OrderByDescending(a => a.Id).ToList();

            pedidoModel.QuantidadeItens = 0;
            pedidoModel.QuantidadeProdutos = 0;
            pedidoModel.ValorTotal = 0;

            foreach (var itemPedido in itensPedidos)
            {
                var itenPedidoModel = new ItemPedidoModel();
                itenPedidoModel.Id = itemPedido.Id;
                itenPedidoModel.PedidoId = itemPedido.PedidoId;
                itenPedidoModel.ProdutoId = itemPedido.ProdutoId;

                itemPedido.Produto = _context.Produtos.Find(itenPedidoModel.ProdutoId);
                itenPedidoModel.CodigoProduto = itemPedido.Produto.Codigo;
                itenPedidoModel.DescricaoProduto = itemPedido.Produto.Descricao;

                itenPedidoModel.Quantidade = itemPedido.Quantidade;
                itenPedidoModel.ValorVenda = itemPedido.ValorVenda;
                itenPedidoModel.Observacao = itemPedido.Observacao;
                listItens.Add(itenPedidoModel);

                pedidoModel.QuantidadeItens++;
                pedidoModel.QuantidadeProdutos += itenPedidoModel.Quantidade;
                pedidoModel.ValorTotal += itenPedidoModel.ValorVenda;
            }

            pedidoModel.Itens = listItens;

            return pedidoModel;
        }

        public int AprovarPedido(int idPedido)
        {
            var pedido = _context.Pedidos.Find(idPedido);
            pedido.Status = (int)StatusPedido.Aprovado;

            return _context.SaveChanges();
        }

        public int ReprovarPedido(int idPedido)
        {
            var pedido = _context.Pedidos.Find(idPedido);
            pedido.Status = (int)StatusPedido.Reprovado;
            
            return _context.SaveChanges();
        }

        private string GetDescStatus(StatusPedido status)
        {
            string DescStatus = "";

            switch (status)
            {
                case StatusPedido.Elaboracao:
                    DescStatus = "Em Elaboração";
                    break;
                case StatusPedido.AguardandoAprovacao:
                    DescStatus = "Aguardando Aprovação";
                    break;
                case StatusPedido.Aprovado:
                    DescStatus = "Aprovado";
                    break;
                case StatusPedido.Reprovado:
                    DescStatus = "Reprovado";
                    break;
            }

            return DescStatus;
        }

        
    }
}
