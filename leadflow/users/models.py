"""
models.py

Creates custom user model for authentication

"""

from django.db import models
from django.contrib.auth.models import (
    BaseUserManager,
    AbstractBaseUser,
    PermissionsMixin,
)


class UserAccountManager(BaseUserManager):
    """Custom user manager for creating API users"""

    def create_user(self, first_name, last_name, email, password=None):
        """Create a user with custom fields"""
        if not email:
            raise ValueError("You must provide an email address")
        email = self.normalize_email(email).lower()
        user = self.model(
            first_name=first_name,
            last_name=last_name,
            email=email,
        )
        user.set_password(password)
        user.save(using=self.db)

        return user

    def create_superuser(self, first_name, last_name, email, password=None):
        """Create a superuser with create_user"""
        user = self.create_user(first_name, last_name, email, password)

        user.is_staff = True
        user.is_superuser = True
        user.save(using=self.db)

        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    """Custom user model"""

    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(max_length=150, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]

    def __str__(self) -> str:
        return str(self.email)
