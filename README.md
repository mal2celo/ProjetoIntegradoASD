# ProjetoIntegradoASD
Projeto Integrado da Pós-graduação Lato Sensu em Arquitetura de Software Distribuído da PUC Minas 2021-2022

# WEB API

## Comandos para migration da API
Criar migration Inicial
add-migration Inicial

Executar migrations
update-database

Recriar o banco de dados 
delete from __EFMigrationsHistory;
drop table ItensPedidos;
drop table Pedidos;
drop table Produtos;
drop table Clientes;
drop table Usuarios;


# APP Mobile

## Comandos para build
ionic serve