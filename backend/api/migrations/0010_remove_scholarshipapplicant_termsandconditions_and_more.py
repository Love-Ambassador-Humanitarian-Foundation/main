"""Copyright (c) 2024 Esther Onyenoro

This software is licensed under [Proprietary License].
You may not modify, copy, or distribute this software without permission.
For more details, see the LICENSE file in the root of the repository."""

# Generated by Django 4.2.15 on 2024-09-10 13:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_remove_about_achievements_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='scholarshipapplicant',
            name='termsandconditions',
        ),
        migrations.AddField(
            model_name='scholarship',
            name='termsandconditions',
            field=models.CharField(default='Orphans and Children of the widows will be prioritized, Also the less priviledged children will be prioritized.', max_length=2555),
        ),
    ]