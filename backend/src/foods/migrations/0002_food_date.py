# Generated by Django 3.0.3 on 2020-06-07 23:56

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('foods', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='food',
            name='date',
            field=models.DateTimeField(blank=True, default=datetime.datetime.now),
        ),
    ]