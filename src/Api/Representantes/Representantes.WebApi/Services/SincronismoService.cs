using System.Linq;
using Representantes.Data;
using Representantes.WebApi.Models;
using System.Collections.Generic;

namespace Representantes.WebApi.Services
{
    public interface ISincronismoService
    {
        SincronizarResponse Sincronizar(SincronizarRequest model);
    }

    public class SincronismoService : ISincronismoService
    {
        private readonly AppDbContext _context;

        public SincronismoService(AppDbContext context)
        {
            _context = context;
        }

        public SincronizarResponse Sincronizar(SincronizarRequest model)
        {
            SincronizarResponse response = new SincronizarResponse();
            response.Produtos = ConsultarProdutos();
            response.Clientes = ConsultarClientes();

            return response;
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
    }
}
