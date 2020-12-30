from django.db.models import Q, Prefetch
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Workspace, Room
from .serializers import (
    WorkspaceCreateSerializer,
    WorkspaceSerializer,
    RoomCreateSerializer,
    RoomSerializer,
    WorkspaceDetailSerializer, MessageSerializer, RoomDetailSerializer
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
                # Q(is_private=False) & Q(password=None) |
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

        # if rooms := data.get('rooms'):
        #     current_room = rooms[0]
        #     current_room_obj = Room.objects.get(code=current_room.get('code'))
        #     data['current_room'] = RoomDetailSerializer(current_room_obj).data
        # else:
        #     data['current_room'] = None

        data['is_owner'] = ret_workspace.is_owner(request.user)

        return Response(data, status=status.HTTP_200_OK)


class RoomDetailView(APIView):
    def get(self, request, workspace_code, room_code):
        room = Room.objects.filter(code=room_code, workspace__code=workspace_code)
        if room.exists():
            room = room[0]
            if room.user_has_access(request.user):
                data = RoomDetailSerializer(room).data

                data['messages'] = MessageSerializer(room.last_n_messages(n=30), many=True).data
                data['is_owner'] = room.is_owner(request.user)
                return Response(data, status=status.HTTP_200_OK)

        return Response(
            {'error': 'You do not have access to this room or such room does not exist'},
            status=status.HTTP_403_FORBIDDEN
        )


class RoomCreateView(APIView):
    serializer_class = RoomCreateSerializer

    def post(self, request, workspace_code):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            name = serializer.validated_data.pop('name', None)
            new_name = name
            workspace = request.user.workspace_set.filter(code=workspace_code)

            # Verify that the user is a member of the workspace where they want to create the room
            if not workspace:
                return Response(
                    {'workspace': 'You cannot create a room for that workspace.'},
                    status=status.HTTP_404_NOT_FOUND
                )
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


class RoomWithPasswordView(APIView):
    """API View for verifying if a user has access to the password-protected room with given code"""

    def get(self, request, room_code):
        """
            Check if user has access to a given room, if not return 403 response.
        """
        room = Room.objects.filter(code=room_code)
        if not room.exists():
            return Response({'room': 'Room with given code does not exist'}, status=status.HTTP_404_NOT_FOUND)

        room_obj = room[0]

        if room_obj.user_has_access(request.user):
            return Response({'room': 'User is already a member of this room.'}, status=status.HTTP_200_OK)

        return Response({'room': 'The user has no access to this room.'}, status=status.HTTP_403_FORBIDDEN)

    def post(self, request, room_code):
        """
            Check if password provided by user is correct
        """
        room = Room.objects.filter(code=room_code)
        if not room.exists():
            return Response({'room': 'Room with given code does not exist'}, status=status.HTTP_404_NOT_FOUND)

        room_obj = room[0]
        if room_obj.is_private:
            # Private rooms can be only accessed by invitation from the room owner
            return Response({'room': 'You are not allowed to join this room.'}, status=status.HTTP_403_FORBIDDEN)

        if room_obj.user_has_access(request.user):
            return Response({'room': 'User already has access to this room.'}, status=status.HTTP_200_OK)

        room_password = request.data.get('password')
        if room_obj.password != room_password:
            raise ValidationError({'room': 'Password is incorrect'})
        room_obj.users.add(request.user)

        return Response({'room': 'The user has joined the room successfully.'}, status=status.HTTP_200_OK)
