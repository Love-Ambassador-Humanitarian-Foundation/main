"""Copyright (c) 2024 Esther Onyenoro

This software is licensed under [Proprietary License].
You may not modify, copy, or distribute this software without permission.
For more details, see the LICENSE file in the root of the repository."""

# Generated by Django 4.2.15 on 2024-09-02 01:03

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='NewsletterReceipients',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('email', models.EmailField(max_length=2555, unique=True)),
                ('joined_at', models.DateField()),
            ],
            options={
                'ordering': ['-joined_at'],
            },
        ),
        migrations.DeleteModel(
            name='Email',
        ),
        migrations.RemoveField(
            model_name='newsletter',
            name='recipients',
        ),
        migrations.AlterField(
            model_name='newsletter',
            name='created_at',
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(max_length=2555, unique=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='facebook',
            field=models.CharField(blank=True, max_length=2555, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='firstname',
            field=models.CharField(max_length=2555),
        ),
        migrations.AlterField(
            model_name='user',
            name='instagram',
            field=models.CharField(blank=True, max_length=2555, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='lastname',
            field=models.CharField(max_length=2555),
        ),
        migrations.AlterField(
            model_name='user',
            name='linkedIn',
            field=models.CharField(blank=True, max_length=2555, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='numberpre',
            field=models.CharField(blank=True, max_length=2555, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='twitter',
            field=models.CharField(blank=True, max_length=2555, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='whatsapp',
            field=models.CharField(blank=True, max_length=2555, null=True),
        ),
        migrations.AddField(
            model_name='newsletterreceipients',
            name='newsletter',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='receipients', to='api.newsletter'),
        ),
    ]