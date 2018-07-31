from django.urls import path

from . import views

app_name = 'polls'
urlpatterns = [
    path('', views.index, name='index'),
    path('load_current_text/', views.load_current_text, name='load_current_text'),
    path('process_text/', views.process_text, name='process_text'),
    path('get_similarity/', views.get_similarity, name='get_similarity'),
]
