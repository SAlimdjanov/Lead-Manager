"""
views.py

Front-end template view

"""

from django.shortcuts import render


def index(request):
    """Renders home template"""
    return render(request, "frontend/index.html", {})
