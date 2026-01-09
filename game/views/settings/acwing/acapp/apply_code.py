from django.http import JsonResponse
from urllib.parse import quote  # 重新编码，替换特殊字符
from random import randint
from django.core.cache import cache

def get_state():  # 返回一个8位随机数
    res = ""
    for i in range(8):
        res += str(randint(0, 9))
    return res

def apply_code(request):
    appid = '3749'
    redirect_uri = quote("https://app3749.acapp.acwing.com.cn/settings/acwing/acapp/receive_code/")
    scope = 'userinfo'
    state = get_state()

    cache.set(state, True, 7200)  # 有效期2h


    return JsonResponse({
        'result': "success",
        'appid': appid,
        'redirect_uri': redirect_uri,
        'scope': scope,
        'state': state,
    })
