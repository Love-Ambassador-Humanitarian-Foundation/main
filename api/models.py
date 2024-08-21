"""Copyright (c) 2024 Esther Onyenoro

This software is licensed under [Proprietary License].
You may not modify, copy, or distribute this software without permission.
For more details, see the LICENSE file in the root of the repository."""

import uuid
import re
from django.db import models
from django.utils import timezone
from django.core.exceptions import ValidationError
from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager, Group, Permission
from django.db import models
from .currencies import CURRENCY_CHOICES  # Import currency choices
from datetime import datetime, timedelta


# Define a more reasonable maximum length for char fields
MAX_LENGTH = 2555


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(max_length=255, unique=True)
    firstname = models.CharField(max_length=255)
    lastname = models.CharField(max_length=255)
    numberpre = models.CharField(max_length=255,blank=True, null=True)
    number = models.IntegerField(blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    facebook = models.CharField(max_length=255, blank=True, null=True)
    instagram = models.CharField(max_length=255, blank=True, null=True)
    twitter = models.CharField(max_length=255, blank=True, null=True)
    linkedIn = models.CharField(max_length=255, blank=True, null=True)
    whatsapp = models.CharField(max_length=255, blank=True, null=True)
    profileImage = models.TextField(blank=True, null=True)
    #is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    joined_date = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now=True)
    position = models.CharField(max_length=255, blank=True)
    groups = models.ManyToManyField(Group, related_name='custom_user_set')
    user_permissions = models.ManyToManyField(Permission, related_name='custom_user_set')

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['firstname', 'lastname']

    def __str__(self):
        return f"{self.email}"
    
    class Meta:
        ordering = ['-last_login', '-joined_date', 'firstname', 'lastname']

class About(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    company_name = models.CharField(max_length=MAX_LENGTH)
    story = models.TextField(blank=True, null=True)
    logo = models.TextField(blank=True, null=True)
    phonenumberpre = models.CharField(max_length=15, default=0)
    phonenumber = models.CharField(max_length=15,default=0)
    emailone = models.EmailField(max_length=MAX_LENGTH)
    emailtwo = models.EmailField(max_length=MAX_LENGTH, blank=True, null=True)
    emailthree = models.EmailField(max_length=MAX_LENGTH, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    mission = models.TextField(blank=True, null=True)
    values = models.TextField(blank=True, null=True)
    achievements = models.JSONField(blank=True, null=True)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    branches = models.JSONField(blank=True, null=True)
    policies = models.TextField(blank=True, null=True)
    socials = models.JSONField(blank=True, null=True)
    account_details = models.JSONField(blank=True, null=True)

    def __str__(self):
        return self.company_name

    class Meta:
        ordering = ['-created_date']


@receiver(pre_save, sender=About)
def limit_about_instance(sender, instance, **kwargs):
    if About.objects.exists() and not instance.pk:
        raise ValidationError("Only one instance of About is allowed")

class Partners(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=MAX_LENGTH)
    description = models.TextField()
    logo = models.TextField(blank=True, null=True)
    link = models.URLField(max_length=MAX_LENGTH)
    created_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-created_date', 'title']

class Event(models.Model):
    EVENT_TYPES = [
        ('seminar', 'Seminar'),
        ('fundraiser', 'Fundraiser'),
        ('donation', 'Donation'),
        ('awareness', 'Awareness')
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=MAX_LENGTH)
    description = models.TextField()
    type = models.CharField(max_length=MAX_LENGTH, choices=EVENT_TYPES)
    participants = models.JSONField()
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    ongoing = models.BooleanField(default=False)
    images = models.TextField(blank=True, null=True)
    videos = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-end_date', 'title']

class Payments(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    amount = models.IntegerField()
    date_paid = models.DateTimeField()
    contributor = models.CharField(max_length=MAX_LENGTH)
    reason = models.CharField(max_length=MAX_LENGTH)
    details = models.TextField()
    image = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.contributor} ({self.amount}) {self.reason}"

    class Meta:
        ordering = ['-date_paid', 'contributor', 'amount']

class Logs(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    action = models.CharField(max_length=MAX_LENGTH)
    date_created = models.DateTimeField(auto_now_add=True)
    details = models.TextField()

    def __str__(self):
        return f"{self.user} ({self.action}) {self.date_created}"

    class Meta:
        ordering = ['-date_created', 'user', 'action']

class Notification(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    recipient = models.CharField(max_length=MAX_LENGTH, blank=False, null=False)
    message = models.CharField(max_length=MAX_LENGTH)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Notification for {self.recipient} - {self.message}"

    class Meta:
        ordering = ['-created_at']

class Email(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    sender = models.CharField(max_length=MAX_LENGTH, blank=False, null=False)
    recipient = models.CharField(max_length=MAX_LENGTH, blank=False, null=False)
    subject = models.CharField(max_length=MAX_LENGTH, blank=False, null=False)
    body = models.TextField(blank=False, null=False)
    sent_at = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.subject} - {self.recipient}"

    class Meta:
        ordering = ['-sent_at', 'recipient']


class Scholarship(models.Model):
    # Class Level Choices
    NURSERY = 'Nursery'
    PRIMARY = 'Primary'
    JSS = 'JSS'
    SSS = 'SSS'
    TERTIARY = 'Tertiary'
    
    CLASS_LEVEL_CHOICES = [
        (NURSERY, 'Nursery'),
        (PRIMARY, 'Primary'),
        (JSS, 'Junior Secondary School'),
        (SSS, 'Senior Secondary School'),
        (TERTIARY, 'Tertiary'),
    ]

    # Personal Information
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    first_name = models.CharField(max_length=MAX_LENGTH)
    middle_name = models.CharField(max_length=MAX_LENGTH, blank=True, null=True)
    last_name = models.CharField(max_length=MAX_LENGTH)
    profile_picture = models.TextField(blank=True, null=True)
    birthday = models.DateField()
    home_address = models.CharField(max_length=MAX_LENGTH)
    email = models.EmailField(max_length=MAX_LENGTH)
    phone_number = models.CharField(max_length=MAX_LENGTH)

    # Guardian/Parent Information
    guardian_parent_name = models.CharField(max_length=MAX_LENGTH)
    guardian_parent_home_address = models.CharField(max_length=MAX_LENGTH)
    guardian_parent_email = models.EmailField(max_length=MAX_LENGTH)
    guardian_parent_phone_number = models.CharField(max_length=MAX_LENGTH)

    # Educational Background
    nursery = models.BooleanField(default=False)
    primary = models.BooleanField(default=False)
    secondary = models.BooleanField(default=False)
    tertiary = models.BooleanField(default=False)
    name_of_institution = models.CharField(max_length=MAX_LENGTH)
    address_of_institution = models.CharField(max_length=MAX_LENGTH)
    class_level = models.CharField(max_length=MAX_LENGTH, choices=CLASS_LEVEL_CHOICES)

    # Scholarship Details
    amount_approved = models.DecimalField(max_digits=MAX_LENGTH, decimal_places=2)
    year = models.PositiveIntegerField()
    currency = models.CharField(max_length=3, choices=CURRENCY_CHOICES, default='NGN')
    duration = models.CharField(max_length=MAX_LENGTH)  # Duration as a string, e.g., "1 year", "6 months"
    organisation_signature_date = models.DateField()
    candidate_signature_date = models.DateField()
    barcode  =  models.TextField(blank=True, null=True)

    def __str__(self):
        return f'{self.first_name} {self.last_name} - {self.year}'
    
    @property
    def is_expired(self):
        duration_mapping = {
            'years': timedelta(days=365),
            'months': timedelta(days=30),
            'weeks': timedelta(weeks=1),
            'days': timedelta(days=1),
            'hours': timedelta(hours=1),
            'minutes': timedelta(minutes=1),
            'seconds': timedelta(seconds=1),
        }
        duration_parts = self.duration.split()
        amount = int(duration_parts[0])
        unit = duration_parts[1]
        expiry_date = self.organisation_signature_date + amount * duration_mapping[unit]
        return timezone.now().date() > expiry_date

    