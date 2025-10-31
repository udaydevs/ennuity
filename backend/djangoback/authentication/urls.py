from django.urls import path
from . import views
from .views import get_csrf_token, SignIn

urlpatterns = [
    path("csrf/", views.get_csrf_token, name="get_csrf_token"),
    path('SignUp/', views.SignUp),
    path('SignIn/', views.SignIn),
    path('SignOut/', views.SignOut),
]