from django_filters import rest_framework as filters

from .models import Comment


class CommentFilterSet(filters.FilterSet):
    class Meta:
        model = Comment
        fields = ("post",)
