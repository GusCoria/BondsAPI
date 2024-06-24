from django.db import models
from django.contrib.auth.models import User #se importa el usuario para ocupar el ya definido
    
    
#modelo de bond que se creara en la DB

class Bonds(models.Model):
    name = models.CharField(max_length= 40)
    numer = models.IntegerField() 
    price = models.DecimalField(max_digits=9, decimal_places= 4)
    seller = models.ForeignKey(User, related_name='bonds_for_sale', null=True, blank=True, on_delete=models.CASCADE)
    buyer = models.ForeignKey(User, related_name='bought_bonds', null=True, blank=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
