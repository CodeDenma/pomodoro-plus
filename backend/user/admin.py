from django.contrib import admin
from . models import User, Setting

# Register your models here.
admin.site.register(User)
admin.site.register(Setting)