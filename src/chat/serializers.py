from rest_framework import serializers

from .models import Workspace, Room


class WorkspaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workspace
        fields = ('name', 'host', 'is_private', 'users', 'code')


class WorkspaceCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workspace
        fields = ('name', 'is_private', 'password')
        extra_kwargs = {'password': {'write_only': True}}


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('name', 'host', 'is_private', 'users', 'workspace', 'code')


class RoomCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('name', 'is_private', 'password')
        extra_kwargs = {'password': {'write_only': True}}


class WorkspaceDetailSerializer(serializers.ModelSerializer):
    rooms = RoomSerializer(source='room_set', many=True)

    class Meta:
        model = Workspace
        fields = ('name', 'host', 'is_private', 'users', 'rooms', 'code')
