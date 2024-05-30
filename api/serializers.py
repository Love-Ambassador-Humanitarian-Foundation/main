from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User, About, Partners, Event, Payments, Logs

class UserLoginSerializer(serializers.Serializer):
    """
    Serializer for user login.
    """
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        if email and password:
            user = authenticate(email=email, password=password)
            if user:
                if not user.is_active:
                    raise serializers.ValidationError("User account is disabled.")
                return user
            else:
                raise serializers.ValidationError("Unable to login with provided credentials.")
        else:
            raise serializers.ValidationError("Must include 'email' and 'password'.")

class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for user model.
    """
    class Meta:
        model = User
        fields = [
            'id', 'username', 'password', 'email', 'firstname', 'lastname',
            'is_admin', 'is_active', 'is_staff', 'joined_date', 'last_login',
            'position'
        ]
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            firstname=validated_data['firstname'],
            lastname=validated_data['lastname'],
            is_admin=validated_data['is_admin'],
            is_active=validated_data['is_active'],
            is_staff=validated_data['is_staff'],
            position=validated_data['position']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class AboutSerializer(serializers.ModelSerializer):
    """
    Serializer for About model.
    """
    class Meta:
        model = About
        fields = [
            'id', 'company_name', 'story', 'logo', 'phonenumber', 'emailone',
            'emailtwo', 'emailthree', 'address', 'mission', 'values',
            'achievements', 'created_date', 'updated_date', 'branches',
            'policies', 'socials','account_details'
        ]

    def create(self, validated_data):
        about = About.objects.create(**validated_data)
        return about

class PartnersSerializer(serializers.ModelSerializer):
    """
    Serializer for Partners model.
    """
    class Meta:
        model = Partners
        fields = [
            'id', 'title', 'description', 'logo', 'link', 'created_date'
        ]

class EventSerializer(serializers.ModelSerializer):
    """
    Serializer for Event model.
    """
    class Meta:
        model = Event
        fields = [
            'id', 'title', 'description', 'type', 'participants',
            'start_date', 'end_date', 'ongoing', 'images', 'videos'
        ]

class PaymentsSerializer(serializers.ModelSerializer):
    """
    Serializer for Payments model.
    """
    class Meta:
        model = Payments
        fields = [
            'id', 'amount', 'date_paid', 'contributor', 'reason', 'details',
            'image'
        ]

class LogsSerializer(serializers.ModelSerializer):
    """
    Serializer for Logs model.
    """
    class Meta:
        model = Logs
        fields = [
            'id', 'user', 'action', 'date_created', 'details'
        ]
