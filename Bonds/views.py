#from resource import getrlimit

from rest_framework import viewsets
from .serializer import BondSerializer, UserBSerializer
from .models import Bonds, UserB
import requests

# Create your views here.
#@getrlimit(key='ip', rate='1000/m', method='GET', block=True)
class BondsView(viewsets.ModelViewSet):
    serializer_class = BondSerializer
    queryset = Bonds.objects.all()
    
class UserView(viewsets.ModelViewSet):
    serializer_class = UserBSerializer
    queryset = UserB.objects.all()
    
def get_price_USD():
    url = 'https://www.banxico.org.mx/SieAPIRest/service/v1/series/SF43718/datos/oportuno?token=bdb3f997aadfcfc30d50157941f80c9f1b20d86703955c57c9f61f56e0f1b8ac'
    
    # Realizar la solicitud GET a la API
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        
        # Acceder a la estructura JSON y extraer el primer dato
        try:
            series = data['bmx']['series']
            for serie in series:
                for dato in serie['datos']:
                    return dato['dato']  # Devuelve el primer dato encontrado
        except KeyError:
            print("Error: la estructura JSON no es la esperada")
    
    else:
        print("Error: no se pudo obtener los datos de la API")


#precio_usd = get_price_USD()
