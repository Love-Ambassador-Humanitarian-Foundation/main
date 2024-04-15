# Generated by Django 5.0.4 on 2024-04-10 20:25

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='About',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('company_name', models.CharField(max_length=100000000000000)),
                ('story', models.TextField()),
                ('logo', models.ImageField(upload_to='about/')),
                ('phonenumber', models.CharField(max_length=100000000000000)),
                ('emailone', models.CharField(max_length=100000000000000)),
                ('emailtwo', models.CharField(max_length=100000000000000)),
                ('emailthree', models.CharField(max_length=100000000000000)),
                ('address', models.TextField()),
                ('mission', models.TextField()),
                ('values', models.TextField()),
                ('achievements', models.JSONField()),
                ('created_date', models.CharField(max_length=100000000000000)),
                ('updated_date', models.CharField(max_length=100000000000000)),
                ('branches', models.TextField()),
                ('policies', models.TextField()),
                ('socials', models.JSONField()),
            ],
        ),
        migrations.CreateModel(
            name='Donation',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('contributors', models.JSONField()),
                ('amount', models.IntegerField()),
                ('date_contributed', models.CharField(max_length=100000000000000)),
            ],
            options={
                'ordering': ['date_contributed'],
            },
        ),
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=100000000000000)),
                ('description', models.TextField()),
                ('type', models.CharField(max_length=100000000000000)),
                ('participants', models.JSONField()),
                ('start_date', models.CharField(max_length=100000000000000)),
                ('end_date', models.CharField(max_length=100000000000000)),
                ('images', models.ImageField(upload_to='events')),
                ('videos', models.FileField(upload_to='events')),
                ('docs', models.FileField(upload_to='events')),
                ('ongoing', models.BooleanField(default=False)),
            ],
            options={
                'ordering': ['-end_date', 'title'],
            },
        ),
        migrations.CreateModel(
            name='Fundraising',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=100000000000000)),
                ('target_amount', models.IntegerField()),
                ('current_amount', models.IntegerField()),
                ('started_date', models.CharField(max_length=100000000000000)),
                ('contributors', models.JSONField()),
                ('end_date', models.CharField(max_length=100000000000000)),
                ('ongoing', models.BooleanField(default=False)),
            ],
            options={
                'ordering': ['-end_date', 'title'],
            },
        ),
        migrations.CreateModel(
            name='Logs',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('user', models.CharField(max_length=100000000000000)),
                ('action', models.CharField(max_length=100000000000000)),
                ('date_created', models.CharField(max_length=100000000000000)),
                ('details', models.TextField()),
            ],
            options={
                'ordering': ['-date_created', 'user', 'action'],
            },
        ),
        migrations.CreateModel(
            name='Member',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('username', models.CharField(max_length=100000000000000)),
                ('password', models.CharField(max_length=100000000000000)),
                ('email', models.CharField(max_length=100000000000000)),
                ('firstname', models.CharField(max_length=100000000000000)),
                ('lastname', models.CharField(max_length=100000000000000)),
                ('is_admin', models.BooleanField(default=False)),
                ('is_active', models.BooleanField(default=False)),
                ('is_staff', models.BooleanField(default=False)),
                ('joined_date', models.CharField(max_length=100000000000000)),
                ('last_login', models.CharField(max_length=100000000000000)),
                ('position', models.CharField(max_length=100000000000000)),
            ],
            options={
                'ordering': ['-last_login', '-joined_date', 'firstname', 'lastname'],
            },
        ),
        migrations.CreateModel(
            name='Partners',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=100000000000000)),
                ('description', models.TextField()),
                ('logo', models.ImageField(upload_to='partners/')),
                ('link', models.CharField(max_length=100000000000000)),
                ('created_date', models.CharField(max_length=100000000000000)),
            ],
        ),
        migrations.CreateModel(
            name='Payments',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('amount', models.IntegerField()),
                ('date_paid', models.CharField(max_length=100000000000000)),
                ('contributor', models.CharField(max_length=100000000000000)),
                ('reason', models.CharField(max_length=100000000000000)),
                ('details', models.TextField()),
                ('image', models.ImageField(upload_to='payments_receipts')),
            ],
            options={
                'ordering': ['-date_paid', 'contributor', 'amount'],
            },
        ),
        migrations.CreateModel(
            name='Volunteering',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('volunteers', models.JSONField()),
                ('title', models.CharField(max_length=100000000000000)),
                ('start_date', models.CharField(max_length=100000000000000)),
                ('end_date', models.CharField(max_length=100000000000000)),
                ('ongoing', models.BooleanField(default=False)),
            ],
            options={
                'ordering': ['-end_date', 'title'],
            },
        ),
    ]
