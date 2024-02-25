"""
urls.py

URL configurations for leads app, using Django REST Framework's default router

"""

from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from .api import LeadViewSet


router = routers.DefaultRouter()
router.register(r"leads", LeadViewSet, basename="leads")

urlpatterns = [
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/token/verify/", TokenVerifyView.as_view(), name="token_verify"),
    path("api/users/", include("users.urls"), name="user_management"),
    path("api/", include(router.urls), name="leads"),
]
