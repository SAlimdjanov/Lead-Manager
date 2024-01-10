"""
serializers.py

Convert querysets and models to Python datatypes, allowing for easy conversion to content types
such as JSON or XML.

"""

from rest_framework import serializers
from .models import Lead


class LeadSerializer(serializers.ModelSerializer):
    """Serialize 'Lead' model"""

    class Meta:
        """Add model metadata"""

        model = Lead
        fields = "__all__"
