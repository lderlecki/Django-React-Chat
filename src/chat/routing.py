from django.urls import re_path
from .consumers import ChatConsumer

websocket_urlpatterns = [
    re_path(r'^ws/workspace/(?P<workspace_code>[-\w]+)/(?P<room_code>[-\w]+)/$', ChatConsumer.as_asgi()),
]
