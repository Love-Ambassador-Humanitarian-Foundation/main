"""Copyright (c) 2024 Esther Onyenoro

This software is licensed under [Proprietary License].
You may not modify, copy, or distribute this software without permission.
For more details, see the LICENSE file in the root of the repository."""

from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import date, datetime, DATE_FORMAT,DATETIME_FORMAT,VALID_UNITS, User, About, Partners, Event, Payments, Logs, Notification, Email, Scholarship, ScholarshipApplicant
from django.utils.dateparse import parse_date, parse_datetime



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
    created_date = serializers.DateTimeField(format=DATETIME_FORMAT, input_formats=[DATETIME_FORMAT])
    updated_date = serializers.DateTimeField(format=DATETIME_FORMAT, input_formats=[DATETIME_FORMAT])
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
    created_date = serializers.DateField(format=DATE_FORMAT, input_formats=[DATE_FORMAT])
    class Meta:
        model = Partners
        fields = '__all__'

class EventSerializer(serializers.ModelSerializer):
    """
    Serializer for Event model.
    """
    start_date = serializers.DateTimeField(format=DATETIME_FORMAT, input_formats=[DATETIME_FORMAT])
    end_date = serializers.DateTimeField(format=DATETIME_FORMAT, input_formats=[DATETIME_FORMAT])
    ongoing = serializers.SerializerMethodField()  # Adding the is_ongoing field

    
    class Meta:
        model = Event
        fields = [
            'id', 'title', 'description', 'eventtype', 'participants',
            'start_date', 'end_date', 'ongoing', 'media'
        ]

    def validate(self, attrs):

        if attrs['start_date'] > attrs['end_date']:
            raise serializers.ValidationError('The start date cannot be later than the end date.')
        
        return attrs

    def get_ongoing(self, obj):
        """
        Determine if the event is ongoing based on the current date.
        The current date is fetched from the request context, falling back to date.today() if not provided.
        """
        request = self.context.get('request')
        current_date = datetime.today()  # Default to today's date

        # Check request data for a date
        
        if request and 'current_date' in request.data:
            current_date_str = request.data.get('current_date')
            if current_date_str:
                parsedatetime = parse_datetime(current_date_str)
                if parsedatetime:
                    current_date = parsedatetime

        # Check query parameters for a date
        if request and 'current_date' in request.query_params:
            current_date_str = request.query_params.get('current_date')
            if current_date_str:
                parsedatetime = parse_datetime(current_date_str)
                if parsedatetime:
                    current_date = parsedatetime

        # Ensure `ongoing` is a callable method
        return obj.ongoing(current_date=current_date)


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
    
    created_date = serializers.DateField(format=DATE_FORMAT, input_formats=[DATE_FORMAT])
    is_expired = serializers.SerializerMethodField()

    class Meta:
        model = Scholarship
        fields = '__all__'

    def validate_duration(self, value):
        """
        Validate the format of the duration field.
        It must be in the format 'amount unit', e.g., '1 year'.
        """
        try:
            amount, unit = value.split()
            amount = int(amount)
            
            if unit not in VALID_UNITS:
                raise serializers.ValidationError("Invalid duration format. The unit must be one of the following: year, month, week, day, hour, minute, second (or their plural forms).")
        except ValueError:
            raise serializers.ValidationError("Duration must be in the format 'amount unit', e.g., '1 year'.")
        return value

    def get_is_expired(self, obj):
        """
        Determine if the scholarship is expired based on the current date.
        The current date is fetched from the request context, falling back to date.today() if not provided.
        """
        request = self.context.get('request')
        current_date = date.today()  # Default to today's date

        # Check request data for a date
        if request and 'current_date' in request.data:
            current_date_str = request.data.get('current_date')
            if current_date_str:
                current_date = parse_date(current_date_str) or current_date

        # Check query parameters for a date
        if request and 'current_date' in request.query_params:
            current_date_str = request.query_params.get('current_date')
            if current_date_str:
                current_date = parse_date(current_date_str) or current_date

        return obj.is_expired(current_date=current_date)

class ScholarshipApplicantSerializer(serializers.ModelSerializer):
    
    # Date fields with the specified format
    birthday = serializers.DateField(format=DATE_FORMAT, input_formats=[DATE_FORMAT])
    organisation_signature_date = serializers.DateField(format=DATE_FORMAT, input_formats=[DATE_FORMAT], required=False, allow_null=True)
    candidate_signature_date = serializers.DateField(format=DATE_FORMAT, input_formats=[DATE_FORMAT])

    class Meta:
        model = ScholarshipApplicant
        fields = '__all__'

    def validate(self, data):
        """
        Custom validation for the ScholarshipApplicant model.
        Ensures only one educational level is selected and signature dates are correctly validated.
        """
        # Ensure that only one educational background field is True
        
        # Validate that candidate_signature_date is not null
        if not data.get('candidate_signature_date'):
            raise serializers.ValidationError("The candidate signature date is required.")

        return data

    def create(self, validated_data):
        """
        Overriding the create method to handle the generation of QR codes before saving.
        """
        applicant = ScholarshipApplicant(**validated_data)
        applicant.save()
        return applicant