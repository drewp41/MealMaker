from rest_framework import viewsets
from django.db.models import Q

from foods.models import Food
from .serializers import FoodSerializer


# this class handles all of the requests below (get, post, update, delete)
# in much less code

class FoodViewSet(viewsets.ModelViewSet):
    serializer_class = FoodSerializer
    # queryset = Food.objects.all()
    # queryset = Food.objects.filter(userID=2)

    def get_queryset(self):
        return Food.objects.filter(created_by=self.request.user.username)

    def search(request):
        query = request.GET.get('q', '')
        # The empty string handles an empty "request"
        if query:
            queryset = (Q(meal__icontains=query))
            # I assume "text" is a field in your model
            # i.e., text = model.TextField()
            # Use | if searching multiple fields, i.e.,
            #queryset = (Q(text__icontains=query))|(Q(other__icontains=query))
            results = Food.objects.filter(queryset).distinct()
        else:
            results = []
        return results

        # from rest_framework.generics import (
        #     ListAPIView,
        #     RetrieveAPIView,
        #     CreateAPIView,
        #     DestroyAPIView,
        #     UpdateAPIView
        # )

        # class FoodListView(ListAPIView):
        #     queryset = Food.objects.all()
        #     serializer_class = FoodSerializer

        # class FoodDetailView(RetrieveAPIView):
        #     queryset = Food.objects.all()
        #     serializer_class = FoodSerializer

        # class FoodCreateView(CreateAPIView):
        #     queryset = Food.objects.all()
        #     serializer_class = FoodSerializer

        # class FoodUpdateView(UpdateAPIView):
        #     queryset = Food.objects.all()
        #     serializer_class = FoodSerializer
        # class FoodDeleteView(DestroyAPIView):
        #     queryset = Food.objects.all()
        #     serializer_class = FoodSerializer
