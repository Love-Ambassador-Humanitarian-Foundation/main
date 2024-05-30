import os
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from .models import User, About, Event, Partners, Payments, Logs
from .serializers import (
    UserSerializer, AboutSerializer, EventSerializer,
    PartnersSerializer, PaymentsSerializer, LogsSerializer,UserLoginSerializer
)
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.tokens import default_token_generator
from django.contrib.sites.shortcuts import get_current_site

NAME = 'LAHF'
VERSION = '1.0.0'

@method_decorator(csrf_exempt, name="dispatch")
class HomeView(APIView):
    def get(self, request):
        data = {
            'success': 'true',
            'message': 'Welcome to ' + NAME + ' version ' + VERSION,
            'response': {
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
            return Response({'success': 'true', 'message': 'Retrieved the company details', 'response': serializer.data}, status=status.HTTP_200_OK)
        return Response({'success': 'false', 'message': 'No company details found'}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        serializer = AboutSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'success': 'true', 'message': 'Company details created successfully', 'response': serializer.data}, status=status.HTTP_201_CREATED)
        return Response({'success': 'false', 'message': 'Failed to create company details', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    def put(self, request):
        about = About.objects.first()
        if about:
            serializer = AboutSerializer(about, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({'success': 'true', 'message': 'Event updated successfully', 'response': serializer.data}, status=status.HTTP_200_OK)
            return Response({'success': 'false', 'message': 'Failed to update event', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'success': 'false', 'message': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request):
        about = About.objects.first()
        if about:
            about.delete()
            return Response({'success': 'true', 'message': 'Event deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        return Response({'success': 'false', 'message': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)

class EventAPIView(APIView):
    def get(self, request):
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True)
        return Response({'success': 'true', 'message': 'Retrieved all events', 'response': serializer.data}, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'success': 'true', 'message': 'Event created successfully', 'response': serializer.data}, status=status.HTTP_201_CREATED)
        return Response({'success': 'false', 'message': 'Failed to create event', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
class EventDetailAPIView(APIView):
    def get_object(self, id):
        try:
            return Event.objects.get(id=id)
        except Event.DoesNotExist:
            return None

    def get(self, request, id):
        event = self.get_object(id)
        if event:
            serializer = EventSerializer(event)
            return Response({'success': 'true', 'message': 'Event retrieved successfully', 'response': serializer.data}, status=status.HTTP_200_OK)
        return Response({'success': 'false', 'message': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, id):
        event = self.get_object(id)
        if event:
            # Check if images field is being updated
            old_image_path = event.images.path if event.images else None
            old_video_path = event.videos.path if event.videos else None

            serializer = EventSerializer(event, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()

                # Remove the old image file if it has been replaced
                if 'images' in request.data and old_image_path:
                    if os.path.exists(old_image_path):
                        os.remove(old_image_path)

                # Remove the old video file if it has been replaced
                if 'videos' in request.data and old_video_path:
                    if os.path.exists(old_video_path):
                        os.remove(old_video_path)

                return Response({'success': 'true', 'message': 'Event updated successfully', 'response': serializer.data}, status=status.HTTP_200_OK)
            return Response({'success': 'false', 'message': 'Failed to update event', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'success': 'false', 'message': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, id):
        event = self.get_object(id)
        if event:
            # Store the paths of the image and video files
            image_path = event.images.path if event.images else None
            video_path = event.videos.path if event.videos else None

            event.delete()

            # Remove the image file from the directory
            if image_path and os.path.exists(image_path):
                os.remove(image_path)

            # Remove the video file from the directory
            if video_path and os.path.exists(video_path):
                os.remove(video_path)

            return Response({'success': 'true', 'message': 'Event deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
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


class UserListCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                'success': True,
                'message': 'User created successfully',
                'data': serializer.data,
                'refresh': str(refresh),
                'access': str(refresh.access_token)
            }, status=status.HTTP_201_CREATED)
        return Response({'success': False, 'message': 'Failed to create user', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
class UserLoginView(APIView):
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            refresh = RefreshToken.for_user(user)
            return Response({
                'success': True,
                'message': 'Login successful',
                'refresh': str(refresh),
                'access': str(refresh.access_token)
            }, status=status.HTTP_200_OK)
        return Response({'success': False, 'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class PasswordResetRequestView(APIView):
    def post(self, request):
        email = request.data.get('email')
        user = User.objects.filter(email=email).first()
        if user:
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            current_site = get_current_site(request)
            reset_link = f"{current_site.domain}/reset-password/{uid}/{token}/"
            subject = 'Password Reset Request'
            message = render_to_string('password_reset_email.html', {'reset_link': reset_link})
            send_mail(subject, message, None, [email])
            return Response({'success': True, 'message': 'Password reset link sent successfully'}, status=status.HTTP_200_OK)
        return Response({'success': False, 'message': 'User with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)

class PasswordResetConfirmView(APIView):
    def post(self, request, uidb64, token):
        try:
            uid = force_text(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None
        if user and default_token_generator.check_token(user, token):
            new_password = request.data.get('new_password')
            user.set_password(new_password)
            user.save()
            return Response({'success': True, 'message': 'Password reset successful'}, status=status.HTTP_200_OK)
        return Response({'success': False, 'message': 'Invalid token or user'}, status=status.HTTP_400_BAD_REQUEST)

class EmailVerificationView(APIView):
    def get(self, request, uidb64, token):
        

        try:
            uid = str(urlsafe_base64_decode(uidb64), 'utf-8')
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
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response({'success': True, 'message': 'User updated successfully', 'data': serializer.data})

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({'success': True, 'message': 'User deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

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
        return Response({'success': True, 'message': 'Payment deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

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

