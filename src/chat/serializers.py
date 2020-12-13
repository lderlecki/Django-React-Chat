from rest_framework import serializers

from .models import Workspace


class WorkspaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workspace
        fields = ('name', 'owner', 'private', 'users', )


class WorkspaceCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workspace
        fields = ('name', 'private', 'password', )
        extra_kwargs = {'password': {'write_only': True}}
