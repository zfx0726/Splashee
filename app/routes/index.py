from app import app
from app import db
from app.models.matches import *
from flask import Flask, render_template, jsonify, request
from flask.ext.wtf import Form
from wtforms import StringField, SubmitField, HiddenField
from wtforms.validators import Required
import json


@app.route('/', methods=['GET', 'POST'])
def root():
	return app.send_static_file('index.html')


@app.route('/api/inputs/', methods=['GET'])
def getInputs():
	inputs = Picture.query.filter_by(category='input')  
	return jsonify(data=[c.to_dict() for c in inputs])

@app.route('/api/cities/', methods=['GET'])
def getCities():
	cities = Picture.query.filter_by(category='city')
	return jsonify(data=[c.to_dict() for c in cities])

@app.route('/api/subtables/', methods=['GET'])
def populate():
	destinations = Picture.query.filter_by(category='destination')
	return jsonify(data=[c.to_dict() for c in destinations])

@app.route('/api/pics/', methods=['POST'])
def addPics():
	args = json.loads(request.data)
	newPath = "../img/picPool/" + args['path']
	a=Picture(path= newPath, category='city')
	db.session.add(a)
	db.session.commit()
	return jsonify({ 'success': True })
	

# make custom error pages later!
# @app.errorhandler(404) def page_not_found(e):
# 	return render_template('404.html'), 404
# @app.errorhandler(500)
# def internal_server_error(e):
# 	return render_template('500.html'), 500