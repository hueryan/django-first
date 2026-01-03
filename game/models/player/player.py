from django.db import models
from django.contrib.auth.models import User



class Player(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)  # 当user删掉的时候，和User关联的player一块删掉
    photo = models.URLField(max_length=256, blank=True)  # 增加头像属性
    openid = models.CharField(default='', max_length=50, blank=True, null=True)

    def __str__(self):
        return str(self.user)