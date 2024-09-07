"""Copyright (c) 2024 Esther Onyenoro

This software is licensed under [Proprietary License].
You may not modify, copy, or distribute this software without permission.
For more details, see the LICENSE file in the root of the repository."""

import os
from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets, generics, exceptions as djangoexceptions
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.exceptions import ValidationError
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import User, About, Event, Partners, Payments, Logs,Scholarship, ScholarshipApplicant, Newsletter, NewsletterReceipients
from .serializers import (
    UserSerializer, AboutSerializer, EventSerializer,NewsletterSerializer, NewsletterReceipientsSerializer,
    PartnersSerializer, PaymentsSerializer, LogsSerializer,UserRegistrationSerializer, UserLoginSerializer, ScholarshipSerializer, ScholarshipApplicantSerializer
)
from .templates import Html
from rest_framework_simplejwt.tokens import RefreshToken
from .utils import Utils
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from rest_framework_simplejwt.tokens import AccessToken
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.contrib.auth.tokens import default_token_generator
from django.contrib.sites.shortcuts import get_current_site
from django.contrib.auth import login, get_user_model
from django.forms.models import model_to_dict
from django.conf import settings
from django.db import connection

User = get_user_model()

NAME = 'LAHF'
VERSION = '1.0.0'

@method_decorator(csrf_exempt, name="dispatch")
class HomeView(APIView):
    def get(self, request):
        data = {
            'success': 'true',
            'message': 'Welcome to ' + NAME + ' version ' + VERSION,
            'data': {
                'name': NAME,
                'version': VERSION
            }
        }
        return Response(data, status=status.HTTP_200_OK)

@method_decorator(csrf_exempt, name="dispatch")
class AboutAPIView(APIView):
    def get(self, request):
        about = About.objects.first()
        if about:
            serializer = AboutSerializer(about)
            return Response({'success': 'true', 'message': 'Retrieved the company details', 'data': serializer.data}, status=status.HTTP_200_OK)
        return Response({'success': 'false', 'message': 'No company details found', 'data':None}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        serializer = AboutSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'success': 'true', 'message': 'Company details created successfully', 'data': serializer.data}, status=status.HTTP_201_CREATED)
        return Response({'success': 'false', 'message': 'Failed to create company details', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    def put(self, request):
        about = About.objects.first()
        if about:
            serializer = AboutSerializer(about, data=request.data)
            if serializer.is_valid():
                serializer.save()

                return Response({'success': 'true', 'message': 'Event updated successfully', 'data': serializer.data}, status=status.HTTP_200_OK)
            return Response({'success': 'false', 'message': 'Failed to update event', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'success': 'false', 'message': 'Event not found', 'data':None}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request):
        about = About.objects.first()
        if about:
            about.delete()
            return Response({'success': 'true', 'message': 'Event deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        return Response({'success': 'false', 'message': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)

class EventAPIView(APIView):
    def get(self, request):
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True,  context={'request': request})
        return Response({'success': 'true', 'message': 'Retrieved all events', 'data': serializer.data}, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = EventSerializer(data=request.data,  context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response({'success': 'true', 'message': 'Event created successfully', 'data': serializer.data}, status=status.HTTP_201_CREATED)
        return Response({'success': 'false', 'message': 'Failed to create event', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
class EventDetailAPIView(APIView):
    def get_object(self, id):
        try:
            return Event.objects.get(id=id)
        except Event.DoesNotExist:
            return None

    def get_objects_by_participant(self, participant_id):
        if connection.vendor == 'postgresql':
            return Event.objects.filter(participants__contains=participant_id)
        else:
            # Use alternative approach for SQLite or other backends
            return Event.objects.filter(participants__icontains=f'"{participant_id}"')

    def get(self, request, id=None, participant_id=None):
        if id:
            event = self.get_object(id)
            if event:
                serializer = EventSerializer(event,  context={'request': request})
                return Response({'success': 'true', 'message': 'Event retrieved successfully', 'data': serializer.data}, status=status.HTTP_200_OK)
        elif participant_id:
            events = self.get_objects_by_participant(participant_id)
            if events.exists():
                serializer = EventSerializer(events, many=True,  context={'request': request})
                return Response({'success': 'true', 'message': 'Events retrieved successfully', 'data': serializer.data}, status=status.HTTP_200_OK)
        return Response({'success': 'false', 'message': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, id):
        event = self.get_object(id)
        if event:
            serializer = EventSerializer(event, data=request.data, partial=True, context={'request': request})
            if serializer.is_valid():
                serializer.save()
                return Response({'success': 'true', 'message': 'Event updated successfully', 'data': serializer.data}, status=status.HTTP_200_OK)
            return Response({'success': 'false', 'message': 'Failed to update event', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'success': 'false', 'message': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, id):
        event = self.get_object(id)
        if event:
            event.delete()
            return Response({'success': 'true', 'message': 'Event deleted successfully'}, status=status.HTTP_200_OK)
        return Response({'success': 'false', 'message': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)

class PartnerListCreateView(generics.ListCreateAPIView):
    queryset = Partners.objects.all()
    serializer_class = PartnersSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response({'success': True, 'message': 'Partners retrieved successfully', 'data': serializer.data})

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({'success': True, 'message': 'Partner created successfully', 'data': serializer.data}, status=status.HTTP_201_CREATED, headers=headers)

class PartnerDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Partners.objects.all()
    serializer_class = PartnersSerializer
    lookup_field = 'id'

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response({'success': True, 'message': 'Partner details retrieved successfully', 'data': serializer.data})

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        
        return Response({'success': True, 'message': 'Partner updated successfully', 'data': serializer.data})

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({'success': True, 'message': 'Partner deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

class AdminUserCreateView(generics.CreateAPIView):
    """
    Admin API to create users.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    def post(self, request):
        data = request.data
        data['is_active']= True
        serializer = UserRegistrationSerializer(data=data)
        if serializer.is_valid():
            user = serializer.save()
            
            # Define the email subject and create the HTML content using the template
            subject = "User Registration"
            html = Html()  # Assume Html class is properly defined elsewhere
            newsletter_html = html.newsletter_template(
                title=subject,
                firstname=data['firstname'],  # Customize per recipient if needed
                article_title='newsletter.title',  # Assuming 'title' is an attribute of Newsletter
                article_body='newsletter.message'  # Assuming 'body' is an attribute of Newsletter
            )

            # Send the email to all recipients
            Utils().send_email_message(
                subject='Lahf '+subject,
                message='',  # Optional plain-text message
                from_email=settings.EMAIL_HOST_USER,  # Sender's email address
                recipient_list=[data['email']],  # All recipient emails
                html_message=newsletter_html  # The HTML content of the email
            )
            refresh = RefreshToken.for_user(user)
            return Response({
                'success': True,
                'message': 'User registered successfully',
                'userid': user.id,
                'refresh': str(refresh),
                'access': str(refresh.access_token)
            }, status=status.HTTP_201_CREATED)
        return Response({'success': False, 'message': 'Failed to register user', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class UserListCreateView(generics.ListCreateAPIView):
    """
    API view to list and create users.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    def post(self, request):
        data=request.data
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(user.pk.bytes)
            current_site = get_current_site(request)
            verify_link = f"http://{current_site.domain}/#/email/registration/{uid}/{token}"
            #print(verify_link," ===============")
            subject = 'Email Verification'
            message = f"""
            <!DOCTYPE html>
            <html>
            <head>
                <title>Email Verification</title>
                <style>
                    body {{ font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; color: #333; }}
                    .container {{ max-width: 600px; margin: 20px auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }}
                    .header {{ text-align: center; padding: 10px 0; border-bottom: 1px solid #ddd; }}
                    .header h1 {{ margin: 0; color: #4CAF50; }}
                    .content {{ padding: 20px; }}
                    .content p {{ margin: 10px 0; line-height: 1.6; }}
                    .verify-button {{ display: block; width: 200px; margin: 20px auto; padding: 10px 0; text-align: center; background-color: #4CAF50; color: #fff; text-decoration: none; border-radius: 5px; font-size: 16px; }}
                    .footer {{ text-align: center; padding: 10px 0; border-top: 1px solid #ddd; margin-top: 20px; color: #888; }}
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Email Verification</h1>
                    </div>
                    <div class="content">
                        <p>Hi {user.firstname},</p>
                        <p>Click the link below to verify your email address:</p>
                        <a href="{verify_link}" class="verify-button">Verify Email</a>
                        <p>If you did not request this email, please ignore it.</p>
                    </div>
                    <div class="footer">
                        <p>Thank you for using our service!</p>
                    </div>
                </div>
            </body>
            </html>
            """
            # Define the email subject and create the HTML content using the template
            subject = "User Registration"
            html = Html()  # Assume Html class is properly defined elsewhere
            # Define the email subject and create the HTML content using the template
            newsletter_html = html.newsletter_template(
                title=subject,
                firstname=data['firstname'],  # Customize per recipient if needed
                article_title='newsletter.title',  # Assuming 'title' is an attribute of Newsletter
                article_body='newsletter.message'  # Assuming 'body' is an attribute of Newsletter
            )

            # Send the email to all recipients
            Utils().send_email_message(
                subject='Lahf '+subject,
                message='',  # Optional plain-text message
                from_email=settings.EMAIL_HOST_USER,  # Sender's email address
                recipient_list=[data['email']],  # All recipient emails
                html_message=newsletter_html  # The HTML content of the email
            )
            refresh = RefreshToken.for_user(user)
            return Response({
                'success': True,
                'message': 'User registered successfully',
                'userid': user.id,
                'refresh': str(refresh),
                'access': str(refresh.access_token)
            }, status=status.HTTP_201_CREATED)
        return Response({'success': False, 'message': 'Failed to register user', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        queryset = self.get_queryset()
        serializer = UserSerializer(queryset, many=True)
        return Response({'success': True, 'message': 'Users retrieved successfully', 'data': serializer.data}, status=status.HTTP_200_OK)

class UserLoginAPIView(APIView):
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            login(request, user)
            refresh = RefreshToken.for_user(user)
            return Response({
                'success': True,
                'message': 'Login successful',
                'userid': user.id,
                'refresh': str(refresh),
                'access': str(refresh.access_token)
            }, status=status.HTTP_200_OK)
        # Include serializer.errors in the response for invalid credentials
        return Response({
            'success': False,
            'message': 'Invalid credentials',
            'errors': serializer.errors
        }, status=status.HTTP_401_UNAUTHORIZED)

class PasswordResetRequestView(APIView):
    
    def post(self, request):
        email = request.data.get('email')
        new_password = request.data.get('new_password')
        user = User.objects.filter(email=email).first()
        if user:
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(user.pk.bytes)
            current_site = get_current_site(request)
            reset_link = f"http://{current_site.domain}/#/password/reset/confirm/{uid}/{token}?new_password={new_password}"
            subject = 'Password Reset Request'
            message = f"""
            <!DOCTYPE html>
            <html>
            <head>
                <title>Password Reset</title>
                <style>
                    body {{ font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; color: #333; }}
                    .container {{ max-width: 600px; margin: 20px auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }}
                    .header {{ text-align: center; padding: 10px 0; border-bottom: 1px solid #ddd; }}
                    .header h1 {{ margin: 0; color: #4CAF50; }}
                    .content {{ padding: 20px; }}
                    .content p {{ margin: 10px 0; line-height: 1.6; }}
                    .reset-button {{ display: block; width: 200px; margin: 20px auto; padding: 10px 0; text-align: center; background-color: #4CAF50; color: #fff; text-decoration: none; border-radius: 5px; font-size: 16px; }}
                    .footer {{ text-align: center; padding: 10px 0; border-top: 1px solid #ddd; margin-top: 20px; color: #888; }}
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Password Reset</h1>
                    </div>
                    <div class="content">
                        <p>Hi {user.firstname},</p>
                        <p>Click the button below to reset your password:</p>
                        <a href="{reset_link}" class="reset-button">Reset Password</a>
                        <p>If you did not request this email, please ignore it.</p>
                    </div>
                    <div class="footer">
                        <p>Thank you for using our service!</p>
                    </div>
                </div>
            </body>
            </html>
            """
            send_mail(subject, '', settings.EMAIL_HOST_USER, [email], html_message=message)
            #print(reset_link)
            return Response({'success': True, 'message': 'Password reset link sent successfully'}, status=status.HTTP_200_OK)
        return Response({'success': False, 'message': 'User with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)

class PasswordResetConfirmView(APIView):
    def get(self, request, uidb64, token):
        new_password = request.query_params.get('new_password')
        if new_password:
            try:
                uid = int.from_bytes(urlsafe_base64_decode(uidb64), 'big')
                user = User.objects.get(pk=uid)
            except (TypeError, ValueError, OverflowError, User.DoesNotExist):
                user = None
            if user and default_token_generator.check_token(user, token):
                user.set_password(new_password)
                user.save()
                return Response({'success': True, 'message': 'Password reset successful'}, status=status.HTTP_200_OK)
            return Response({'success': False, 'message': 'Invalid token or user'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'success': False, 'message': "'new_password' field is needed"}, status=status.HTTP_400_BAD_REQUEST)
  
class EmailVerificationView(APIView):
    def get(self, request, uidb64, token):
        try:
            uid = int.from_bytes(urlsafe_base64_decode(uidb64), 'big')
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None
        if user and default_token_generator.check_token(user, token):
            user.is_active = True
            user.save()
            return Response({'success': True, 'message': 'Email verified successfully'}, status=status.HTTP_200_OK)
        return Response({'success': False, 'message': 'Invalid token or user'}, status=status.HTTP_400_BAD_REQUEST)

class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'id'

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response({'success': True, 'message': 'User details retrieved successfully', 'data': serializer.data})

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response({'success': True, 'message': 'User updated successfully', 'data': serializer.data})

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({'success': True, 'message': 'User deleted successfully'})


class VerifyTokenAPIView(APIView):
    """
    View to verify the validity of an access token.
    """

    # permission_classes = [IsAuthenticated]

    def post(self, request):
        token = request.data.get('token')

        try:
            # Decode the token to check if it's valid
            access_token = AccessToken(token)
            # Get the user_id (assuming the default setup)
            user_id = access_token['user_id']

            # You can check for token payload here, e.g., user, expiration, etc.
            return Response({'success': True, 'message': 'Token is valid', 'user_id':user_id}, status=status.HTTP_200_OK)

        except (TokenError, InvalidToken):
            return Response({'success': False, 'message': 'Invalid or expired token','user_id':None}, status=status.HTTP_401_UNAUTHORIZED)

class PaymentListCreateView(generics.ListCreateAPIView):
    queryset = Payments.objects.all()
    serializer_class = PaymentsSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response({'success': True, 'message': 'Payments retrieved successfully', 'data': serializer.data})

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({'success': True, 'message': 'Payment created successfully', 'data': serializer.data}, status=status.HTTP_201_CREATED, headers=headers)

class PaymentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Payments.objects.all()
    serializer_class = PaymentsSerializer
    lookup_field = 'id'

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response({'success': True, 'message': 'Payment details retrieved successfully', 'data': serializer.data})

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        
        return Response({'success': True, 'message': 'Payment updated successfully', 'data': serializer.data})

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({'success': True, 'message': 'Payment deleted successfully'})

class LogsListCreateView(generics.ListCreateAPIView):
    queryset = Logs.objects.all()
    serializer_class = LogsSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response({'success': True, 'message': 'Logs retrieved successfully', 'data': serializer.data})

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({'success': True, 'message': 'Log created successfully', 'data': serializer.data}, status=status.HTTP_201_CREATED, headers=headers)

class LogsDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Logs.objects.all()
    serializer_class = LogsSerializer
    lookup_field = 'id'

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response({'success': True, 'message': 'Log details retrieved successfully', 'data': serializer.data})

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response({'success': True, 'message': 'Log updated successfully', 'data': serializer.data})

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({'success': True, 'message': 'Log deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

class NewsletterViewSet(viewsets.ModelViewSet):
    queryset = Newsletter.objects.all()
    serializer_class = NewsletterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response({
                'success': True,
                'message': 'Newsletter created successfully',
                'data': serializer.data
            }, status=status.HTTP_201_CREATED, headers=headers)
        return Response({
            'success': False,
            'message': 'Failed to create newsletter',
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request, *args, **kwargs):
        # Return the single instance if it exists
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response({
            'success': True,
            'message': 'Newsletter retrieved successfully',
            'data': serializer.data
        })

    def retrieve(self, request, *args, **kwargs):
        
        try:
            instance = self.get_object()
        except Newsletter.DoesNotExist:
            return Response({
                'success': False,
                'message': f'Newsletter with id {kwargs["pk"]} not found'
            }, status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(instance)
        return Response({
            'success': True,
            'message': f'Newsletter {instance.id} retrieved successfully',
            'data': serializer.data
        })

    def update(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
        except Newsletter.DoesNotExist:
            return Response({
                'success': False,
                'message': 'Newsletter not found',
            }, status=status.HTTP_404_NOT_FOUND)

        # Validate data for PUT request (must provide all fields)
        serializer = self.get_serializer(instance, data=request.data)
        if serializer.is_valid():
            self.perform_update(serializer)
            return Response({
                'success': True,
                'message': 'Newsletter updated successfully',
                'data': serializer.data
            })
        return Response({
            'success': False,
            'message': 'Failed to update newsletter',
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
        except Newsletter.DoesNotExist:
            return Response({
                'success': False,
                'message': 'Newsletter not found',
            }, status=status.HTTP_404_NOT_FOUND)

        self.perform_destroy(instance)
        return Response({
            'success': True,
            'message': 'Newsletter deleted successfully'
        }, status=status.HTTP_204_NO_CONTENT)



class NewsletterReceipientsViewSet(viewsets.ModelViewSet):
    queryset = NewsletterReceipients.objects.all().order_by('-joined_at')
    serializer_class = NewsletterReceipientsSerializer

    def get_user_data(self, email):
        """
        Check if the email exists in the User model.
        If it does, return the user's first name, last name, and email.
        Otherwise, return None.
        """
        try:
            user = User.objects.get(email=email)
            serializer = UserSerializer(user)
            return serializer.data  # This will return serialized data of the User model
        except User.DoesNotExist:
            return None

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        custom_response = {
            'success': True,
            'message': 'Recipient created successfully',
            'data': serializer.data
        }
        return Response(custom_response, status=status.HTTP_201_CREATED)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        data = []

        for recipient in queryset:
            user_data = self.get_user_data(recipient.email)
            if user_data:
                # Include recipient ID in the user data
                user_data['id']=recipient.id
                data.append(user_data)  # Add user data if user exists
            else:
                recipient_data = model_to_dict(recipient)
                recipient_data['id'] = recipient.id  # Ensure the ID is included
                data.append(recipient_data)  # Add recipient data otherwise

        custom_response = {
            'success': True,
            'message': 'Recipients fetched successfully',
            'data': data
        }
        return Response(custom_response)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        user_data = self.get_user_data(instance.email)
        
        if user_data:
            user_data['id']= instance.id
            custom_response = {
                'success': True,
                'message': 'Recipient details fetched successfully',
                'data': user_data
            }
        else:
            recipient_data = model_to_dict(instance)
            recipient_data['id'] = instance.id
            custom_response = {
                'success': True,
                'message': 'Recipient details fetched successfully',
                'data': recipient_data
            }
        
        return Response(custom_response)
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        custom_response = {
            'success': True,
            'message': 'Recipient updated successfully',
            'data': serializer.data
        }
        return Response(custom_response)

    def partial_update(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)

        custom_response = {
            'success': True,
            'message': 'Recipient deleted successfully',
            'data': None
        }
        return Response(custom_response, status=status.HTTP_204_NO_CONTENT)

class NewsletterSendView(APIView):
    """
    View to handle sending newsletters to recipients.

    This view retrieves the newsletter by its ID, fetches all recipients, 
    and sends the newsletter email to each recipient in HTML format.
    
    """
    def get_user_data(self, email):
        """
        Check if the email exists in the User model.
        If it does, return the user's first name, last name, and email.
        Otherwise, return None.
        """
        try:
            user = User.objects.get(email=email)
            serializer = UserSerializer(user)
            return serializer.data  # This will return serialized data of the User model
        except User.DoesNotExist:
            return None
    def post(self, request):
        # Get the newsletter ID from request
        newsletterid = request.data.get('newsletter')
        newsletter = Newsletter.objects.filter(id=newsletterid).first()  # Fetch the newsletter object

        # Ensure the newsletter exists
        if not newsletter:
            return Response({'success': False, 'message': 'Newsletter not found'}, status=status.HTTP_404_NOT_FOUND)

        # Fetch all recipients for the newsletter
        newsletterreceipients = NewsletterReceipients.objects.all().order_by('-joined_at')

        try:
            for receipient in newsletterreceipients:
                u=receipient.email
                user_data = self.get_user_data(receipient.email)
        
                if user_data:
                    u=user_data['firstname']
                
                # Define the email subject and create the HTML content using the template
                subject = "Newsletter"
                html = Html()  # Assume Html class is properly defined elsewhere
                newsletter_html = html.newsletter_template(
                    title=subject,
                    firstname=u,  # Customize per recipient if needed
                    article_title=newsletter.title,  # Assuming 'title' is an attribute of Newsletter
                    article_body=newsletter.message  # Assuming 'body' is an attribute of Newsletter
                )

                # Send the email to all recipients
                Utils().send_email_message(
                    subject='Lahf '+subject,
                    message='',  # Optional plain-text message
                    from_email=settings.EMAIL_HOST_USER,  # Sender's email address
                    recipient_list=[receipient.email],  # All recipient emails
                    html_message=newsletter_html  # The HTML content of the email
                )
            
            # Return success response if emails are sent successfully
            return Response({'success': True, 'message': 'Newsletter sent successfully', 'data': None}, status=status.HTTP_200_OK)

        except Exception as e:
            # Handle any unexpected errors during email sending
            return Response({'success': False, 'message': f'Error: {str(e)}', 'data': None}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ScholarshipListCreateView(generics.ListCreateAPIView):
    queryset = Scholarship.objects.all()
    serializer_class = ScholarshipSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response({
            'success': True,
            'message': 'Scholarships retrieved successfully',
            'data': serializer.data
        })

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({
            'success': True,
            'message': 'Scholarship created successfully',
            'data': serializer.data
        }, status=status.HTTP_201_CREATED, headers=headers)

class ScholarshipDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Scholarship.objects.all()
    serializer_class = ScholarshipSerializer
    lookup_field = 'id'

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response({
            'success': True,
            'message': 'Scholarship details retrieved successfully',
            'data': serializer.data
        })

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response({
            'success': True,
            'message': 'Scholarship updated successfully',
            'data': serializer.data
        })

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({
            'success': True,
            'message': 'Scholarship deleted successfully'
        }, status=status.HTTP_204_NO_CONTENT) 

class ScholarshipApplicantListCreateView(generics.ListCreateAPIView):
    serializer_class = ScholarshipApplicantSerializer

    def get_queryset(self):
        """
        Optionally restricts the returned applicants to a given scholarship ID provided via query parameters.
        """
        scholarship_id = self.request.query_params.get('scholarship_id')
        if scholarship_id:
            try:
                # Assuming 'scholarship_id' is an integer or UUID; adjust as needed.
                queryset = ScholarshipApplicant.objects.filter(scholarship_id=scholarship_id)
            except ScholarshipApplicant.DoesNotExist:
                raise djangoexceptions.NotFound(detail="Scholarship not found.")
        else:
            queryset = ScholarshipApplicant.objects.all()
        return queryset
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response({
            'success': True,
            'message': 'Applicants retrieved successfully',
            'data': serializer.data
        })

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({
            'success': True,
            'message': 'Applicant applied successfully',
            'data': serializer.data
        }, status=status.HTTP_201_CREATED, headers=headers)

class ScholarshipApplicantDetailView(generics.RetrieveUpdateDestroyAPIView):
    
    queryset = ScholarshipApplicant.objects.all()
    serializer_class = ScholarshipApplicantSerializer
    lookup_field = 'id'

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response({
            'success': True,
            'message': 'Applicant details retrieved successfully',
            'data': serializer.data
        })

    def update(self, request, *args, **kwargs):
        print(request.method)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response({
            'success': True,
            'message': 'Applicant updated successfully',
            'data': serializer.data
        })

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({
            'success': True,
            'message': 'Applicant deleted successfully'
        }, status=status.HTTP_204_NO_CONTENT)
    
class ScholarshipApplicantApprovalView(generics.UpdateAPIView):
    queryset = ScholarshipApplicant.objects.all()
    serializer_class = ScholarshipApplicantSerializer
    lookup_field = 'id'

    def post(self, request, *args, **kwargs):
        applicant = self.get_object()
        organisation_signature_date = request.data.get('organisation_signature_date')
        
        if not organisation_signature_date:
            return Response({
                'success': False,
                'message': 'Organisation signature date is required.'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        applicant.organisation_approved = True
        applicant.organisation_signature_date = organisation_signature_date
        applicant.save()

        return Response({
            'success': True,
            'message': 'Applicant approved successfully',
            'data': {
                'organisation_approved': applicant.organisation_approved,
                'organisation_signature_date': applicant.organisation_signature_date
            }
        }, status=status.HTTP_200_OK)

class ScholarshipApplicantDisApprovalView(generics.UpdateAPIView):
    queryset = ScholarshipApplicant.objects.all()
    serializer_class = ScholarshipApplicantSerializer
    lookup_field = 'id'

    def post(self, request, *args, **kwargs):
        applicant = self.get_object()
        
        applicant.organisation_approved = False
        applicant.organisation_signature_date = None
        applicant.save()

        return Response({
            'success': True,
            'message': 'Applicant disapproved successfully',
            'data': None
        }, status=status.HTTP_200_OK)
    
class ReportView(APIView):
    months = {
        'Jan': 0,
        'Feb': 0,
        'Mar': 0,
        'Apr': 0,
        'May': 0,
        'Jun': 0,
        'Jul': 0,
        'Aug': 0,
        'Sep': 0,
        'Oct': 0,
        'Nov': 0,
        'Dec': 0
    }

    def _reportvolunteer(self):
        # Fetch all volunteers
        volunteers = User.objects.all()

        # Create a copy of the months dictionary to hold the count of volunteers per month
        monthly_report = self.months.copy()

        # Iterate over volunteers and count them by month
        for v in volunteers:
            if v.joined_date:
                month_name = v.joined_date.strftime('%b')  # Use abbreviated month name
                if month_name in monthly_report:
                    monthly_report[month_name] += 1

        # Convert the report data into a list of dictionaries for better readability
        data = [{'month': month, 'count': count} for month, count in monthly_report.items()]

        return Response({
            'success': True,
            'message': 'Volunteer report retrieved successfully',
            'data': data
        }, status=status.HTTP_200_OK)

    def _reportevents(self):
        # Fetch all events
        events = Event.objects.all()

        # Create a copy of the months dictionary to hold the count of events per month
        monthly_report = self.months.copy()

        # Iterate over events and count them by month
        for event in events:
            if event.date:
                month_name = event.date.strftime('%b')  # Use abbreviated month name
                if month_name in monthly_report:
                    monthly_report[month_name] += 1

        # Convert the report data into a list of dictionaries for better readability
        data = [{'month': month, 'count': count} for month, count in monthly_report.items()]
        
        return Response({
            'success': True,
            'message': 'Events report retrieved successfully',
            'data': data
        }, status=status.HTTP_200_OK)

    def _reportloggedin(self,request):
        # Define a time range for "recently logged in" (e.g., last 30 days)
        limit = request.query_params.get('limit')
        if limit is None:
            limit= 10
        recent_time_threshold = timezone.now() - timezone.timedelta(days=int(limit))

        # Fetch recently logged-in users
        logged_in_users = User.objects.filter(last_login__gte=recent_time_threshold).order_by('-last_login')

        # Prepare the data with user details
        data = [
            {
                'id': user.id,
                'name': user.firstname+' '+user.lastname,  # Assuming User model has this method or property
                'image': user.profileImage if user.profileImage else None,  # Assuming profile_image is a field in User model
                'last_login': user.last_login.strftime('%Y-%m-%d %H:%M:%S')  # Formatting the last login timestamp
            }
            for user in logged_in_users
        ]
        return Response({
            'success': True,
            'message': f'Recently last {limit} logged-in users report retrieved successfully',
            'data': data
        }, status=status.HTTP_200_OK)

    def get(self, request, rtype):
        types = ['volunteer', 'events', 'loggedin']
        if rtype not in types:
            return Response({
                'success': False,
                'message': "The report type must be one of ['volunteer', 'events', 'loggedin']",
                'data': None
            }, status=status.HTTP_400_BAD_REQUEST)

        if rtype == 'volunteer':
            return self._reportvolunteer()
        elif rtype == 'events':
            return self._reportevents()
        elif rtype == 'loggedin':
            return self._reportloggedin(request)

        return Response({
            'success': False,
            'message': "The report type must be one of ['volunteer', 'events', 'loggedin']",
            'data': None
        }, status=status.HTTP_400_BAD_REQUEST)