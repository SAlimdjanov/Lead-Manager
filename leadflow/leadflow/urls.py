"""
urls.py

URL configuration for leadflow project.

"""

from django.contrib import admin
from django.urls import path, include, re_path
from frontend.views import index

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("leads.urls"), name="leads_urls"),
    path("", include("users.urls"), name="users_urls"),
    re_path(r"^.*", index),
]
