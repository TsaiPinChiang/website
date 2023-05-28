from db.db import get_db
from flask import request, jsonify, Blueprint, current_app
import random
import psycopg2

from hashlib import md5
from smtplib import SMTPException
# from flask_jwt_extended import jwt_required, get_jwt_identity
# from flask_apscheduler import APScheduler
# from flask_mail import Mail, Message

history_bp = Blueprint('history', __name__)
