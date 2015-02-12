#!/usr/bin/env python

from flask import Flask, render_template
from flask.ext.sqlalchemy import SQLAlchemy



app = Flask(__name__, static_url_path='')
app.config.from_object('config')

db = SQLAlchemy(app)

from app import models
from models import matches
from models import *

from app.routes import index

