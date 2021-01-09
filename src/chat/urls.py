from django.urls import path, include

from .views import (
    WorkspaceCreateView,
    RoomCreateView,
    UserWorkspaceListView,
    WorkspaceDetailView,
    RoomDetailView,
    RoomWithPasswordView,
    WorkspaceSearchAPIView,
    WorkspaceJoinView,
)

urlpatterns = [
    path('create/', WorkspaceCreateView.as_view()),
    path('<str:workspace_code>/create/', RoomCreateView.as_view()),

    path('list/', UserWorkspaceListView.as_view()),
    path('<str:workspace_code>/', WorkspaceDetailView.as_view()),
    path('<str:workspace_code>/join/', WorkspaceJoinView.as_view()),
    path('room/<str:room_code>/verify/', RoomWithPasswordView.as_view()),
    path('<str:workspace_code>/<str:room_code>/', RoomDetailView.as_view()),

    # Search urls
    path('', WorkspaceSearchAPIView.as_view())
]
