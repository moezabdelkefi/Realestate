from django.contrib import admin
from django.urls import path , include

from . import views
from .views import RegisterView,LoginView,UserView,LogoutView

urlpatterns = [
    path('role-create/', views.create_role, name='role-create'),
    path('role-update/<int:pk>/', views.update_role, name='role-update'),
    path('role-delete/<int:pk>/', views.delete_role, name='role-delete'),
    path('user-create/', views.create_user, name='user-create'),
    path('user-update/<int:pk>/', views.updateUser, name='user-update'),
    path('user-delete/<int:pk>/', views.deleteUser, name='user-delete'),
    path('user-search/<int:pk>/', views.searchUserById, name='user-search-by-id'),
    path('users/', views.list_users, name='list-users'),
    path('api/register', RegisterView.as_view()),
    path('api/login', LoginView.as_view()),
    path('api/user', UserView.as_view()),
    path('api/logout', LogoutView.as_view()),

]