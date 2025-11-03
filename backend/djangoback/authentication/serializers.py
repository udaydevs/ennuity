from rest_framework import serializers
from .models import CustomUser as User
import re
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = "email"  
    def validate(self, attrs):
        attrs[self.username_field] = attrs.get("email") or attrs.get("username")
        return super().validate(attrs)


EMAIL_REGEX = r'^[A-Za-z0-9._%+-]+@[A-Za-z.-]+\.[A-Za-z]{2,}$'
PASSWORD_REGEX = r'^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'


class SignUpSerializer(serializers.ModelSerializer):
    FirstName = serializers.CharField(source='first_name', required=True)
    LastName = serializers.CharField(source='last_name', required=False, allow_blank=True)
    email = serializers.CharField(required=True)
    password = serializers.CharField(write_only=True, required=True)
    confirmpassword = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['FirstName', 'LastName', 'email', 'password', 'confirmpassword']

    def validate_email(self, value):
        """Validate email format and uniqueness."""
        if not re.fullmatch(EMAIL_REGEX, value):
            raise serializers.ValidationError({"msg": "Email must be valid."})
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError({"msg": "User with this email already exists."})
        return value

    def validate_password(self, value):
        """Validate password complexity."""
        if not re.fullmatch(PASSWORD_REGEX, value):
            raise serializers.ValidationError({
                "msg": "Password must contain at least one uppercase, one lowercase, one number, one special character, and be at least 8 characters long."
            })
        return value

    def validate(self, attrs):
        """Ensure password match."""
        if attrs['password'] != attrs['confirmpassword']:
            raise serializers.ValidationError({"msg": "Passwords do not match."})
        return attrs

    def create(self, validated_data):
        """Create user with email as login field."""
        first_name = validated_data.get('first_name')
        last_name = validated_data.get('last_name', '')
        email = validated_data.get('email')
        password = validated_data.get('password')

        user = User.objects.create(
            email=email,
            first_name=first_name,
            last_name=last_name,
        )
        user.set_password(password)
        user.save()
        return user

    def to_representation(self, instance):
        return {"msg": "User created successfully."}
