"""
apps.py

Contains configuration of apps present in the project

"""

from django.apps import AppConfig


class LeadsConfig(AppConfig):
    """Config 'leads' app"""

    default_auto_field = "django.db.models.BigAutoField"
    name = "leads"
