from django.contrib import admin
from .models import Post, Partner, Document, Start
from django_summernote.admin import SummernoteModelAdmin
from .forms import StartAddForm

# Register your models here.


class PostAdmin(SummernoteModelAdmin):
    summernote_fields = ('content')
    list_display = ('title', 'slug', 'created_on', 'updated_on')
    search_fields = ['title', 'content']

    def show_firm_url(self, obj):
        return '<a href="%s">%s</a>' % (obj.firm_url, obj.firm_url)

    show_firm_url.allow_tags = True


class StartAdmin(admin.ModelAdmin):
    form = StartAddForm


admin.site.register(Post, PostAdmin)
admin.site.register(Document)
admin.site.register(Partner)
admin.site.register(Start, StartAdmin)
