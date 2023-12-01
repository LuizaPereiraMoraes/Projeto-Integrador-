from rest_framework import viewsets
from .serializer import *
from .models import *
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework.response import Response
import base64
from django.core.files.base import ContentFile

#Clientes
def base64_file(data, name):
    format, img_str = data.split(';base64,')
    ext = 'png'
    return ContentFile(base64.b64decode(img_str), name='{}.{}'.format(name, ext))

class ListarDetalharCliente(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated, )
    queryset = Clientes.objects.all()
    serializer_class = ClientesSerializer

    def list(self, request, *args, **kwargs):
        queryset = Clientes.objects.all()
        token = request.META.get('HTTP_AUTHORIZATION', '').split(' ')[1]
        dados = AccessToken(token)
        usuario = dados['user_id']
        queryset = queryset.filter(fk_usuario=usuario)

        return super().list(request, *args, **kwargs)
    
    def create(self, request, *args, **kwargs):
        token = request.META.get('HTTP_AUTHORIZATION', '').split(' ')[1]
        dados = AccessToken(token)
        usuario = dados['user_id']
        UsuarioObject = Usuario.objects.get(pk = usuario)
        criar_cliente = Clientes.objects.create(fk_usuario=UsuarioObject, foto=base64_file(request.data['foto'],'perfil'), nome_completo=request.data['nome_completo'], cpf=request.data['cpf'], telefone = request.data['telefone'])
        criar_cliente.save()

        serializer = ClientesSerializer(criar_cliente)

        return Response(serializer.data)

#Endereco
class ListarDetalharEndereco(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated, )
    queryset = Enderecos.objects.all()
    serializer_class = EnderecosSerializer

    def create(self, request, *args, **kwargs):
        token = request.META.get('HTTP_AUTHORIZATION', '').split(' ')[1]
        dados = AccessToken(token)
        usuario = dados['user_id']
        UsuarioObject = Usuario.objects.get(pk = usuario)
        criar_endereco = Enderecos.objects.create(fk_usuario=UsuarioObject, logradouro=request.data['logradouro'], bairro=request.data['bairro'], cidade=request.data['cidade'], numero=request.data['numero'], uf=request.data['uf'], cep=request.data['cep'])

        criar_endereco.save()

        serializer = EnderecosSerializer(criar_endereco)
        
        return Response(serializer.data)
    
#Produto
class ListarDetalharProduto(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated, )
    queryset = Produtos.objects.all()
    serializer_class = ProdutosSerializer

#Pedidos
class ListarDetalharPedidos(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated, )
    queryset = Pedidos.objects.all()
    serializer_class = PedidosSerializer
