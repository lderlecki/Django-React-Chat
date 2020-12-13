from djoser.serializers import UserCreateSerializer as DjoserUserSerializer
from django.contrib.auth import get_user_model
User = get_user_model()


class UserCreateSerializer(DjoserUserSerializer):
    class Meta(DjoserUserSerializer.Meta):
        fields = ('id', 'email', 'name', 'password')
