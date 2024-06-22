# bonds/serializers.py
from rest_framework import serializers
from .models import Bonds, UserB

class UserBSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserB
        fields = '__all__' 

class BondSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bonds
        fields = '__all__' 
        #read_only_fields = ['seller', 'buyer']


