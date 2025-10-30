from django.urls import path
from . import views

urlpatterns = [
    path('SignUp/', views.SignUp),
    path('SignIn/', views.SignIn),
    path('SignOut/', views.SignOut),
]