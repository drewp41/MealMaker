from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User


class Food(models.Model):
    # calories = models.PositiveSmallIntegerField(default=2000)
    # carb = models.PositiveSmallIntegerField(default=0, blank=True)
    # protein = models.PositiveSmallIntegerField(default=0, blank=True)
    # fat = models.PositiveSmallIntegerField(default=0, blank=True)
    # user = models.ForeignKey(get_user_model, on_delete=models.CASCADE)
    created_by = models.CharField(max_length=100)
    meal = models.TextField(default='')

    def __str__(self):
        # return f'Calories: {self.calories}, Carbs: {self.carb}'
        return f'Name of meal: {self.meal[:10]}'
