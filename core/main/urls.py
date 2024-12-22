from django.urls import path
from . import views


urlpatterns = [
    path('', views.home, name='home'),
    path('exchange/', views.exchange, name='exchange'),
    path('api/getApiUrl', views.get_api_url, name='get_api_url'),
    path('dashboard/', views.finance_dashboard, name='finance_dashboard'),
    path('trending_currencies/', views.trending_currencies, name='trending_currencies'),
    path('trending_stocks/', views.trending_stocks, name='trending_stocks'),
    path('trending_cryptos/', views.trending_cryptos, name='trending_cryptos'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'), 
]