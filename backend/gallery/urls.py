from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterView, CurrentUserView, ImageViewSet,ImageUploadView,UpdateImageOrderView,ResetPasswordView

# Create a router and register the ViewSet
router = DefaultRouter()
router.register(r'images', ImageViewSet, basename='images')

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', CurrentUserView.as_view(), name='profile'),
    path('reset-password/', ResetPasswordView.as_view(), name='reset-password'),


    path('upload/', ImageUploadView.as_view(), name='image-upload'),
    path("update-image-order/", UpdateImageOrderView.as_view(), name="update-image-order"),
    # path('images/<int:pk>/', UpdateImageView.as_view(), name='update-image'), 

    # Include the router's URLs
    path('', include(router.urls)),
]
