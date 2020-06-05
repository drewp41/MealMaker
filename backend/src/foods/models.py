from django.db import models


class Food(models.Model):
    # calories = models.PositiveSmallIntegerField(default=2000)
    # carb = models.PositiveSmallIntegerField(default=0, blank=True)
    # protein = models.PositiveSmallIntegerField(default=0, blank=True)
    # fat = models.PositiveSmallIntegerField(default=0, blank=True)
    meal = models.TextField(default='')

    def __str__(self):
        # return f'Calories: {self.calories}, Carbs: {self.carb}'
        return f'Name of meal: {self.meal[:10]}'
