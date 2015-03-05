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
	cities = Picture.query.filter_by(category='city').join(City,(City.city_id == Picture.id)).join(Price,(Price.city_id == Picture.id)).all() #can use order_by() here
	print [c.city_to_dict() for c in cities]
	return jsonify(data = [c.city_to_dict() for c in cities])


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
	City.query.delete()
	Picture.query.delete()
	Connection.query.delete()
	Price.query.delete()
	FXRate.query.delete()
	Flight.query.delete()
	db.session.commit()
	
	nycFlightPrices = [732, 0, 859, 1152, 838,
	684, 963, 873, 874, 834, 
	815, 1127, 898, 1103, 894,
	280, 1380, 253, 317, 1230,
	814, 321, 941, 765,
	956
	]
	
	
	cityList=['Prague','New York City','Hong Kong','Tokyo','Rome',
	'Istanbul','Paris','Kuala Lumpur', 'Macau','London', 
	'Barcelona','Kathmandu', 'Singapore','Bangkok','Dubai',
	'Las Vegas','Shanghai','Miami','Los Angeles','Beijing',
	'Budapest','San Francisco','Vienna','Amsterdam', 
	'Berlin']
	
	cityPathList=['PragueBridge.jpg', 'NYCStatue.jpg','HongKongBoat.jpg','TokyoVeranda.jpg','RomeColosseum.jpg',
	'IstanbulHagiaSophia.jpg','ParisEiffel.jpg','KualaLumpurBatuCaves.jpg','MacauCasino.jpg','London.jpg',
	'BarcelonaParcGuell.jpg','KathmanduVillage.jpg', 'SingaporeOrchardRoad.jpg','BangkokWatArun.jpg','DubaiBurjAlArab.jpg',
	'Vegas.jpg', 'ShanghaiOldStreet.jpg','MiamiBeach.jpg','LAHollywood.jpg','BeijingGreatWall.jpg',
	'BudapestParliament.jpg', 'SanFranciscoGoldenGateBridge.jpg','ViennaSchonbrunnPalace.jpg', 'AmsterdamVondelpark.jpg',
	'BerlinWall.jpg']  # gotta add in australia too!
	
	cityPriceList=[42.78, 109.60, 45.03, 67.87, 76.82, 
	38.89, 82.73, 38.44, 37.60, 105.61, 
	58.18, 19.28, 55.55, 24.88, 77.22,
	65.40, 37.42, 68.70, 74.32, 29.00,
	31.03, 75.00, 70.23, 91.01,
	59.32
	]
	
	
	currencyList= ['EUR','NPR', 'SGD', 'THB', 'USD']
	
	fx_vs_USDList=[1.14, 0.01, 0.8, 0.031, 1.0]
	
	
	inputPathList= ['Church.jpg','Zebras.jpg','RainyCity.jpg','Carousel.jpg','SurfsUp.jpg', 'Market.jpg',
	'SingleWineGlass.jpg','Coffee.jpg','FullTable.jpg', 'Bread.jpg', 'ReadytoWork.jpg','Backseat.jpg',
	'ArtGallery.jpg', 'Graffiti.jpg','WineChat.jpg','LightStreaks.jpg', 'CountryMusician.jpg', 'ParkPic.jpg',
	'CityGirl.jpg', 'MountainLake.jpg', 'BeachFamily.jpg', 'MeadowsandMountains.jpg', 'FoggyFall.jpg',
	'Stream.jpg', 'Ballet.jpg', 'BoatCouple.jpg', 'Bolivien.jpg', 'Prayer.jpg', 'MexicoPyramid.jpg',
	'StMartenBeach.jpg', 'Ox.jpg', 'GreatWall.jpg', 'FijiFireDance.jpg','StreetCastle.jpg', 'StoneHenge.jpg',
	'YorkTower.jpg', 'BuddhaTemple.jpg', 'HotSprings.jpg', 'Urban.jpg', 'Ski.jpg', 'Interesting.jpg',
	'Yoga.jpg', 'CoupleMeadow.jpg', 'Watergun.jpg', 'Rural.jpg', 'Bench.jpg', 'Kiss.jpg', 'Cruise.jpg',
	'SoloMusic.jpg', 'Party.jpg', 'NepalVillage.jpg']
	
	
	
	# initialize city pics, need to add in Activity pictures too, not just inputs and cities
	for index in range(len(cityPathList)):
		print index #WHY ISNT THIS PRINTING?
		a=Picture(id= index, path= "../img/picPool/" + cityPathList[index], category='city', total_count=1)	
		db.session.add(a)
	db.session.commit()
		
	#initialize cities
	for index in range(len(cityList)):
		a=City(city_id= index, city_name= cityList[index], city_descr='')	
		db.session.add(a)
	db.session.commit()
	
	
	# initialize input pics
	for index in range(len(inputPathList)):
		a=Picture(id = index+len(cityPathList), path= "../img/picPool/" + inputPathList[index], category='input', total_count=1)	
		db.session.add(a)
	db.session.commit()
	
	
	
	#initialize connections
	picCount = Picture.query.count()
	for outer in range(picCount):	
		for inner in range(1,picCount):
			a= Connection(connector_id=outer, connectee_id=inner)
			db.session.add(a)
	db.session.commit()
	
	#initialize city prices, all input in USD from http://www.priceoftravel.com/world-cities-by-price-backpacker-index/
	for index in range(len(cityPriceList)):
		a=Price(city_id=index, city_price=cityPriceList[index])	
		db.session.add(a)
	db.session.commit()
	
	
	#initialize FX rates
	for index in range(len(currencyList)):
		a=FXRate(currency = currencyList[index], fx_vs_USD= fx_vs_USDList[index])	
		db.session.add(a)
	db.session.commit()
	
	#initialize flight prices
	for index in range(len(cityList)):
		a=Flight(start_city = 1, destination_city = index, flight_price=nycFlightPrices[index])	
		db.session.add(a)
	db.session.commit()


	
	return jsonify({ 'success': True })
	

# make custom error pages later!
# @app.errorhandler(404) def page_not_found(e):
# 	return render_template('404.html'), 404
# @app.errorhandler(500)
# def internal_server_error(e):
# 	return render_template('500.html'), 500