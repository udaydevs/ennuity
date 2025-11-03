from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import logout
from rest_framework.response import Response
from .serializers import SignUpSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import EmailTokenObtainPairSerializer
from rest_framework import status


@api_view(['POST'])
@permission_classes([AllowAny])
def SignUp(request):
    serializer = SignUpSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"msg": "User Created Successfully"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def SignOut(request):
    logout(request)
    return JsonResponse({"msg": "Logged Out"}, status=status.HTTP_200_OK)


class EmailTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        if request.user and request.user.is_authenticated:
            return Response({"msg": "Already logged in"}, status=status.HTTP_200_OK)
        return super().post(request, *args, **kwargs)
