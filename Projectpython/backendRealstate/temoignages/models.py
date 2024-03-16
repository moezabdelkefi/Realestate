from django.db import models
from userAuth.models import User

class Temoignage(models.Model):
    name = models.CharField(max_length=50)
    contenu = models.TextField()
    note = models.IntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name