from app import db



class Connection(db.Model):
	__tablename__ = 'connections'
	connector_id = db.Column(db.Integer, db.ForeignKey('pictures.id'), index=True, primary_key=True)
	connectee_id = db.Column(db.Integer, db.ForeignKey('pictures.id'), index=True, primary_key=True)
	connection_strength = db.Column(db.Integer, default=0)
	
	def increase(self):
		self.connection_strength = self.connection_strength+1
		return '<Connection_strength %r>' % self.connection_strength
	
	def decrease(self):
		self.connection_strength = self.connection_strength-1
		return '<Connection_strength %r>' % self.connection_strength
	
	def __repr__(self):
		return '<connector_id %r connectee_id %r connection_strength %r>' % (self.connector_id, self.connectee_id, self.connection_strength)
	

class Flight(db.Model):
	__tablename__ = 'flights'
	start_city = db.Column(db.Integer, db.ForeignKey('pictures.id'), primary_key=True)
	destination_city = db.Column(db.Integer, db.ForeignKey('pictures.id'), primary_key=True)
	departure_date = db.Column(db.Date)
	departure_time = db.Column(db.Time)
	arrival_date = db.Column(db.Date)
	arrival_time = db.Column(db.Time)
	air_class = db.Column(db.String, default="Economy")
	carrier = db.Column(db.String, default="UA")
	roundtrip_oneway = db.Column(db.String, default="Roundtrip")
	flight_price = db.Column(db.Float, index=True, default=500)
	flight_currency = db.Column(db.ForeignKey('fxrates.currency'), index=True, default="USD")
	
	def getFlightPrice(self):
		return self.flight_price
	
	def __repr__(self):
		return '<start_city %r destination_city %r flight_price %r >' % (self.start_city, self.destination_city, self.flight_price)
		

class Picture(db.Model):  #many to one - many pictures for one city or activity.  wait, is that true?  dif pics for dif city/descr combos
	__tablename__ = 'pictures'
	id = db.Column(db.Integer, index=True, primary_key=True)
	path = db.Column(db.String, index=True, unique=True)
	category = db.Column(db.String, default="input") #for inputs vs city vs activity
	total_count = db.Column(db.Integer, default=0)
	connectee = db.relationship('Connection', primaryjoin=id==Connection.connectee_id, backref=db.backref('connectee',lazy='joined'), lazy='dynamic', cascade='all, delete-orphan') #foreign_keys='[Connection.connectee_id]',
	connector = db.relationship('Connection', primaryjoin=id==Connection.connector_id, backref=db.backref('connector', lazy='joined'), lazy='dynamic', cascade='all, delete-orphan')	#foreign_keys='[Connection.connector_id]',
	
	cities = db.relationship('City', backref='city_pic', lazy='dynamic')
	activities = db.relationship('Activity', backref='activity_pic', lazy='dynamic')
	inputs = db.relationship('Input', backref='input_pic', lazy='dynamic')
	
	prices = db.relationship('Price', backref='pic', lazy='dynamic')
	
	flight_prices = db.relationship('Flight', primaryjoin=id==Flight.destination_city, backref=db.backref('flight_pic',lazy='joined'), lazy='dynamic', cascade='all, delete-orphan') 
	
	def increase(self):
		self.total_count = self.total_count+1
		return '<TotalCount %r>' % self.total_count
		
	def decrease(self):
		self.total_count = self.total_count-1
		return '<total_count %r>' % self.total_count
	
	def __repr__(self):
		return '<id %r path %r category %r total_count %r>' % (self.id, self.path, self.category, self.total_count)
		
	def to_dict(self): 
 		return dict(id= self.id, path= self.path, weight = self.total_count)
 		
 	def city_to_dict(self): 
		return dict(id= self.id, path= self.path, weight = self.total_count, city_name= self.cities.filter_by(city_id=self.id).one().getName(), city_price= self.prices.filter_by(city_id=self.id).one().getCityPrice(), city_currency= self.prices.filter_by(city_id=self.id).one().getCityCurrency(), flight_price= self.flight_prices.filter_by(destination_city=self.id).one().getFlightPrice())
		


class Feedback(db.Model): 
	__tablename__ = 'feedbacks'
	id = db.Column(db.Integer, index=True, primary_key=True)
	helpful = db.Column(db.Integer, index=True, default=0)
	not_helpful = db.Column(db.Integer, index=True, default=0)
		
	
	def addHelp(self):
		self.helpful = self.helpful+1
		return '<Helpful %r>' % self.helpful
		
	def addHurt(self):
		self.not_helpful = self.not_helpful+1
		return '<Not Helpful %r>' % self.not_helpful
	
	
	def __repr__(self):
		return '<id %r helpful %r not_helpful %r >' % (self.id, self.helpful, self.not_helpful)

		
		
		

class Price(db.Model):
	__tablename__ = 'prices'
	city_id = db.Column(db.Integer, db.ForeignKey('pictures.id'), primary_key=True)
	city_price = db.Column(db.Float, index=True, default=50)
	city_currency = db.Column(db.ForeignKey('fxrates.currency'), index=True, default="USD")
	
	
	def __repr__(self):
		return '<city_id %r city_price %r city_currency %r >' % (self.city_id, self.city_price, self.city_currency)
	
	def getCityPrice(self):
		return self.city_price
		
	def getCityCurrency(self):
		return self.city_currency





class FXRate(db.Model):
	__tablename__ = 'fxrates'
	currency = db.Column(db.String, index=True, primary_key=True)
	fx_vs_USD = db.Column(db.Float, index=True, default=1)

	city_prices = db.relationship('Price', backref='fx_rates', lazy='dynamic')

	def __repr__(self):
		return '<currency %r fx_vs_USD %r  >' % (self.currency, self.fx_vs_USD)


# DO I NEED THIS?
class Input(db.Model):
	__tablename__ = 'inputs'
	input_id = db.Column(db.Integer, db.ForeignKey('pictures.id'), primary_key=True)
	input_name = db.Column(db.String, index=True)

	
	def __repr__(self):
		return '<input_id %r input_path %r  >' % (self.input_id, self.input_name)
		
	def to_dict(self): 
 		return dict(id= self.input_id, name= self.input_name)


class City(db.Model):
	__tablename__ = 'cities'
	city_id = db.Column(db.Integer, db.ForeignKey('pictures.id'), primary_key=True)
	city_name = db.Column(db.String, index=True)
	city_descr = db.Column(db.String, index=True)

	def getName(self): 
 		return self.city_name
	
	def __repr__(self):
		return '<city_id %r city_name %r city_descr %r>' % (self.city_id, self.city_name, self.city_descr)
		
	def to_dict(self): 
 		return dict(city_name= self.city_name)
 	
 	def auto_to_dict(self): 
		return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class Activity(db.Model):
	__tablename__ = 'activities'
	activity_id = db.Column(db.Integer, db.ForeignKey('pictures.id'), primary_key=True)
	activity_name = db.Column(db.String, index=True, unique=True)
	activity_descr = db.Column(db.String, index=True)
	activity_price = db.Column(db.Float, index=True)
	activity_currency = db.Column(db.String, index=True)

	
	def __repr__(self):
		return '<id %r activity_name %r  activity_descr %r activity_price %r %r>' % (self.activity_id, self.activity_name, self.activity_descr, self.activity_currency, self.activity_price)
		
	def to_dict(self): 
 		return dict(id= self.activity_id, name= self.activity_name, descr= self.activity_descr, price = self.activity_price, currency=self.activity_currency)

