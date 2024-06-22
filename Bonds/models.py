from django.db import models

class UserB(models.Model):
    user = models.CharField('User name', max_length=15, unique=True )
    address = models.EmailField('Email Address', max_length= 30, unique=True )
    password = models.CharField(('Password'), max_length=30)
    
    def __str__(self):
        return self.user
    
class Bonds(models.Model):
    name = models.CharField(max_length= 40)
    numer = models.IntegerField() 
    price = models.DecimalField(max_digits=9, decimal_places= 4)
    seller = models.ForeignKey(UserB, related_name='bonds_for_sale', null=True, blank=True, on_delete=models.CASCADE)
    buyer = models.ForeignKey(UserB, related_name='bought_bonds', null=True, blank=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
