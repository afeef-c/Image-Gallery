from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser,Image


@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    # Specify the fields to display in the admin list view
    list_display = ('username', 'email', 'id', 'is_staff', 'is_active')
    
    # Add filters
    list_filter = ('is_staff', 'is_superuser', 'is_active')
    
    # Add search capability
    search_fields = ('username', 'email', 'phone_number')
    
    # Customize the fieldsets for user detail pages
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'email', 'phone_number')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )

admin.site.register(Image)