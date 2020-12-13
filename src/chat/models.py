from django.db import models
from django.contrib.auth import get_user_model
from django.utils.text import slugify
User = get_user_model()


class Workspace(models.Model):
    name = models.CharField(max_length=50)
    slug = models.SlugField(blank=True)
    # users = models.ManyToManyField(User, blank=True)
    host = models.ForeignKey(User, on_delete=models.CASCADE)
    private = models.BooleanField(default=False)
    password = models.CharField(blank=True, null=True, max_length=20)
    date_created = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(Workspace, self).save(*args, **kwargs)

    def __str__(self):
        return self.name

