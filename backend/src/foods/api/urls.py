from django.urls import path

from .views import FoodListView, FoodDetailView

urlpatterns = [
    path('', FoodListView.as_view()),
    path('<pk>', FoodDetailView.as_view())
]
