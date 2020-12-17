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
        workspace = request.user.workspace_set.all()
        if not workspace.exists():
            return Response({'workspace': 'No workspaces available.'}, status=status.HTTP_200_OK)
        return Response(WorkspaceSerializer(workspace, many=True).data, status=status.HTTP_200_OK)


class WorkspaceDetailView(APIView):
    def get(self, request, workspace_code):
        workspace = request.user.workspace_set.get(code=workspace_code)
        if not workspace:
            return Response({'workspace': 'Such workspace does not exist.'}, status=status.HTTP_404_NOT_FOUND)

        ret_data = WorkspaceDetailSerializer(workspace).data
        ret_data['is_owner'] = request.user == workspace.host

        return Response(WorkspaceDetailSerializer(workspace).data, status=status.HTTP_200_OK)


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
