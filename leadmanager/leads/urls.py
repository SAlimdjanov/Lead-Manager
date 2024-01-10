"""
urls.py

URL configurations for leads app, using Django REST Framework's default router

"""

from rest_framework import routers
from .api import LeadViewSet


router = routers.DefaultRouter()
router.register("api/leads", LeadViewSet, basename="leads")

urlpatterns = router.urls
