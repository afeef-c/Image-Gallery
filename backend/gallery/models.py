from django.contrib.auth.models import AbstractUser,Group, Permission
from django.db import models
from django.conf import settings
from django.contrib.auth import get_user_model


class CustomUser(AbstractUser):
    phone_number = models.CharField(max_length=15, unique=True)
    groups = models.ManyToManyField(Group, related_name='customuser_set')
    user_permissions = models.ManyToManyField(Permission, related_name='customuser_set')
    is_active = models.BooleanField(default=True)

User = get_user_model()


class Image(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="images")
    title = models.CharField(max_length=255)
    image = models.ImageField(upload_to="uploads/")
    order = models.PositiveIntegerField(default=0)  # for rearranging order
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order']




