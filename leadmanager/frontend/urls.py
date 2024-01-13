"""
urls.py

URL configuration for app front-end

"""

from django.urls import path
from .views import index


urlpatterns = [
    path("", index),
]
