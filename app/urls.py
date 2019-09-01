from django.urls import path

from app import views

urlpatterns = [
    path('', views.main_view, name='main_posts'),
    path('gallery/', views.gallery_view),
    path('<int:pk>/', views.PostDetailView.as_view(), name='detail'),
    path('documents/', views.document_view),
    path('starts/', views.start_view),
    path('partners/', views.partner_view)
]
