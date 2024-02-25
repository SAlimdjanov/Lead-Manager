"""
models.py

Configuration of database tables

"""

from django.db import models


class Lead(models.Model):
    """Lead table"""

    # Name of the lead
    name = models.CharField(max_length=100)
    # Do not allow multiple leads with the same email address
    email = models.EmailField(max_length=100, unique=True)
    # Message is optional
    message = models.CharField(max_length=500, blank=True)
    # Capture the time of record creation
    time_created = models.DateTimeField(auto_now_add=True)
    objects = models.Manager()
