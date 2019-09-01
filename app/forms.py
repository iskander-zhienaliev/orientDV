from django import forms
from .models import Start, Partner


class StartAddForm(forms.ModelForm):
    class Meta:
        model = Start
        fields = [
            'title',
            'link',
            'is_season',
            'start_on',
            'end_on',
        ]

        labels = {
            "title": "Название",
            "link": "Ссылка (если есть)",
            'is_season': 'Старт на сезон?',
            "start_on": "Дата начала старта",
            "end_on": "Дата конца старта",
        }

    def clean(self):
        cleaned_data = super().clean()
        start_date = cleaned_data.get("start_on")
        end_date = cleaned_data.get("end_on")
        if not start_date is None and not end_date is None:
            if end_date < start_date:
                raise forms.ValidationError("Дата конца старта должна быть больше или равна дате начала старта ")
