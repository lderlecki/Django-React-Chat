from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Workspace
from .serializers import WorkspaceCreateSerializer, WorkspaceSerializer


# Create your views here.
class WorkspaceCreateView(APIView):
    serializer_class = WorkspaceCreateSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            name = serializer.validated_data.get('name')
            private = serializer.validated_data.get('private')
            password = serializer.validated_data.get('password')
            queryset = Workspace.objects.filter(host=request.user, name=name)

            if queryset.exists():
                workspace = queryset.first()
                workspace.private = private
                workspace.password = password
                workspace.save(update_fields=['private', 'password'])
                return Response(WorkspaceSerializer(workspace).data, status=status.HTTP_200_OK)

            workspace = Workspace.objects.create(**serializer.validated_data, host=request.user)
            return Response(WorkspaceSerializer(workspace).data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
