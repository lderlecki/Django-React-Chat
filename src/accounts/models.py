from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password=None, **perm_fields):
        if not email:
            raise ValueError("User must have an email address")
        if not password:
            raise ValueError("User must have a password")

        user = self.model(
            email=self.normalize_email(email),
            **perm_fields
        )
        user.set_password(password)
        user.save()
        return user

    def create_user(self, email, password=None, **perm_fields):
        perm_fields.setdefault('is_staff', False)
        perm_fields.setdefault('is_superuser', False)
        return self._create_user(email, password=password, **perm_fields)

    def create_superuser(self, email, password=None, **perm_fields):
        perm_fields.setdefault('is_staff', True)
        perm_fields.setdefault('is_admin', True)
        perm_fields.setdefault('is_superuser', True)

        if not perm_fields.get('is_staff'):
            raise ValueError('Superuser must have is_staff=True.')
        if not perm_fields.get('is_admin'):
            raise ValueError('Superuser must have is_admin=True.')
        if not perm_fields.get('is_superuser'):
            raise ValueError('Superuser must have is_superuser=True.')
        return self._create_user(email, password=password, **perm_fields)


class User(AbstractBaseUser, PermissionsMixin):
    class Meta:
        db_table = 'user'

    email = models.EmailField(verbose_name='email', max_length=60, unique=True)
    name = models.CharField(max_length=255)
    date_joined = models.DateTimeField(auto_now_add=True)  # model date created
    last_login = models.DateTimeField(auto_now=True)  # user last login timestamp

    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    REQUIRED_FIELDS = ['name']

    objects = UserManager()

    USERNAME_FIELD = 'email'

    def __str__(self):
        return self.email
