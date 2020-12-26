from channels.generic.websocket import AsyncJsonWebsocketConsumer
import json


class ChatConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        self.user = self.scope['user']

        if self.user.is_anonymous:
            print('anonymous user want to connect')
            await self.close()
        else:
            self.workspace_code = self.scope["url_route"]["kwargs"]["workspace_code"]
            self.room_code = self.scope["url_route"]["kwargs"]["room_code"]

            await self.accept()

    def disconnect(self, code):
        pass

    async def receive_json(self, content, **kwargs):
        pass
