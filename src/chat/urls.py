from django.urls import path, include

from .views import WorkspaceCreateView

urlpatterns = [
    path('create/', WorkspaceCreateView.as_view()),
]
