from rest_framework import serializers

from foods.models import Food


class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = ('calories', 'carb', 'protein', 'fat')
