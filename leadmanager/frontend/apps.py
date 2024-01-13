"""
apps.py

Frontend app config

"""

from django.apps import AppConfig


class FrontendConfig(AppConfig):
    """Config class"""

    default_auto_field = "django.db.models.BigAutoField"
    name = "frontend"
