from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def index(request):
    return HttpResponse('<h1>This is user app homepage</h1>')

def detail(request, user_id):
    return HttpResponse('<h2>Details for User id: ' + str(user_id) + '</h2>')
