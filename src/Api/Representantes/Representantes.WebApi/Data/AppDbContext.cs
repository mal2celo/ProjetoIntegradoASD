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
                .Property(p => p.Nome)
                    .HasMaxLength(100);

            modelBuilder.Entity<Produto>()
                .Property(p => p.Preco)
                    .HasPrecision(10, 2);

            modelBuilder.Entity<Produto>()
                .HasData(
                    new Produto { Id = 1, Nome = "Ração 001", Preco = 100.00 },
                    new Produto { Id = 2, Nome = "Medicamento 001", Preco = 89.50 },
                    new Produto { Id = 3, Nome = "Equipamento 001", Preco = 500.00 },
                    new Produto { Id = 4, Nome = "EPI 001", Preco = 50.00 },
                    new Produto { Id = 5, Nome = "EPI 002", Preco = 20.00 }
                );

            modelBuilder.Entity<ItemPedido>()
                .Property(p => p.ValorVenda)
                    .HasPrecision(10, 2);

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
