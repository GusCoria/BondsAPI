from rest_framework import serializers
from .models import Task

class TaskSerial(serializers.ModelSerializer):
    class Meta:
        model = 'task'
        fields = ('id',)