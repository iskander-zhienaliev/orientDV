from django.shortcuts import render

# Create your views here.

from django.http import HttpResponse
from django.views.generic import DetailView
from django.shortcuts import render
from .models import Partner, Post, Document, Photo, Start
from django.core.paginator import Paginator
from django.db.models import Q


def main_view(request, template='main/main.html',
              page_template='main/news.html'):
    search_query = request.GET.get('search', '')
    if search_query:
        posts = Post.objects.filter(Q(title__icontains=search_query) | Q(preview__icontains=search_query))
    else:
        posts = Post.objects.all()
    partners = Partner.objects.all()
    documents = Document.objects.all()
    starts_month = Start.objects.filter(is_season=False)
    starts_season = Start.objects.filter(is_season=True)

    paginator = Paginator(posts, 5)
    page_number = request.GET.get('page', 1)
    page = paginator.get_page(page_number)

    if page.has_next():
        next_url = '?page={}'.format(page.next_page_number())
    else:
        next_url = ''

    context = {
        'posts': page,
        'page_number': page_number,
        'next_url': next_url,
        'partners': partners,
        'documents': documents,
        'starts_season': starts_season,
        'starts_month': starts_month
    }

    if request.is_ajax():
        template = page_template

    return render(request, template, context)


class PostDetailView(DetailView):
    model = Post
    template_name = 'main/detail.html'


def gallery_view(request):
    photos = Photo.objects.all()
    context = {
        'photos': photos
    }
    return render(request, 'gallery.html', context)


def document_view(request):
    documents = Document.objects.all()
    context = {
        'documents': documents
    }
    return render(request, 'document.html', context)


def start_view(request):
    starts_month = Start.objects.filter(is_season=False)
    starts_season = Start.objects.filter(is_season=True)
    context = {
        'starts_season': starts_season,
        'starts_month': starts_month
    }
    return render(request, 'starts.html', context)


def partner_view(request):
    partners = Partner.objects.all()
    context = {
        'partners': partners
    }
    return render(request, 'partners.html', context)
