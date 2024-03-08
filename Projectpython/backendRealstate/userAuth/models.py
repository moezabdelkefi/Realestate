from django.db import models
from django.contrib.auth.hashers import make_password


class Role(models.Model):

    name = models.CharField(max_length=50)


class User(models.Model):
    name = models.CharField(max_length=50)
    email = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    username = None
    role_id = models.ForeignKey(Role, on_delete=models.SET_NULL, null=True)

    def set_password(self, password):
        self.password = make_password(password)


USERNAME_FIELD = 'email'
REQUIRED_FIELDS = []


