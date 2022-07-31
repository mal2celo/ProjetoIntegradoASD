using Microsoft.EntityFrameworkCore;
using Representantes.WebApi.Commons;
using Representantes.WebApi.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Representantes.Data
{
    public class AppDbContext : DbContext 
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        public DbSet<Produto> Produtos { get; set; }

        public DbSet<Cliente> Clientes { get; set; }

        public DbSet<Usuario> Usuarios { get; set; }

        public DbSet<Pedido> Pedidos { get; set; }

        public DbSet<ItemPedido> ItensPedidos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Produto>()
                .Property(p => p.Descricao)
                    .HasMaxLength(100);

            modelBuilder.Entity<Produto>()
                .HasData(
                    new Produto { Id = 1, Codigo = 100, Descricao = "Ração 001", Preco = 10000 },
                    new Produto { Id = 2, Codigo = 200, Descricao = "Medicamento 001", Preco = 8950 },
                    new Produto { Id = 3, Codigo = 300, Descricao = "Equipamento 001", Preco = 50000 },
                    new Produto { Id = 4, Codigo = 400, Descricao = "EPI 001", Preco = 5000 },
                    new Produto { Id = 5, Codigo = 500, Descricao = "EPI 002", Preco = 2000 }
                );

            modelBuilder.Entity<Cliente>()
                .HasData(
                    new Cliente { Id = 1, Nome = "Fazenda de Teste 001", Endereco = "Estrada Real, KM 50, Tiradentes - MG" },
                    new Cliente { Id = 2, Nome = "Sitio de Teste 1005", Endereco = "Sitio de Teste, Suzano - SP" },
                    new Cliente { Id = 3, Nome = "Teste de Fazenda 10", Endereco = "Fazenda 10, Sem Numero Juiz de Fora - MG" }
                );

            modelBuilder.Entity<Pedido>()
                .Property(p => p.Observacao)
                    .HasMaxLength(200);

            modelBuilder.Entity<ItemPedido>()
                .Property(p => p.Observacao)
                    .HasMaxLength(200);

            modelBuilder.Entity<Usuario>()
                .Property(p => p.Nome)
                    .HasMaxLength(100);

            modelBuilder.Entity<Usuario>()
                .Property(p => p.Senha)
                    .HasMaxLength(200);

            modelBuilder.Entity<Usuario>()
                .HasData(
                    new Usuario
                    {
                        Id = 1,
                        Nome = "Marcelo",
                        Matricula = 100,
                        Perfil = 1,
                        Senha = Utils.CreateSHA512("teste100")
                    },
                    new Usuario
                    {
                        Id = 2,
                        Nome = "Joao",
                        Matricula = 200,
                        Perfil = 1,
                        Senha = Utils.CreateSHA512("teste200")
                    },
                    new Usuario
                    {
                        Id = 3,
                        Nome = "Maria",
                        Matricula = 300,
                        Perfil = 2,
                        Senha = Utils.CreateSHA512("teste300")
                    }
                );

        }
    }
}
