from app import app
from app import db
from app import mail
from app.models.matches import *
from flask import Flask, render_template, jsonify, request
from flask.ext.wtf import Form
from wtforms import StringField, SubmitField, HiddenField
from wtforms.validators import Required
import json
from flask_mail import Message
from config import MAIL_USERNAME
from config import MAIL_PASSWORD


@app.route('/', methods=['GET', 'POST'])
def root():
	return app.send_static_file('index.html')
	
	
@app.route('/email/', methods=['GET', 'POST'])
def sendMail():
 	args = json.loads(request.data)
 	import smtplib
 	gmail_user = MAIL_USERNAME
 	gmail_pwd = MAIL_PASSWORD
 	FROM = gmail_user
 	TO = [gmail_user] #must be a list
 	SUBJECT = "Splashee Alert!"
 	TEXT = args['email']
 	# Prepare actual message
 	message = """\From: %s\nTo: %s\nSubject: %s\n\n%s
 	""" % (FROM, ", ".join(TO), SUBJECT, TEXT)
 	try:
# 		#server = smtplib.SMTP(SERVER) 

		smtpObj = smtplib.SMTP()
		smtpObj.set_debuglevel(True)
		smtpObj.connect("localhost", 25)
		smtpObj.ehlo()
		smtpObj.sendmail(FROM, TO, message)
		
# 		server = smtplib.SMTP("smtp.gmail.com", 587) #or port 465 doesn't seem to work!
# 		#server = smtplib.SMTP("localhost", 25)
# 		server.ehlo()
# 		server.starttls()
# 		server.login(gmail_user, gmail_pwd)
# 		server.sendmail(FROM, TO, message)
# 		#server.quit()
# 		server.close()
# 		print 'successfully sent the mail'
 	except:
 		print "failed to send mail"
	return jsonify({ 'success': True })
#                 
#                 
# 	msg = Message("Hello", sender="zfx0726@gmail.com", recipients=["zfx0726@gmail.com"])
# 	msg.body = "test"
# 	mail.send(msg)
	


@app.route('/api/inputs/', methods=['GET'])
def getInputs():
	inputs = Picture.query.filter_by(category='input')  
	return jsonify(data=[c.to_dict() for c in inputs])

@app.route('/api/cities/', methods=['GET'])
def getCities():
	cities = Picture.query.filter_by(category='city').join(City,(City.city_id == Picture.id)).join(Price,(Price.city_id == Picture.id)).all() #can use order_by() here
	print [c.city_to_dict() for c in cities]
	return jsonify(data = [c.city_to_dict() for c in cities])

#this is just a temporary solution.  Need to get rid of this and send emails eventually!
@app.route('/tempPosts/', methods=['GET', 'POST'])
def addPosts():
	args = json.loads(request.data)
	a=Picture(path=args['email'], category='city', total_count=1)	
	db.session.add(a)
	db.session.commit()
	return jsonify({ 'success': True })


@app.route('/api/clicked/', methods=['POST'])
def addClicked():
	#need to edit this, to increase count of these items
	args = json.loads(request.data)
	for index in range(len(args['clickedPaths'])):
		Picture.query.filter_by(path = args['clickedPaths'][index]).one().increase()
	db.session.commit()
	return jsonify({ 'success': True })


@app.route('/api/feedback/', methods=['POST'])
def sendFeedback():
	args = json.loads(request.data)
	
	if args['sent']=='True':
		Feedback.query.one().addHelp()
		db.session.commit()
	else:
		Feedback.query.one().addHurt()
		db.session.commit()
	
	return jsonify({ 'success': True })




@app.route('/api/database/', methods=['POST'])
def addData():
	
	return jsonify({ 'success': True })
	

# make custom error pages later!
# @app.errorhandler(404) def page_not_found(e):
# 	return render_template('404.html'), 404
# @app.errorhandler(500)
# def internal_server_error(e):
# 	return render_template('500.html'), 500