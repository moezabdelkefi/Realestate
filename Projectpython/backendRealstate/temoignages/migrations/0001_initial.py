# Generated by Django 4.1.13 on 2024-03-15 14:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('userAuth', '0006_alter_user_password_alter_user_phone'),
    ]

    operations = [
        migrations.CreateModel(
            name='Temoignage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('contenu', models.TextField()),
                ('note', models.IntegerField()),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='userAuth.user')),
            ],
        ),
    ]
