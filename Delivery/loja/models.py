from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from .manager import CustomUserManager
from django.utils import timezone

class Usuario(AbstractUser):
    username = None
    email = models.EmailField(_("email address"), unique=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email

#Clientes
class Clientes(models.Model):
    fk_usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    foto = models.ImageField(upload_to= 'images')
    nome_completo = models.CharField(max_length=200)
    cpf = models.CharField(max_length=11, unique= True)
    telefone = models.CharField(max_length=11, unique= True)

    class Meta:
        verbose_name_plural = 'Cliente'

class Enderecos(models.Model):
    fk_usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    logradouro = models.CharField(max_length=100)
    bairro = models.CharField(max_length=100)
    cidade = models.CharField(max_length=100)
    numero = models.CharField(max_length=5)
    uf = models.CharField(max_length=2)
    cep = models.CharField(max_length=10)

    def __str__(self):
        return self.logradouro
    
    class Meta:
        verbose_name_plural = 'Endereços'

class Produtos(models.Model):
    foto = models.ImageField(upload_to="produtos")
    nome = models.CharField(max_length=255)
    descricao = models.TextField()
    preco = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self) -> str:
        return self.nome
    
    class Meta:
        verbose_name_plural = ('Produtos')

class Pedidos(models.Model):
    user = models.IntegerField()
    carrinho = models.CharField(max_length=500)
    data = models.DateField(auto_now_add=True)
    endereco = models.CharField(max_length=500)
    numero = models.IntegerField()
    valorTotal = models.FloatField()
    
    def __str__(self) -> str:
        return self.carrinho
    
    class Meta:
        verbose_name_plural = ('Pedidos')






    





    
    

