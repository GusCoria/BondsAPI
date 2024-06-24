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
from .serializers import BondSerializer
from .models import Bonds
from django.http import JsonResponse
import requests

#funcion de autentificacion
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def example_view(request):
    return Response({'message': 'Authenticated successfully'}, status=status.HTTP_200_OK)

#clase para pedir tokens 
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        return token

#clase serializer para tokens
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    
# Clase para registrar usuarios
class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)

    #funcion para registrar un usuario
    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Clase para hacer login en la app
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

# Clase para terminar el login
class UserLogout(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)

# Clase para realiar las operaciones de usuarios y bonds GPPD

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [permissions.IsAuthenticated]

class BondsViewSet(viewsets.ModelViewSet):
    serializer_class = BondSerializer
    queryset = Bonds.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    
    
    
#funcion para obtener el valor de USD desde un url de banxico
    
def get_price_USD():
    url = 'https://www.banxico.org.mx/SieAPIRest/service/v1/series/SF43718/datos/oportuno?token=bdb3f997aadfcfc30d50157941f80c9f1b20d86703955c57c9f61f56e0f1b8ac'
    
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        try:
            series = data['bmx']['series']
            for serie in series:
                for dato in serie['datos']:
                    return dato['dato']
        except KeyError:
            print("Error: la estructura JSON no es la esperada")
    else:
        print("Error: no se pudo obtener los datos de la API")

def get_usd_price_view(request):
    price = get_price_USD()
    if price:
        return JsonResponse({'price': price})
    else:
        return JsonResponse({'error': 'No se pudo obtener el precio'}, status=500)
    
#precio_usd = get_price_USD()
