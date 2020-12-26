from django.db.models import Q
from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import Workspace, Room, Message

User = get_user_model()


class WorkspaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workspace
        fields = ('name', 'host', 'is_private', 'users', 'code')


class WorkspaceCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workspace
        fields = ('name', 'is_private', 'password')
        extra_kwargs = {'password': {'write_only': True}}


class RoomMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'name', 'last_login')


class RoomSerializer(serializers.ModelSerializer):
    users = RoomMemberSerializer(required=False, many=True)
    host = RoomMemberSerializer()

    class Meta:
        model = Room
        fields = ('name', 'host', 'is_private', 'users', 'code')


class MessageSerializer(serializers.ModelSerializer):
    author = RoomMemberSerializer()

    class Meta:
        model = Message
        fields = ('content', 'timestamp', 'author')


class RoomDetailSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(required=False, many=True)
    users = RoomMemberSerializer(required=False, many=True)
    host = RoomMemberSerializer()

    class Meta:
        model = Room
        fields = ('name', 'host', 'is_private', 'users', 'code', 'messages')


class RoomCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('name', 'is_private', 'password')
        extra_kwargs = {'password': {'write_only': True}}


class WorkspaceDetailSerializer(serializers.ModelSerializer):
    rooms = RoomSerializer(source='room_set', many=True)

    class Meta:
        model = Workspace
        fields = ('name', 'host', 'is_private', 'rooms', 'code')


