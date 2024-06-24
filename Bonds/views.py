from .serializers import BondSerializer
from .models import Bonds
import requests
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions, viewsets
from django.contrib.auth import logout
from .serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def example_view(request):
    # Vista protegida que requiere autenticación JWT
    return Response({'message': 'Authenticated successfully'}, status=status.HTTP_200_OK)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    
# Vista para registrar usuarios
class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Vista para login
class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            refresh = MyTokenObtainPairSerializer.get_token(user)
            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
                'user': UserSerializer(user).data
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Vista para logout
class UserLogout(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)

# Create your views here.
#@getrlimit(key='ip', rate='1000/m', method='GET', block=True)
class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [permissions.IsAuthenticated]

class BondsViewSet(viewsets.ModelViewSet):
    serializer_class = BondSerializer
    queryset = Bonds.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    
    
    

    
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
