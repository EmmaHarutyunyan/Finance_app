import requests
from django.shortcuts import render,redirect
from .models import Currency, Transaction
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from .models import Images
from dotenv import load_dotenv
import os 
load_dotenv()

from django.http import JsonResponse
from django.conf import settings

def get_api_url(request):
    return JsonResponse({'apiUrl': settings.API_URL})

API_URL = os.getenv('API_URL')
FINNHUB_API_URL = os.getenv('FINNHUB_API_URL')
FINNHUB_API_KEY = os.getenv('FINNHUB_API_KEY')
COINGECKO_API_URL = os.getenv('COINGECKO_API_URL')

def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(username=username, password=password)

            if user is not None:
                login(request, user) 
                return redirect('home')  
            else:
                return HttpResponse("Invalid login details", status=401)
        else:
            return HttpResponse("Invalid form submission", status=400)
    else:
        form = AuthenticationForm()

    return render(request, 'main/login.html', {'form': form})

def logout_view(request):
    logout(request) 
    return redirect('login') 



def home(request):
    image = Images.objects.last()  
    response = requests.get(API_URL)
    data = response.json()

    if data['result'] == 'success':
        exchange_rates = data['conversion_rates']
    else:
        exchange_rates = {}

    return render(request, 'main/home.html', {
        'exchange_rates': exchange_rates,
        'image': image 
    })

def exchange(request):
    currencies = {}
    result = None 

    try:
        response = requests.get(API_URL)
        data = response.json()

        if data.get('result') == 'success':
            currencies = data.get('conversion_rates', {})
    except Exception as e:
        print(f"Error fetching data: {e}")

    if request.method == 'POST':
        try:
            amount = float(request.POST['amount'])
            from_currency = request.POST['from_currency']
            to_currency = request.POST['to_currency']

            if from_currency in currencies and to_currency in currencies:
                rate = currencies[to_currency] / currencies[from_currency]
                result = round(amount * rate, 2)
            else:
                result = "Invalid currency selection."
        except Exception as e:
            result = f"Error: {str(e)}"

    return render(request, 'main/exchange.html', {
        'currencies': currencies, 
        'result': result ,
    })





def finance_dashboard(request):
    if request.user.is_authenticated:
        transactions = Transaction.objects.filter(user=request.user)
        total_amount = sum([transaction.amount for transaction in transactions])
        return render(request, 'main/finance_dashboard.html', {'transactions': transactions, 'total_amount': total_amount})
    else:
        return redirect('login') 

def trending_currencies(request):
    response = requests.get(API_URL)
    data = response.json()

    if data['result'] == 'success':
        exchange_rates = data['conversion_rates']
        trending = sorted(exchange_rates.items(), key=lambda x: x[1], reverse=True)[:5]
        trending_currencies = [{'name': currency, 'rate': rate} for currency, rate in trending]
    else:
        trending_currencies = []

    return render(request, 'main/trending_currencies.html', {'trending_currencies': trending_currencies})

def trending_stocks(request):
    stock_symbols = ["AAPL", "GOOGL", "AMZN", "TSLA", "MSFT"]
    stocks = []

    for symbol in stock_symbols:
        params = {
            'symbol': symbol,
            'token': FINNHUB_API_KEY
        }
        response = requests.get(FINNHUB_API_URL, params=params)

        if response.status_code == 200:
            data = response.json()

            if "c" in data:
                current_price = data["c"]
                stocks.append({'name': symbol, 'price': current_price})
            else:
                stocks.append({'name': symbol, 'price': "N/A"})
        else:
            stocks.append({'name': symbol, 'price': "Error fetching data"})

    return render(request, 'main/trending_stocks.html', {'stocks': stocks})

def trending_cryptos(request):
    url = "https://api.coingecko.com/api/v3/coins/markets"
    params = {
        "vs_currency": "usd", 
        "order": "market_cap_desc", 
        "per_page": 10,
        "page": 1
    }
    response = requests.get(url, params=params)
    
    if response.status_code == 200:
        cryptos = response.json()  
    else:
        cryptos = []  
    
    return render(request, 'main/trending_cryptos.html', {'cryptos': cryptos})