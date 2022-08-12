using System.Linq;
using Representantes.Data;
using System.Collections.Generic;
using Representantes.WebApi.Data;
using Representantes.WebApi.Models;

namespace Representantes.WebApi.Services
{
    public interface ISincronismoService
    {
        SincronizarResponse Sincronizar(SincronizarRequest model, Usuario user);
    }

    public class SincronismoService : ISincronismoService
    {
        private readonly AppDbContext _context;
        private Usuario _user;

        public SincronismoService(AppDbContext context)
        {
            _context = context;
        }

        public SincronizarResponse Sincronizar(SincronizarRequest model, Usuario user)
        {
            _user = user;

            SalvarPedidos(model);

            SincronizarResponse response = new SincronizarResponse();
            response.Produtos = ConsultarProdutos();
            response.Clientes = ConsultarClientes();
            response.Pedidos = ConsultarPedidos();

            return response;
        }

        private void SalvarPedidos(SincronizarRequest model)
        {
            foreach (var pedidoModel in model.Pedidos)
            {
                Pedido p = new Pedido();
                p.DataPedido = pedidoModel.DataPedido;
                p.RepresentanteId = _user.Id;
                p.ClienteId = pedidoModel.ClienteId;
                p.Observacao = pedidoModel.Observacao;
                p.Status = 2;

                var pedido = _context.Pedidos.Add(p).Entity;

                foreach (var itemPedidoModel in pedidoModel.Itens)
                {
                    ItemPedido ip = new ItemPedido();

                    ip.Pedido = pedido;
                    ip.Pedido.Id = pedido.Id;
                    ip.Quantidade = itemPedidoModel.Quantidade;
                    ip.ValorVenda = itemPedidoModel.ValorVenda;
                    ip.ProdutoId = itemPedidoModel.ProdutoId;
                    ip.Observacao = itemPedidoModel.Observacao;

                    _context.ItensPedidos.Add(ip);
                }
            }

            _context.SaveChanges();
        }

        private List<ProdutoModel> ConsultarProdutos()
        {
            List<ProdutoModel> list = new List<ProdutoModel>();

            var produtos = _context.Produtos.ToList();

            foreach (var produto in produtos)
            {
                ProdutoModel produtoModel = new ProdutoModel();
                produtoModel.Id = produto.Id;
                produtoModel.Codigo = produto.Codigo;
                produtoModel.Descricao = produto.Descricao;
                produtoModel.Preco = produto.Preco;

                list.Add(produtoModel);
            }

            return list;
        }

        private List<ClienteModel> ConsultarClientes()
        {
            List<ClienteModel> list = new List<ClienteModel>();

            var clientes = _context.Clientes.ToList();

            foreach (var cliente in clientes)
            {
                ClienteModel clienteModel = new ClienteModel();
                clienteModel.Id = cliente.Id;
                clienteModel.Nome = cliente.Nome;
                clienteModel.Endereco = cliente.Endereco;

                list.Add(clienteModel);
            }

            return list;
        }

        private List<PedidoModel> ConsultarPedidos()
        {
            List<PedidoModel> list = new List<PedidoModel>();
            var pedidos = _context.Pedidos.Where(a => a.Representante.Id == _user.Id).OrderByDescending(a => a.Id).ToList();

            foreach (var pedido in pedidos)
            {
                var pedidoModel = new PedidoModel();
                pedidoModel.Id = pedido.Id;
                pedidoModel.DataPedido = pedido.DataPedido;
                pedidoModel.Status = pedido.Status;
                pedidoModel.ClienteId = pedido.ClienteId;
                pedidoModel.RepresentanteId = pedido.RepresentanteId;
                pedidoModel.Observacao = pedido.Observacao; 

                List<ItemPedidoModel> listItens = new List<ItemPedidoModel>();

                var itensPedidos = _context.ItensPedidos.Where(a => a.Pedido.Id == pedido.Id).ToList();

                foreach (var itemPedido in itensPedidos)
                {
                    var itenPedidoModel = new ItemPedidoModel();
                    itenPedidoModel.Id = itemPedido.Id;
                    itenPedidoModel.PedidoId = itemPedido.PedidoId;
                    itenPedidoModel.ProdutoId = itemPedido.ProdutoId;
                    itenPedidoModel.Quantidade = itemPedido.Quantidade;
                    itenPedidoModel.ValorVenda = itemPedido.ValorVenda;
                    itenPedidoModel.Observacao = itemPedido.Observacao;
                    listItens.Add(itenPedidoModel);
                }

                pedidoModel.Itens = listItens;
                
                list.Add(pedidoModel);
            }

            return list;
        }
    }
}
