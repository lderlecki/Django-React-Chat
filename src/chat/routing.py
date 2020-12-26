from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r'workspace/(?P<workspace_code>[-\w]+)/(?P<room_code>[-\w]+)/$', consumers.ChatConsumer),
]
