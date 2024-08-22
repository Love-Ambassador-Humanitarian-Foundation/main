"""Copyright (c) 2024 Esther Onyenoro

This software is licensed under [Proprietary License].
You may not modify, copy, or distribute this software without permission.
For more details, see the LICENSE file in the root of the repository."""

from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User, About, Partners, Event, Payments, Logs, Notification, Email, Scholarship

class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for User model.
    """
    class Meta:
        model = User
        fields = ('id', 'email', 'firstname', 'lastname', 'profileImage','numberpre', 'number', 'address', 'facebook', 'instagram', 'twitter', 'linkedIn', 'whatsapp', 'is_active', 'is_staff', 'joined_date', 'last_login', 'position')

class UserRegistrationSerializer(serializers.ModelSerializer):
    """
    Serializer for User registration.
    """
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'email', 'password', 'firstname', 'lastname', 'profileImage','numberpre',  'number', 'address', 'facebook', 'instagram', 'twitter', 'linkedIn', 'whatsapp', 'is_active', 'is_staff', 'joined_date', 'last_login', 'position')

    def create(self, validated_data):
        # Create user with hashed password
        user = User.objects.create_user(**validated_data)
        return user

class UserLoginSerializer(serializers.Serializer):
    """
    Serializer for user login.
    """
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        if email and password:
            user = authenticate(request=self.context.get('request'), email=email, password=password)
            if not user:
                print(user)
                raise serializers.ValidationError('Unable to login with provided credentials.')
        else:
            raise serializers.ValidationError('Must include "email" and "password".')
        attrs['user'] = user
        return attrs

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
            'policies', 'socials', 'account_details'
        ]

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

class NotificationSerializer(serializers.ModelSerializer):
    """
    Serializer for Notification model.
    """
    class Meta:
        model = Notification
        fields = ['id', 'recipient', 'message', 'is_read', 'created_at']

class EmailSerializer(serializers.ModelSerializer):
    """
    Serializer for Email model.
    """
    class Meta:
        model = Email
        fields = ['id', 'sender', 'recipient', 'subject', 'body', 'sent_at', 'read']

class ScholarshipSerializer(serializers.ModelSerializer):
    DATE_FORMAT = '%d/%m/%Y'
    birthday = serializers.DateField(format=DATE_FORMAT, input_formats=[DATE_FORMAT])
    organisation_signature_date = serializers.DateField(format=DATE_FORMAT, input_formats=[DATE_FORMAT])
    candidate_signature_date = serializers.DateField(format=DATE_FORMAT, input_formats=[DATE_FORMAT])

    class Meta:
        model = Scholarship
        fields = '__all__'

    def validate_duration(self, value):
        try:
            amount, unit = value.split()
            amount = int(amount)
            valid_units = ['year', 'month', 'week', 'day', 'hour', 'minute', 'second','years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds']
            if unit not in valid_units:
                print(unit,'===')
                raise serializers.ValidationError("Invalid duration format.")
        except ValueError:
            raise serializers.ValidationError("Duration must be in the format 'amount unit', e.g., '1 year'.")
        return value
    
    def validate(self, data):
        # Ensure only one educational background field is True
        education_fields = ['nursery', 'primary', 'secondary', 'tertiary']
        if sum(data[field] for field in education_fields) > 1:
            raise serializers.ValidationError("Only one of Nursery, Primary, Secondary, or Tertiary can be True.")
        return data