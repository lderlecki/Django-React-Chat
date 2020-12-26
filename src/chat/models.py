import string
import random

from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()


def get_random_workspace_id():
    length = 11
    alphabet = string.ascii_uppercase + string.digits
    while True:
        code = ''.join(random.choices(alphabet, k=length))
        if not Workspace.objects.filter(code=code).exists():
            break
    return code


def get_random_room_id():
    length = 11
    alphabet = string.ascii_uppercase + string.digits
    while True:
        code = ''.join(random.choices(alphabet, k=length))
        if not Room.objects.filter(code=code).exists():
            break
    return code


class CommonInfo(models.Model):
    name = models.CharField(max_length=50)
    host = models.ForeignKey('accounts.User', on_delete=models.CASCADE, blank=True)
    is_private = models.BooleanField(default=False)
    password = models.CharField(blank=True, null=True, max_length=20)
    date_created = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True

    def is_owner(self, user):
        return self.host == user


class Workspace(CommonInfo):
    """
        Workspace model, where user can create rooms.
        If the is_private field is True, the workspace can be only accessed by invitation from workspace host
    """
    users = models.ManyToManyField('accounts.User', blank=True, related_name='workspaces')
    code = models.CharField(max_length=11, default=get_random_workspace_id, unique=True)

    def __str__(self):
        return self.name


class Room(CommonInfo):
    users = models.ManyToManyField('accounts.User', blank=True, related_name='rooms')
    workspace = models.ForeignKey('Workspace', on_delete=models.CASCADE)
    code = models.CharField(max_length=11, default=get_random_room_id, unique=True)

    def __str__(self):
        return f'{self.workspace} {self.name}'

    def has_room_access(self, user):
        return (not self.is_private and self.password == "") or self.users.filter(email=user.email) or self.host == user

    def last_n_messages(self, n=10):
        return self.messages.all()[:n]


class Message(models.Model):
    content = models.TextField(blank=False, null=False)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='messages')
    timestamp = models.DateTimeField(auto_now_add=True)

