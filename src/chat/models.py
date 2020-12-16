from django.db import models
from django.contrib.auth import get_user_model
from django.utils.text import slugify
User = get_user_model()


class CommonInfo(models.Model):
    name = models.CharField(max_length=50)
    slug = models.SlugField(blank=True)
    host = models.ForeignKey('accounts.User', on_delete=models.CASCADE, blank=True)
    is_private = models.BooleanField(default=False)
    password = models.CharField(blank=True, null=True, max_length=20)
    date_created = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(CommonInfo, self).save(*args, **kwargs)


class Workspace(CommonInfo):
    """
        Workspace model, where user can create rooms.
        If the is_private field is True, the workspace can be only accessed by invitation from workspace host
    """
    users = models.ManyToManyField('accounts.User', blank=True, related_name='workspace_members')

    def __str__(self):
        return self.name


class Room(CommonInfo):
    users = models.ManyToManyField('accounts.User', blank=True, related_name='room_members')
    workspace = models.ForeignKey('Workspace', on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.workspace} {self.name}'

    def user_has_room_access(self, user):
        return (not self.is_private and self.password == "") or self.users.filter(email=user.email) or self.host == user

