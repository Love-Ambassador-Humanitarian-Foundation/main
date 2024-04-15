from django.urls import path
from . import views

urlpatterns = [
    path('', views.Home.as_view(), name='home'),  
    path('about', views.AboutAPI.as_view(), name='about'),
]
