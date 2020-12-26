from django.contrib import admin
from .models import Workspace, Room, Message

admin.site.register(Workspace)
admin.site.register(Room)


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    fields = (
        'id', 'content', 'author', 'room', 'timestamp'
    )
    list_display = (
        'id', 'content', 'author', 'room', 'timestamp'
    )

    list_filter = (
        'author', 'room'
    )

    readonly_fields = (
        'id', 'timestamp'
    )
