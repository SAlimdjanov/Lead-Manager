"""
serializers.py

User model serializer

"""

from django.core import exceptions
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from .models import UserAccount


# Obtain custom user model
User = get_user_model()


class UserCreateSerializer(serializers.ModelSerializer):
    """Serializer for the custom user model"""

    class Meta:
        """Model metadata"""

        model = User
        fields = ["first_name", "last_name", "email", "password"]

    def validate(self, attrs: dict) -> dict:
        """Password validation"""
        user = User(**attrs)
        password = attrs.get("password")
        try:
            validate_password(password, user)
        except exceptions.ValidationError as exc:
            serializer_errors = serializers.as_serializer_error(exc)
            raise exceptions.ValidationError(
                {
                    "password": serializer_errors["non_field_errors"],
                }
            )
        return attrs

    def create(self, validated_data: dict) -> UserAccount:
        """Create user with serialized data"""
        user = User.objects.create_user(
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            email=validated_data["email"],
            password=validated_data["password"],
        )
        return user


class UserInfoSerializer(serializers.ModelSerializer):
    """Serializer to mask passwords from HTTP responses"""

    class Meta:
        """Model metadata"""

        model = User
        fields = ["first_name", "last_name", "email"]
