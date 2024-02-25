"""
views.py

Front-end template view

"""

from django.shortcuts import render
from django.http import HttpRequest, HttpResponse


def index(request: HttpRequest) -> HttpResponse:
    """Renders home template"""
    return render(request, "frontend/index.html", {})
