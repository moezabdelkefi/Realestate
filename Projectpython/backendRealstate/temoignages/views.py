from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response


# Create your views here.
@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'List': '/temoignages-list/',
        'Detail View': '/temoignages-detail/<int:id>/',
        'Create': '/temoignages-create/',
        'Update': '/temoignages-update/<int:id>/',
        'Delete': '/temoignages-detail/<int:id>/',
    }
    return Response(api_urls);