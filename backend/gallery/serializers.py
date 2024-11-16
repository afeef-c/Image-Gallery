from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.core.validators import RegexValidator
from django.contrib.auth.password_validation import validate_password
from .models import CustomUser,Image
User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = CustomUser  # Ensure CustomUser is your user model
        fields = ['username', 'password', 'password2', 'email', 'phone_number']
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True},
            'phone_number': {'required': True}
        }

    def validate(self, data):
        # Check if passwords match
        if data['password'] != data['password2']:
            raise serializers.ValidationError({"password": "Passwords do not match."})
        return data

    def create(self, validated_data):
        # Remove password2 from validated data before creating user
        validated_data.pop('password2')
        
        # Create user
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data['email'],
            phone_number=validated_data['phone_number'],
        )
        return user  


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'phone_number']

class ResetPasswordSerializer(serializers.Serializer):
    current_password = serializers.CharField(required=True, write_only=True)
    new_password = serializers.CharField(required=True, write_only=True)
    confirm_password = serializers.CharField(required=True, write_only=True)

    def validate_current_password(self, value):
        user = self.context['request'].user

        if not user.check_password(value):
            raise serializers.ValidationError("Current password is incorrect")
        return value

    def validate_new_password(self, value):
        user = self.context['request'].user

        if user.check_password(value):
            raise serializers.ValidationError("New password must be different from the current password")
        return value

    def validate(self, attrs):
        new_password = attrs.get('new_password')
        confirm_password = attrs.get('confirm_password')

        if new_password != confirm_password:
            raise serializers.ValidationError({"confirm_password": "The confirmation password does not match the new password"})
        return attrs

    


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['id', 'title', 'image', 'order', 'created_at']
        extra_kwargs = {
            'image': {'required': False}  
        }
