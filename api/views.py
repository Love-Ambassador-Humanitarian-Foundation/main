from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt,csrf_protect
from .models import Member,About

NAME ='LAHF'
version = '1.0.0'

@method_decorator(csrf_exempt, name="dispatch")
class Home(APIView):
    def get(self, request):
        data = {
            'success': 'true',
            'message': 'Welcome to '+NAME+' version '+version,
            'response':{
                'name':NAME,
               'version':version
            }
        }
        return Response(data,status=200)

@method_decorator(csrf_exempt, name="dispatch")
class AboutAPI(APIView):
    def get(self, request):
        about = About.objects.all()
        if about.exists():
            about = about[0]
        else:
            about = None
        data = {
            'success': 'true',
            'message': 'Retrieved the company details',
            'response':{
                'name':NAME,
                'version':version,
                'about':about
            }
        }
        return Response(data,status=200)