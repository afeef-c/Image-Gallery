# accounts/views.py

from django.core.mail import send_mail
from rest_framework.views import APIView
from rest_framework.response import Response
# from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from rest_framework import generics, permissions,status
from rest_framework import viewsets

from .models import CustomUser,Image
from .serializers import RegisterSerializer,CustomUserSerializer,ImageSerializer,ResetPasswordSerializer
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated, BasePermission
from rest_framework.decorators import action



User = get_user_model()




class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]
    

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        
        # Validate the serializer
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Save the user and get the user instance
        user = serializer.save()
        
        
        # Optionally send a registration success email
        self.send_registration_success_email(user.email)

        headers = self.get_success_headers(serializer.data)
        return Response({
            "message": "User registered successfull.",
            "user_id": user.id
        }, status=status.HTTP_201_CREATED, headers=headers)


    def send_registration_success_email(self, email):
        subject = "Registration Successful"
        message = "Congratulations! You have successfully registered."
        from_email = "afeefc8281@gmail.com"  # Corrected email address
        recipient_list = [email]
        
        send_mail(subject, message, from_email, recipient_list)


class ResetPasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = ResetPasswordSerializer(data=request.data, context={'request': request})
        print("Data: ",request.data)
        print("serialized: ",serializer)
        if serializer.is_valid():
            user = request.user
            user.set_password(serializer.validated_data['new_password'])
            user.save()
            return Response({"detail": "Password updated successfully"}, status=status.HTTP_200_OK)
        print("Error! ",serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CurrentUserView(generics.RetrieveUpdateAPIView):
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        return self.request.user


class ImageViewSet(viewsets.ModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Returns only the images uploaded by the authenticated user
        return Image.objects.filter(user=self.request.user)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class ImageUploadView(APIView):
    def post(self, request, *args, **kwargs):
        images = request.FILES.getlist('images')  # Get the list of files
        titles = request.data.getlist('titles')   # Get titles, assumed to be a list
        orders = request.data.getlist('orders')   # Get orders, assumed to be a list
        print("Images, titles",images, titles, orders)
        if len(images) != len(titles) or len(images) != len(orders):
            return Response({'error': 'Number of images, titles, and orders must match'}, status=status.HTTP_400_BAD_REQUEST)
        
        for index, image in enumerate(images):
            title = titles[index] if index < len(titles) else f"Image {index+1}"
            order = orders[index] if index < len(orders) else index  # Fallback to index if no order is given
            
            try:
                order = int(order)  # Ensure order is an integer
            except ValueError:
                return Response({'error': f'Invalid order at index {index}'}, status=status.HTTP_400_BAD_REQUEST)

            # Validate and save using serializer
            serializer = ImageSerializer(data={'title': title, 'image': image, 'order': order})
            print("Data: ",{'title': title, 'image': image, 'order': order} )
                
            if serializer.is_valid():
                print("Data: ",{'title': title, 'image': image, 'order': order} )
                serializer.save(user=request.user)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response({'message': 'Images uploaded successfully!'}, status=status.HTTP_201_CREATED)


class UpdateImageOrderView(APIView):
    def post(self, request):
        images = request.data.get("images", [])
        for i, image_data in enumerate(images):
            image_id = image_data.get("id")
            try:
                image = Image.objects.get(id=image_id)
                image.order = i  # Set new order based on index
                image.save()
            except Image.DoesNotExist:
                continue

        return Response({"message": "Image order updated successfully"}, status=status.HTTP_200_OK)