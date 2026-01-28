# django project start
## 游戏介绍
- `右键`移动
- `Q + 左键` 发射火球攻击
- `F + 左键` 闪现
- `Enter` 开始聊天
- `ESC` 关闭聊天框

## 项目运行
```shell
mv django-first app
```
在`~/app/app/settings.env` 配置DJANGO_HOST
```shell
DJANGO_HOST = "xxx.xxx.xxx.xxx"  # 公网 IP
```
同时配置自己的域名，可以在项目中替换以下内容通过ag查找
`ag app3749.acapp.acwing.com.cn`
同时参考[该链接](https://github.com/hueryan/AcWing-class-study/blob/master/%E5%B7%A5%E7%A8%8B%E9%A1%B9%E7%9B%AE/Django%E6%A1%86%E6%9E%B6/5.%20%E9%83%A8%E7%BD%B2nginx%E4%B8%8E%E5%AF%B9%E6%8E%A5acapp.md)配置nginx等


启动服务
```shell
cd ~/app
mkdir ~/app/game/static/js/dist
python3 manage.py migrate  # 创建db.sqlite3
python3 manage.py createsuperuser  # 如果需要重新创建管理员
python3 ~/app/manage.py makemigrations  # 数据表定义更新之后
python3 ~/app/manage.py migrate  # 数据表定义更新之后, 此时自定义的表被应用到数据库中


./scripts/compress_game_js.sh
sudo /etc/init.d/nginx start
sudo redis-server /etc/redis/redis.conf
uwsgi --ini ~/app/scripts/uwsgi.ini
daphne -b 0.0.0.0 -p 5015 app.asgi:application
```

### 清空 redis 脚本
```shell
cd ~/app
python3 manage.py shell  # 打开django-shell
```
```python
# 清空 redis
from django.core.cache import cache
def clear():
    for key in cache.keys('*'):
        cache.delete(key) 
```