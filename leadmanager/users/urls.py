"""
urls.py

User account management endpoints

"""

from django.urls import path
from .views import RegisterView, RetrieveUserView


urlpatterns = [
    path("register", RegisterView.as_view(), name="register_view"),
    path("me", RetrieveUserView.as_view(), name="retrieve_user_view"),
]
