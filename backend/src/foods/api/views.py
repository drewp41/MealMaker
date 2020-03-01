from rest_framework.generics import ListAPIView, RetrieveAPIView

from foods.models import Food
from .serializers import FoodSerializer


class FoodListView(ListAPIView):
    queryset = Food.objects.all()
    serializer_class = FoodSerializer


class FoodDetailView(RetrieveAPIView):
    queryset = Food.objects.all()
    serializer_class = FoodSerializer
