from django.db import models

# Create your models here.

from django.db import models


class Post(models.Model):
    title = models.CharField(max_length=200, verbose_name='Тема')
    slug = models.SlugField(max_length=200, unique=True)
    updated_on = models.DateTimeField(auto_now=True)
    preview = models.TextField(max_length=200, verbose_name='Превью')
    content = models.TextField(verbose_name='Текст')
    image = models.ImageField(upload_to='post', verbose_name='Изображение', blank=True)
    created_on = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_on']

    def __str__(self):
        return self.title


class Start(models.Model):
    title = models.CharField(max_length=200)
    link = models.CharField(max_length=200, blank=True)
    is_season = models.BooleanField(default=False)
    start_on = models.DateField(blank=True, null=True)
    end_on = models.DateField(blank=True, null=True)

    class Meta:
        ordering = ['-start_on']

    def __str__(self):
        return self.title


class Partner(models.Model):
    title = models.CharField(max_length=200, verbose_name='Название', unique=True)
    link = models.CharField(max_length=200, verbose_name='Ссылка')
    image = models.ImageField(upload_to='partner', verbose_name='Логотип')

    def __str__(self):
        return self.title


class Document(models.Model):
    title = models.CharField(max_length=200, verbose_name='Название документа')
    link = models.CharField(max_length=200, default='')
    file = models.FileField(upload_to='docs', verbose_name='Файл')

    def __str__(self):
        return self.title


class Photo(models.Model):
    created_on = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='photos', verbose_name='Фото')

    def __str__(self):
        return self.created_on
