"""
views.py

Creates API views for user account management related actions

"""

from django.contrib.auth import get_user_model

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import UserCreateSerializer, UserInfoSerializer


User = get_user_model()


class RegisterView(APIView):
    """Create a User"""

    def post(self, request):
        """HTTP POST request with new user data"""
        data = request.data
        serializer = UserCreateSerializer(data=data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user = serializer.create(serializer.validated_data)
        user = UserInfoSerializer(user)

        return Response(user.data, status=status.HTTP_201_CREATED)


class RetrieveUserView(APIView):
    """Retrieve current user information"""

    permission_classes = [IsAuthenticated]

    def get(self, request):
        """HTTP GET request to obtain data"""
        user = request.user
        user = UserInfoSerializer(user)

        return Response(user.data, status=status.HTTP_200_OK)
