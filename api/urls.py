from django.urls import path
from . import views

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

    # User login
    path('users/login', views.UserLoginAPIView.as_view(), name='user-login'),

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
]