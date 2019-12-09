from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from .models import Comment, Post


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = (
            "id",
            "title",
            "body",
        )


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = (
            "id",
            "post",
            "body",
        )

    def validate_post(self, post):
        if self.instance and self.instance.post != post:
            raise ValidationError("You can't change the comment's post")
        return post
