from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register('clientes', ListarDetalharCliente)
router.register('enderecos', ListarDetalharEndereco)
router.register('produtos', ListarDetalharProduto)
router.register('pedidos', ListarDetalharPedidos)

urlpatterns = [] + router.urls

