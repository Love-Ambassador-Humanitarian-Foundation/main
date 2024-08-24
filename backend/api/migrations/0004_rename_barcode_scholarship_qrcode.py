"""Copyright (c) 2024 Esther Onyenoro

This software is licensed under [Proprietary License].
You may not modify, copy, or distribute this software without permission.
For more details, see the LICENSE file in the root of the repository."""

# Generated by Django 4.2.15 on 2024-08-24 07:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_scholarship_organisation_approved'),
    ]

    operations = [
        migrations.RenameField(
            model_name='scholarship',
            old_name='barcode',
            new_name='qrcode',
        ),
    ]