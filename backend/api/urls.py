"""Copyright (c) 2024 Esther Onyenoro

This software is licensed under [Proprietary License].
You may not modify, copy, or distribute this software without permission.
For more details, see the LICENSE file in the root of the repository."""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

class CustomRouter(DefaultRouter):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.trailing_slash = ''  # Disable the trailing slash
router = CustomRouter()

router.register(r'newsletters', views.NewsletterViewSet)
router.register(r'newsletter-recipients', views.NewsletterReceipientsViewSet, basename='newsletter-recipients')


urlpatterns = [
    path('', views.HomeView.as_view(), name='home'),
    path('about', views.AboutAPIView.as_view(), name='about'),

    # Event URLs
    path('events', views.EventAPIView.as_view(), name='event_list_create'),
    path('events/<uuid:id>', views.EventDetailAPIView.as_view(), name='event_detail'),
    path('events/participant/<str:participant_id>/', views.EventDetailAPIView.as_view(), name='event-detail-by-participant'),

    # Partner URLs
    path('partners', views.PartnerListCreateView.as_view(), name='partner_list_create'),
    path('partners/<uuid:id>', views.PartnerDetailView.as_view(), name='partner_detail'),

    # User URLs
    path('users', views.UserListCreateView.as_view(), name='user_list_create'),
    path('users/<uuid:id>', views.UserDetailView.as_view(), name='user_detail'),
    path('adminusers', views.AdminUserCreateView.as_view(), name='user_create'),

    # User login
    path('users/login', views.UserLoginAPIView.as_view(), name='user-login'),
    path('users/token/verify', views.VerifyTokenAPIView.as_view(), name='user-token_verify'),
    # Password reset
    path('password/reset', views.PasswordResetRequestView.as_view(), name='password-reset-request'),
    path('password/reset/confirm/<str:uidb64>/<str:token>', views.PasswordResetConfirmView.as_view(), name='password-reset-confirm'),

    # Email verification
    path('email/verify/<str:uidb64>/<str:token>', views.EmailVerificationView.as_view(), name='email-verification'),
    

    # Payments URLs
    path('payments', views.PaymentListCreateView.as_view(), name='payment_list_create'),
    path('payments/<uuid:id>', views.PaymentDetailView.as_view(), name='payment_detail'),

    # Logs URLs
    path('logs', views.LogsListCreateView.as_view(), name='logs_list_create'),
    path('logs/<uuid:id>', views.LogsDetailView.as_view(), name='logs_detail'),

    # Newsletters URLs
    path('', include(router.urls)),
    path('send-newsletter', views.NewsletterSendView.as_view(), name='send-newsletter'),

    # Scholarship URLs
    path('scholarships', views.ScholarshipListCreateView.as_view(), name='scholarship-list-create'),
    path('scholarships/<uuid:id>', views.ScholarshipDetailView.as_view(), name='scholarship-detail'),
    path('scholarshipapplicants', views.ScholarshipApplicantListCreateView.as_view(), name='scholarshipapplicant-list-create'),
    path('scholarshipapplicants/<uuid:id>', views.ScholarshipApplicantDetailView.as_view(), name='scholarshipapplicant-detail'),
    path('scholarshipapplicants/<uuid:id>/approve', views.ScholarshipApplicantApprovalView.as_view(), name='scholarshipapplicant-approve'),
    path('scholarshipapplicants/<uuid:id>/disapprove', views.ScholarshipApplicantDisApprovalView.as_view(), name='scholarshipapplicant-disapprove'),
    
    # ReportURLs
    path('reports/<str:rtype>', views.ReportView.as_view(), name='report-view'),

    # ContactUsURLs
    path('contactus', views.ContactUs.as_view(), name='contact-us')

]