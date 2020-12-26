from django.urls import path, include

from .views import (
    WorkspaceCreateView,
    RoomCreateView,
    WorkspaceListView,
    WorkspaceDetailView,
    RoomDetailView,
)

urlpatterns = [
    # POST
    path('create/', WorkspaceCreateView.as_view()),
    path('<str:workspace_code>/create/', RoomCreateView.as_view()),

    # GET
    path('list/', WorkspaceListView.as_view()),
    path('<str:workspace_code>/', WorkspaceDetailView.as_view()),
    path('<str:workspace_code>/<str:room_code>/', RoomDetailView.as_view()),
]
