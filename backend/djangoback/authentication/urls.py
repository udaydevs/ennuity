from django.urls import path
from . import views
from .views import EmailTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path('api/SignIn/', EmailTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('SignUp/', views.SignUp),
    path('SignOut/', views.SignOut),
]
