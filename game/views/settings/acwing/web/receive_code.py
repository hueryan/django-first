from django.shortcuts import redirect, reverse
from django.core.cache import cache
import requests
from django.contrib.auth.models import User
from game.models.player.player import Player
from random import randint
from rest_framework_simplejwt.tokens import RefreshToken


def receive_code(request):
    data = request.GET
    code = data.get('code')
    state = data.get('state')  # 获取回调函数的两个值
    # print(code, state)

    if not cache.has_key(state):  # apply_code 构造的state，存储在redis中，如果不存在则过滤
        return redirect('index')

    cache.delete(state)  # 授权之后删除

    apply_access_token_url = "https://www.acwing.com/third_party/api/oauth2/access_token/"
    params = {
        'appid': "3749",
        'secret': "83915e8e8f864e92806ad1e5e89af16f",
        'code': code,
    }

    access_token_res = requests.get(apply_access_token_url, params=params).json()
    access_token = access_token_res['access_token']
    openid = access_token_res['openid']
    # print(access_token_res)

    players = Player.objects.filter(openid=openid)
    if players.exists():  # 如果该用户已存在，则无需重新获取信息，直接登录即可
        refresh = RefreshToken.for_user(players[0].user)
        return redirect(reverse('index') + "?access=%s&refresh=%s" % (str(refresh.access_token), str(refresh)))

    get_userinfo_url = "https://www.acwing.com/third_party/api/meta/identity/getinfo/"
    params = {
        'access_token': access_token,
        'openid': openid,
    }
    userinfo_res = requests.get(get_userinfo_url, params=params).json()
    username = userinfo_res['username']
    photo = userinfo_res['photo']

    while User.objects.filter(username=username).exists():  # 找到一个新用户名
        username += str(randint(0, 9))

    user = User.objects.create(username=username)
    player = Player.objects.create(user=user, photo=photo, openid=openid)  # 新建用户

    refresh = RefreshToken.for_user(user)
    return redirect(reverse('index') + "?access=%s&refresh=%s" % (str(refresh.access_token), str(refresh)))

