from os import environ
from datetime import datetime
import math
import json

from flask import Flask, render_template, redirect, request, url_for, jsonify

from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from bson.json_util import dumps

app = Flask(__name__)

app.secret_key = environ.get('SECRET_KEY')
app.config["MONGO_DBNAME"] = environ.get('MONGO_DBNAME')
app.config["MONGO_URI"] = environ.get('MONGO_URI')

mongo = PyMongo(app)


@app.route('/data')
def data():
    return dumps(list(mongo.db.goceries.find()))

@app.route('/')
def index():
    """Renders the home page."""
    return render_template(
       'index.html'
    )

if environ.get('DEVELOPMENT'):
    development = True
else:
    development = False

if __name__ == '__main__':
    HOST = environ.get('IP')
    if development:
        PORT = int(environ.get('C9_PORT'))
    else:
        PORT = int(environ.get('PORT'))
    app.run(HOST, PORT, debug=development)