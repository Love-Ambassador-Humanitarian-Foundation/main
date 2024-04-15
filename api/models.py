from django.db import models
from django.core.exceptions import ValidationError
from django.db.models.signals import pre_save
from django.dispatch import receiver
import uuid

# Create your models here.
MAX_LENGTH=100000000000000

class Member(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(max_length=MAX_LENGTH)
    password = models.CharField(max_length=MAX_LENGTH)
    email = models.CharField(max_length=MAX_LENGTH)
    firstname = models.CharField(max_length=MAX_LENGTH)
    lastname = models.CharField(max_length=MAX_LENGTH)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    joined_date = models.CharField(max_length=MAX_LENGTH)
    last_login = models.CharField(max_length=MAX_LENGTH)
    position = models.CharField(max_length=MAX_LENGTH)


    def __str__(self):
        return self.firstname +'' + self.lastname
    
    class Meta:
        ordering = ['-last_login','-joined_date','firstname', 'lastname']

class About(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    company_name = models.CharField(max_length=MAX_LENGTH)
    story = models.TextField()
    logo = models.ImageField(upload_to='about/')
    phonenumber = models.CharField(max_length=MAX_LENGTH)
    emailone = models.CharField(max_length=MAX_LENGTH)
    emailtwo = models.CharField(max_length=MAX_LENGTH)
    emailthree = models.CharField(max_length=MAX_LENGTH)
    address = models.TextField()
    mission = models.TextField()
    values = models.TextField()
    achievements = models.JSONField()
    created_date = models.CharField(max_length=MAX_LENGTH)
    updated_date = models.CharField(max_length=MAX_LENGTH)
    branches = models.TextField()
    policies = models.TextField()
    socials = models.JSONField()
    def __str__(self):
        return self.company_name


@receiver(pre_save, sender=About)
def limit_about_instance(sender, instance, **kwargs):
    # Check if an instance already exists
    if About.objects.exists() and not instance.pk:
        raise ValidationError("Only one instance of About is allowed")

class Partners(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=MAX_LENGTH)
    description = models.TextField()
    logo = models.ImageField(upload_to='partners/')
    link = models.CharField(max_length=MAX_LENGTH)
    created_date = models.CharField(max_length=MAX_LENGTH)
    def __str__(self):
        return self.title

class Fundraising(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=MAX_LENGTH)
    description = models.TextField
    target_amount = models.IntegerField()
    current_amount = models.IntegerField()
    started_date = models.CharField(max_length=MAX_LENGTH)
    contributors = models.JSONField()
    end_date = models.CharField(max_length=MAX_LENGTH)
    ongoing = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.title
    
    class Meta:
        ordering = ['-end_date', 'title']

class Donation(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    contributors = models.JSONField()
    amount = models.IntegerField()
    date_contributed = models.CharField(max_length=MAX_LENGTH)

    def __str__(self):
        return (self.contributors, self.amount) 
    
    class Meta:
        ordering = ['date_contributed']

class Volunteering(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    volunteers = models.JSONField()
    title = models.CharField(max_length=MAX_LENGTH)
    description = models.TextField
    start_date = models.CharField(max_length=MAX_LENGTH)
    end_date = models.CharField(max_length=MAX_LENGTH)
    ongoing = models.BooleanField(default=False)

    def __str__(self):
            return self.title
    class Meta:
        ordering = ['-end_date', 'title']

class Event(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=MAX_LENGTH)
    description = models.TextField()
    type = models.CharField(max_length=MAX_LENGTH)
    participants = models.JSONField()
    start_date = models.CharField(max_length=MAX_LENGTH)
    end_date = models.CharField(max_length=MAX_LENGTH)
    ongoing = models.BooleanField(default=False)
    images = models.ImageField(upload_to='events')
    videos = models.FileField(upload_to='events')
    docs = models.FileField(upload_to='events')
    ongoing = models.BooleanField(default=False)

    def __str__(self):
        return self.title
    class Meta:
        ordering = ['-end_date', 'title']

class Payments(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    amount = models.IntegerField()
    date_paid = models.CharField(max_length=MAX_LENGTH)
    contributor = models.CharField(max_length=MAX_LENGTH)
    reason = models.CharField(max_length=MAX_LENGTH)
    details = models.TextField()
    image = models.ImageField(upload_to='payments_receipts')

    def __str__(self) -> str:
        return self.contributor+f' ({self.amount}) '+ self.reason
    class Meta:
        ordering = ['-date_paid', 'contributor', 'amount']

class Logs(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.CharField(max_length=MAX_LENGTH)
    action = models.CharField(max_length=MAX_LENGTH)
    date_created = models.CharField(max_length=MAX_LENGTH)
    details = models.TextField()

    def __str__(self) -> str:
        return self.user+f' ({self.action}) '+ self.date_created
    class Meta:
        ordering = ['-date_created', 'user', 'action']




