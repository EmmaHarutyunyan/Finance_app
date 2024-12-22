from django.db import models
from django.contrib.auth.models import User

class Currency(models.Model):
    name = models.CharField(max_length=100)  
    symbol = models.CharField(max_length=10)  
    exchange_rate = models.DecimalField(max_digits=10, decimal_places=4) 

    def __str__(self):
        return f"{self.name} ({self.symbol})"
    
class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

class Transaction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    from_currency = models.ForeignKey(Currency, related_name='from_currency', on_delete=models.CASCADE)
    to_currency = models.ForeignKey(Currency, related_name='to_currency', on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)  
    def __str__(self):
        return f"Transaction by {self.user.username} on {self.date} ({self.amount} {self.from_currency.symbol} to {self.to_currency.symbol})"



class Images(models.Model):
    title = models.CharField(max_length=200)  
    image = models.ImageField(upload_to='images/')
    def __str__(self):
        return self.title