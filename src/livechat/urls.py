from django.contrib import admin
from django.urls import path, include, re_path

urlpatterns = [
    path('api/admin/', admin.site.urls),
    path('api/workspace/', include('chat.urls')),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),

    path('', include('frontend.urls')),

]
