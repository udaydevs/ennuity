from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import authenticate, login, logout
from .functions import check_regex
from .constants import mail, pass_check  
import json
from django.views.decorators.csrf import csrf_protect

from django.views.decorators.csrf import ensure_csrf_cookie
from django.middleware.csrf import get_token
from django.views.decorators.http import require_GET
from rest_framework.response import Response
from rest_framework import status
from .serializers import SignUpSerializer
@ensure_csrf_cookie
@api_view(["GET"])
def get_csrf_token(request):
    token = get_token(request)
    return JsonResponse({"csrfToken": token})
@api_view(['POST'])
def SignUp(request):
    print(request.data)
    serializer = SignUpSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"msg": "User Created Successfully"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_protect
@api_view(["POST"])
def SignIn(request):
    print("Authenticated:", request.user.is_authenticated)
    print("User:", request.user)
    if request.user.is_authenticated:
        return JsonResponse({"msg": "Already logged in"}, status=200)
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({"msg": "Invalid JSON format"}, status=400)
    if not all(k in data for k in ("email", "password")):
        return JsonResponse({"msg": "Missing required fields"}, status=400)
    user = authenticate(request, email=data["email"], password=data["password"])
    if user:
        login(request, user)
        return JsonResponse({"msg": "Logged In Successfully"}, status=200)
    else:
        return JsonResponse({"msg": "Wrong Credentials"}, status=401)
    
@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def SignOut(request): 
        logout(request)
        return JsonResponse({"msg":"Log Out"}, status=status.HTTP_200_OK) 
        
