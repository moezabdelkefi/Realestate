from rest_framework import serializers
from .models import temoignages

class temoignagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = temoignages
        fields = '__all__'