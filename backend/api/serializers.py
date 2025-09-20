from rest_framework import serializers
from .models import Student, Checkin

# Student serializer
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = "__all__"

# Checkin serializer
class CheckinSerializer(serializers.ModelSerializer):
    studentId = serializers.CharField(write_only=True)   # input field
    student = StudentSerializer(read_only=True)          # return full student details

    class Meta:
        model = Checkin
        fields = ["id", "studentId", "student", "timestamp"]

    def create(self, validated_data):
        # Extract studentId from request
        student_id_value = validated_data.pop("studentId")

        try:
            student = Student.objects.get(studentId=student_id_value)
        except Student.DoesNotExist:
            raise serializers.ValidationError({"studentId": "Invalid studentId"})

        # Create the checkin with the matched student
        return Checkin.objects.create(student=student, **validated_data)
