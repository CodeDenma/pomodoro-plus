# Generated by Django 4.1.5 on 2023-02-05 07:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='setting',
            name='cycle',
            field=models.IntegerField(default=4),
        ),
        migrations.AddField(
            model_name='setting',
            name='focus',
            field=models.IntegerField(default=25),
        ),
        migrations.AddField(
            model_name='setting',
            name='long_break',
            field=models.IntegerField(default=15),
        ),
        migrations.AddField(
            model_name='setting',
            name='short_break',
            field=models.IntegerField(default=5),
        ),
    ]
