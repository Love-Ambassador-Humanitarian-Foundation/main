from django.db import models
from django.core.exceptions import ValidationError
from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager, Group, Permission
from django.db import models
import uuid

# Define a more reasonable maximum length for char fields
MAX_LENGTH = 255

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
    story = models.TextField()
    logo = models.TextField()
    phonenumber = models.CharField(max_length=15)
    emailone = models.EmailField(max_length=MAX_LENGTH)
    emailtwo = models.EmailField(max_length=MAX_LENGTH, blank=True, null=True)
    emailthree = models.EmailField(max_length=MAX_LENGTH, blank=True, null=True)
    address = models.TextField()
    mission = models.TextField()
    values = models.TextField()
    achievements = models.JSONField(blank=True, null=True)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    branches = models.JSONField(blank=True, null=True)
    policies = models.TextField()
    socials = models.JSONField()
    account_details = models.JSONField()

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
    logo = models.TextField()
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
    images = models.FileField(upload_to='eventimages/', blank=True, null=True)
    videos = models.FileField(upload_to='eventvideos/', blank=True, null=True)

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
    image = models.TextField()

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
