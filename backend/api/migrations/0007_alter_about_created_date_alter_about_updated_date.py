"""Copyright (c) 2024 Esther Onyenoro

This software is licensed under [Proprietary License].
You may not modify, copy, or distribute this software without permission.
For more details, see the LICENSE file in the root of the repository."""

# Generated by Django 4.2.15 on 2024-09-08 02:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_alter_newsletterreceipients_joined_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='about',
            name='created_date',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='about',
            name='updated_date',
            field=models.DateTimeField(auto_now=True),
        ),
    ]