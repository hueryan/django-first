from channels.generic.websocket import AsyncWebsocketConsumer
import json
from django.conf import settings
from django.core.cache import cache

class MultiPlayer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

    async def disconnect(self, close_code):
        # print('disconnect')
        await self.channel_layer.group_discard(self.room_name, self.channel_name)

    async def create_player(self, data):
        self.room_name = None

        start = 0
        # if data['username'] != "hujing":  # 不是该用户则start从10000开始
        #     start = 10000

        for i in range(start, 1000000000):  # 枚举房间
            name = "room-%d" % (i)
            if not cache.has_key(name) or len(cache.get(name)) < settings.ROOM_CAPACITY:
                self.room_name = name
                break

        if not self.room_name:
            return


        if not cache.has_key(self.room_name):
            cache.set(self.room_name, [], 3600)  # 有效期 1h

        for player in cache.get(self.room_name):  # 遍历所有玩家，向本地发送当前已有玩家信息
            await self.send(text_data=json.dumps({  # dumps 将字典变换成字符串
                "event": "create_player",
                "uuid": player['uuid'],
                'username': player['username'],
                'photo': player['photo'],
            }))

        await self.channel_layer.group_add(self.room_name, self.channel_name)

        players = cache.get(self.room_name)
        players.append({  # 将玩家加入redis中
            'uuid': data['uuid'],
            'username': data['username'],
            'photo': data['photo'],
        })
        cache.set(self.room_name, players, 3600)  # 有效期 1h
        await self.channel_layer.group_send( # 群发消息
            self.room_name,
            {
                'type': 'group_send_event',  # 将消息发送给组内所有人,type内容即为下面的函数名
                'event': 'create_player',
                'uuid': data['uuid'],
                'username': data['username'],
                'photo': data['photo'],
            }
        )
    async def group_send_event(self, data):  # 每个请求接收到连接,发送给前端
        await self.send(text_data=json.dumps(data))

    async def move_to(self, data):
        await self.channel_layer.group_send(self.room_name, {
            'type': 'group_send_event',
            'event': 'move_to',
            'uuid': data['uuid'],
            'tx': data['tx'],
            'ty': data['ty'],
        })

    async def shoot_fireball(self, data):
        await self.channel_layer.group_send( self.room_name, {
            'type': 'group_send_event',
            'event': 'shoot_fireball',
            'uuid': data['uuid'],
            'tx': data['tx'],
            'ty': data['ty'],
            'ball_uuid': data['ball_uuid'],
        })

    async def attack(self, data):
        await self.channel_layer.group_send( self.room_name, {
            'type': 'group_send_event',
            'event': 'attack',
            'uuid': data['uuid'],
            'attackee_uuid': data['attackee_uuid'],
            'x': data['x'],
            'y': data['y'],
            'angle': data['angle'],
            'damage': data['damage'],
            'ball_uuid': data['ball_uuid'],
        })

    async def blink(self, data):
        await self.channel_layer.group_send( self.room_name, {
            'type': 'group_send_event',
            'event': 'blink',
            'uuid': data['uuid'],
            'tx': data['tx'],
            'ty': data['ty'],
        })

    async def receive(self, text_data):  # 加路由
        data = json.loads(text_data)
        event = data['event']
        if event == 'create_player':
            await self.create_player(data)
        elif event == 'move_to':
            await self.move_to(data)
        elif event == 'shoot_fireball':
            await self.shoot_fireball(data)
        elif event == 'attack':
            await self.attack(data)
        elif event == 'blink':
            await self.blink(data)
