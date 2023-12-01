from django.contrib import admin
from . import models

@admin.register(models.Clientes)
class ClienteAdmin(admin.ModelAdmin):
    list_display = ['id', 'nome_completo', 'foto', 'cpf', 'telefone']

@admin.register(models.Enderecos)
class EnderecoAdmin(admin.ModelAdmin):
    list_display = ['id', 'fk_usuario', 'logradouro', 'numero', 'bairro', 'cidade', 'uf', 'cep']

@admin.register(models.Produtos)
class ProdutoAdmin(admin.ModelAdmin):
    list_display = ['id', 'nome', 'descricao', 'preco', 'foto']

@admin.register(models.Pedidos)
class ProdutoAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'carrinho', 'data', 'endereco', 'numero', 'valorTotal']
