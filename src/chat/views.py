from django.db.models import Q, Prefetch
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Workspace, Room
from .serializers import (
    WorkspaceCreateSerializer,
    WorkspaceSerializer,
    RoomCreateSerializer,
    RoomSerializer,
    WorkspaceDetailSerializer
)


class WorkspaceCreateView(APIView):
    serializer_class = WorkspaceCreateSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            name = serializer.validated_data.get('name')
            host = serializer.validated_data.get('host')
            workspace = Workspace.objects.filter(host=request.user, name=name)

            if workspace.exists():
                if host and not workspace.get(host=request.user):
                    return Response(
                        {'host': 'Only current host can pass host to another user'}, status=status.HTTP_403_FORBIDDEN
                    )
                workspace.update(**serializer.validated_data)
                return Response(WorkspaceSerializer(workspace[0]).data, status=status.HTTP_200_OK)

            workspace = Workspace.objects.create(**serializer.validated_data, host=request.user)
            return Response(WorkspaceSerializer(workspace).data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class WorkspaceListView(APIView):
    def get(self, request):
        # Check if request user is a member of a workspace with a given code
        workspaces = Workspace.objects.filter(
            Q(host=request.user) |
            Q(users=request.user)
        ).distinct().order_by("-date_created")
        if not workspaces.exists():
            return Response({'workspace': 'No workspaces available.'}, status=status.HTTP_200_OK)
        return Response(WorkspaceSerializer(workspaces, many=True).data, status=status.HTTP_200_OK)


class WorkspaceDetailView(APIView):
    def get(self, request, workspace_code):
        workspace = Workspace.objects.filter(code=workspace_code).prefetch_related(
            Prefetch('room_set', queryset=Room.objects.filter(
                Q(is_private=False) |
                Q(users=request.user) |
                Q(host=request.user),
                workspace__code=workspace_code,
            ))
        ).distinct()

        if not workspace.exists():
            return Response(
                {'room': 'There are no rooms you can enter in this workspace.'},
                status=status.HTTP_404_NOT_FOUND
            )
        ret_workspace = workspace[0]
        data = WorkspaceDetailSerializer(ret_workspace).data
        for room in data.get('rooms', []):
            host = room.get('host')
            room['is_owner'] = request.user.email == host.get('email') if host else False

        if data.get('rooms'):
            data['current_room'] = data.get('rooms')[0]
        else:
            data['current_room'] = None

        data['is_owner'] = ret_workspace.is_owner(request.user)

        return Response(data, status=status.HTTP_200_OK)


# class RoomView(APIView):
#     def get(self, request, workspace_code, room_code):
#         workspace = request.user.workspace_set.filter(code=workspace_code)
#         # rooms = workspace.


class RoomCreateView(APIView):
    serializer_class = RoomCreateSerializer

    def post(self, request, workspace_code):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            name = serializer.validated_data.pop('name', None)
            new_name = name
            workspace = request.user.workspace_set.filter(code=workspace_code)

            if not workspace:
                return Response({'workspace': 'Room must belong to a workspace.'}, status=status.HTTP_404_NOT_FOUND)
            room_workspace = workspace[0]
            rooms = Room.objects.filter(workspace=room_workspace, name=name)
            c = 0
            while rooms.exists():
                c += 1
                new_name = name + f' {c}'
                rooms = Room.objects.filter(workspace=room_workspace, name=new_name)
            name = new_name
            room = Room.objects.create(
                **serializer.validated_data, name=name, workspace=room_workspace, host=request.user
            )
            return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
