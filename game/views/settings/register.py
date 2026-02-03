from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from game.models.player.player import Player

class PlayerVies(APIView):
    def post(self, request):
        data = request.POST
        username = data.get("username", "").strip()
        password = data.get("password", "").strip()
        password_confirm = data.get("password_confirm", "").strip()
        if not username or not password:
            return Response({
                "result": "用户名和密码不能为空",
            })
        if User.objects.filter(username=username).exists():
            return Response({
                "result": "用户名已存在"
            })

        if password != password_confirm:
            return Response({
                "result": "两个密码不一致"
            })

        user = User(username=username)
        user.set_password(password)
        user.save()
        Player.objects.create(user=user, photo="https://c-ssl.duitang.com/uploads/item/201605/29/20160529100121_SBKkC.thumb.1000_0.jpeg")
        return Response({
            "result": "success"
        })
