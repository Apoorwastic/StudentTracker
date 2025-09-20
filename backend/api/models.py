from django.db import models

class Student(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField(unique=True)
    studentId = models.CharField(max_length=100, unique=True)
    pincode = models.CharField(max_length=20, blank=True, null=True)
    district = models.CharField(max_length=100, blank=True, null=True)
    state = models.CharField(max_length=100, blank=True, null=True)
    country = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"{self.name} ({self.studentId})"


class Checkin(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Checkin for {self.student.name} at {self.timestamp}"
