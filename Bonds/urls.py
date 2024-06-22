from django.urls import path, include
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from Bonds  import views

#genera las rutas GPPD
router = routers.DefaultRouter()

router.register(r'bonds', views.BondsView, 'bonds')

router.register(r'user', views.UserView, 'user')

urlpatterns = [
    path("api/v1/", include(router.urls)),
    path("api/v1/", include(router.urls)),
    path('api/docsD/', include_docs_urls(title="Bonds Api"))
]
