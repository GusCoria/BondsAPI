from django.urls import path, include
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from .views import UserViewSet, BondsViewSet
from Bonds import views
from .views import MyTokenObtainPairView
from .views import get_usd_price_view

#genera las rutas GPPD

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'bonds', BondsViewSet)

#urls de la app para pedir get, put, post, delete
urlpatterns = [
    path('register/', views.UserRegister.as_view(), name='register'),
    path('login/', views.UserLogin.as_view(), name='login'),
    path('logout/', views.UserLogout.as_view(), name='logout'),
    path('api/docsD/', include_docs_urls(title="Bonds Api")),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('', include(router.urls)),
    path('usd-price/', get_usd_price_view, name='get_usd_price'),
]
