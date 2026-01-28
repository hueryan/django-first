# django project start
## 游戏介绍
- `右键`移动
- `Q + 左键` 发射火球攻击
- `F + 左键` 闪现
- `Enter` 开始聊天
- `ESC` 关闭聊天框

## 项目运行
配置DJANGO_HOST
```shell
DJANGO_HOST = "xxx.xxx.xxx.xxx"  # 公网 IP
```

启动服务
```shell
sudo /etc/init.d/nginx start
sudo redis-server /etc/redis/redis.conf
uwsgi --ini ~/app/scripts/uwsgi.ini
daphne -b 0.0.0.0 -p 5015 app.asgi:application
```

### 清空 redis 脚本
```shell
cd ~/app/
python3 manage.py shell  # 打开django-shell
```
```python
# 清空 redis
from django.core.cache import cache
def clear():
    for key in cache.keys('*'):
        cache.delete(key) 
```