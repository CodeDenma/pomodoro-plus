from django.urls import path, include
from . import views

import debug_toolbar

urlpatterns = [
    path('', views.index, name='index'),
    path('<int:user_id>/', views.detail, name='detail'),
    path('__debug__/', include('debug_toolbar.urls', namespace='user_debug')),
]
