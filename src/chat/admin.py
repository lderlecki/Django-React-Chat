from django.contrib import admin
from .models import Workspace, Room, Message


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


class RoomInline(admin.TabularInline):
    model = Room


@admin.register(Workspace)
class WorkspaceAdmin(admin.ModelAdmin):
    model = Workspace
    inlines = (RoomInline, )
    fields = (
        'id', 'code', 'name', 'host', 'is_private', 'date_created', 'password', 'users'
    )

    list_display = (
        'id', 'code', 'name', 'host', 'is_private', 'get_room_count', 'date_created',
    )

    list_filter = (
        'host', 'name', 'is_private',
    )

    search_fields = (
        'name', 'host__email', 'room__name',
    )

    readonly_fields = (
        'id', 'date_created'
    )

    def get_room_count(self, obj):
        return obj.room_set.count()

    get_room_count.short_description = 'Rooms count'


@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    fields = (
        'id', 'code', 'workspace', 'name', 'host', 'is_private', 'date_created', 'password', 'users'
    )

    list_filter = (
        'host', 'name', 'is_private',
    )

    readonly_fields = (
        'id', 'date_created'
    )

    def get_workspace_code(self, obj):
        return obj.workspace.code

    get_workspace_code.short_description = 'Workspace'

    list_display = (
        'id', 'code', 'get_workspace_code', 'name', 'host', 'is_private', 'date_created',
    )
