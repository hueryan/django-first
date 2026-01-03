from django.shortcuts import redirect
from django.core.cache import cache
import requests

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
    # print(access_token_res)

    return redirect('index')  # 返回 game/urls/index.py 中index
