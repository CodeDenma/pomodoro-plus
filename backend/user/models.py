from django.db import models

class User(models.Model):
    username = models.CharField(max_length=30)
    password = models.CharField(max_length=256)

class Setting(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    focus = models.IntegerField(default=25)
    short_break = models.IntegerField(default=5)
    long_break = models.IntegerField(default=15)
    cycle = models.IntegerField(default=4)