from django.urls import path, include

from .views import WorkspaceCreateView, RoomCreateView, WorkspaceListView, WorkspaceDetailView

urlpatterns = [
    # POST
    path('create/', WorkspaceCreateView.as_view()),
    path('<slug:workspace_slug>/create/', RoomCreateView.as_view()),

    # GET
    path('list/', WorkspaceListView.as_view()),
    path('<slug:workspace_slug>/', WorkspaceDetailView.as_view()),
    # path('<slug:workspace_slug>/<slug:room_slug>/', RoomView.as_view()),
]
