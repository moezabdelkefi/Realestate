# Generated by Django 4.1.13 on 2024-03-06 09:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userAuth', '0005_alter_role_name_alter_user_email_alter_user_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='password',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='user',
            name='phone',
            field=models.CharField(max_length=20),
        ),
    ]
