from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from .functions import check_regex
from .constants import mail, pass_check  
import json
from .models import CustomUser
data_fields = ['FirstName', 'email', 'password', 'confirmpassword']

def SignUp(request):
    if request.method == 'POST':
        if request.body:
            data = json.loads(request.body)
            user = data.get('email')
            print(data)
        else:
            return JsonResponse({"msg" : "Please Use the proper json format to send the data"}, status = 400)
        difference = data_fields - data.keys()
        if difference:
            return JsonResponse({"msg" : f" {list(difference)} are missing"}, status = 400)
        if (check_regex(mail, data.get('email')) is None ):
            return JsonResponse({"msg" : "Email should have  a proper format"}, status = 400)
        if  ((check_regex(pass_check, data.get('password')) is None)):
            return JsonResponse({"msg" : "Use valid pattern Password  (Make sure you are giving all the required field)"}, status = 400)
        if (data.get('password') != data.get('confirmpassword')):
            return JsonResponse({ "msg" : "Confirm password should be same as password or confirm password field is missing"}, status = 401)
        if (CustomUser.objects.filter(email = data.get('email')).exists()):
            return JsonResponse({"msg" : "User already exists"},status = 409)
        else:
            user = CustomUser(
                email=data.get('email'),
                first_name = data.get('FirstName'),
            )
            user.set_password(data.get('password')) 
            user.last_name = data.get('LastName')         
            user.save()
            return JsonResponse({"msg" : "User Created Successfully"}, status = 201)
    else:
        return JsonResponse({"msg":"Invalid Method"}, status = 405) 

def SignIn(request):
    if request.method == 'POST':
        if request.body:
            data = json.loads(request.body)
        else:
            return JsonResponse({"msg" : "Please Use the proper json format to send the data"}, status = 400)
        if ('email' not in (data.keys()) or 'password' not in (data.keys())):
            return JsonResponse({"msg" : "Please give me all the required fields"}, status = 400)
        if request.user.is_authenticated:
                return JsonResponse({"msg":"Already Logged In "}, status = 409) 
        user = authenticate(request, email = data.get('email') , password = data.get('password'))
        if user is not None: 
            login(request,user)
            return JsonResponse({"msg":"Logged In Successfully"}, status = 200)
        else:
            return JsonResponse({"msg":"Wrong Credentials"}, status = 401)
    else:return JsonResponse({"msg":"Invalid Method"},status = 405) 

def SignOut(request):
    if request.method == 'DELETE': 
        if request.user.is_authenticated:
            logout(request)
            return JsonResponse({"msg":"Log Out"}, status = 200) 
        return JsonResponse({"msg":"No Active User"}, status = 401)
    else:return JsonResponse({"msg":"Invalid Method"}, status = 405)     
