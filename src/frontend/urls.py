from django.conf.urls import url
from django.urls import path

from .views import index

urlpatterns = [
    url(r'', index),
    url(r'login', index),
    url(r'signup', index),
    url(r'reset-password', index),
    url(r'password/reset/confirm/:uid/:token', index),
    url(r'activate/:uid/:token', index),
    url(r'workspaces', index),
    url(r'workspaces/create', index),
    url(r':workspace', index),
    url(r':workspace/create', index),
    url(r':workspace/:room', index),
]
