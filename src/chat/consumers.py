from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncJsonWebsocketConsumer
import json

from .models import Message, Room
from .serializers import MessageSerializer


class ChatConsumer(AsyncJsonWebsocketConsumer):

    async def _get_message_data(self, message):
        return MessageSerializer(message).data

    async def connect(self):
        self.user = self.scope['user']
        self.workspace_code = self.scope["url_route"]["kwargs"]["workspace_code"]
        self.room_code = self.scope["url_route"]["kwargs"]["room_code"]

        if self.user.is_anonymous or not self.workspace_code or not self.room_code:
            # Allow only authenticated users to connect
            await self.close()
        else:
            self.room_group_name = f'room_{self.room_code}'
            # Todo: Check if user has access to the given room, if not disconnect
            await self.channel_layer.group_add(self.room_group_name, self.channel_name)
            await self.accept()

    async def disconnect(self, code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive_json(self, text_data=None, **kwargs):
        command = text_data['command']
        message = text_data.get('message')
        await self.commands[command](self, message)

    async def new_message(self, data):
        def create_message(data):
            room = Room.objects.filter(workspace__code=self.workspace_code, code=self.room_code)[0]
            msg = Message.objects.create(author=self.user, content=data, room=room)
            return msg

        message = await database_sync_to_async(create_message)(data)
        message_data = await self._get_message_data(message)
        await self.channel_layer.group_send(self.room_group_name, {
            'type': 'chat_message',
            'message': message_data
        })

    async def chat_message(self, event):
        content = {
            'command': 'new_message',
            'message': event['message']
        }
        await self.send_json(content)

    commands = {
        'new_message': new_message
    }
