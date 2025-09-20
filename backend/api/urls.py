from rest_framework.routers import DefaultRouter
from .views import StudentViewSet, CheckinViewSet

router = DefaultRouter()
router.register(r'students', StudentViewSet, basename="students")
router.register(r'checkins', CheckinViewSet, basename="checkins")

urlpatterns = router.urls
