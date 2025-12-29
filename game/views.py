from django.http import HttpResponse

def index(request):
    line1 = '<h1 style="text-align: center">术士之战</h1>'
    line4 = '<a href="/play/">进入游戏界面</a>'
    line3 = '<hr>'
    line2 = '<img src="https://forum.robloxdev.cn/uploads/default/original/2X/7/77a219b1942ad770fbd8e7191eb80411ae431794.jpeg" width="1500">'
    return HttpResponse(line1 + line4 + line3 + line2)

def play(request):
    line1 = '<h1 style="text-align: center">游戏界面</h1>'
    line3 = '<a href="/">返回菜单页面</a>'
    line2 = '<img src="https://ts2.tc.mm.bing.net/th/id/OIP-C.anzpSLymlAHhWcZI3PIhdgHaEr?rs=1&pid=ImgDetMain&o=7&rm=3" width="1500">'

    return HttpResponse(line1 + line3 + line2)
