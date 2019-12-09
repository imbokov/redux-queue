from django.db import models


class Post(models.Model):
    title = models.CharField(max_length=255)
    body = models.TextField()

    def __str__(self):
        return self.title


class Comment(models.Model):
    post = models.ForeignKey("forum.Post", on_delete=models.PROTECT,)

    body = models.TextField()
