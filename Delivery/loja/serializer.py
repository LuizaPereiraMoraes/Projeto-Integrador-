from rest_framework import serializers
from .models import *

class ClientesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clientes
        fields = ['id', 'nome_completo', 'foto', 'cpf', 'telefone']

class EnderecosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enderecos
        fields = ['id', 'fk_usuario', 'logradouro', 'numero', 'bairro', 'cidade', 'uf', 'cep']

class ProdutosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produtos
        fields = ['id', 'nome', 'descricao', 'preco', 'foto']

class PedidosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pedidos
        fields = ['id', 'user','carrinho', 'data', 'endereco', 'numero', 'valorTotal']
