from app import db



class Connection(db.Model):
	__tablename__ = 'connections'
	connector_id = db.Column(db.Integer, db.ForeignKey('pictures.id'), index=True, primary_key=True)
	connectee_id = db.Column(db.Integer, db.ForeignKey('pictures.id'), index=True, primary_key=True)
	connection_strength = db.Column(db.Integer)
	
	def increase(self):
		self.connection_strength = self.connection_strength+1
		return '<Connection_strength %r>' % self.connection_strength
	
	def decrease(self):
		self.connection_strength = self.connection_strength-1
		return '<Connection_strength %r>' % self.connection_strength
	
	def __repr__(self):
		return '<connector_id %r connectee_id %r connection_strength %r>' % (self.connector_id, self.connectee_id, self.connection_strength)
	

class Picture(db.Model):  #many to one - many pictures for one city or activity.  wait, is that true?  dif pics for dif city/descr combos
	__tablename__ = 'pictures'
	id = db.Column(db.Integer, index=True, primary_key=True)
	path = db.Column(db.String, index=True, unique=True)
	category = db.Column(db.String, default="input") #for inputs vs city vs activity
	total_count = db.Column(db.Integer, default=0)
	connector = db.relationship('Connection', primaryjoin=id==Connection.connectee_id, backref=db.backref('connectee',lazy='joined'), lazy='dynamic', cascade='all, delete-orphan') #foreign_keys='[Connection.connectee_id]',
	connectee = db.relationship('Connection', primaryjoin=id==Connection.connector_id, backref=db.backref('connector', lazy='joined'), lazy='dynamic', cascade='all, delete-orphan')	#foreign_keys='[Connection.connector_id]',
	
	cities = db.relationship('City', backref='city_pic')
	activities = db.relationship('Activity', backref='activity_pic')
	inputs = db.relationship('Input', backref='input_pic')
	
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
		

class Price(db.Model):
	__tablename__ = 'prices'
	city_id = db.Column(db.Integer, db.ForeignKey('pictures.id'), primary_key=True)
	city_price = db.Column(db.Float, index=True)
	city_currency = db.Column(db.String, index=True)
	cheap_accomodation_price = db.Column(db.Float, index=True)
	cheap_meal_price = db.Column(db.Float, index=True)



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

	
	def __repr__(self):
		return '<city_id %r city_name %r city_descr %r >' % (self.city_id, self.city_name, self.city_descr)
		
	def to_dict(self): 
 		return dict(id= self.city_id, name= self.city_name, descr= self.city_descr)


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

