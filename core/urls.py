from django.contrib import admin
from django.urls import path
from .views import index, contact

app_name = "core"
name="core"

urlpatterns = [
    path('', index, name="home"),
    path('contact/', contact, name="contact"),
]
