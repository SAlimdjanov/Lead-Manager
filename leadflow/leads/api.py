"""
api.py

Contains API implementation

"""

from rest_framework import viewsets, permissions

from .models import Lead
from .serializers import LeadSerializer


class LeadViewSet(viewsets.ModelViewSet):
    """Leads API"""

    queryset = Lead.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = LeadSerializer
