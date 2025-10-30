from django.db import models
from django.contrib.auth.models import User , AbstractUser
from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import gettext_lazy as _

class CustomUser(AbstractUser):
    username = None
    email = models.EmailField(_("email address"),unique=True)
    birth_date = models.DateField(null=True, blank=False )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
