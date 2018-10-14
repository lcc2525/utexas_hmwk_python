import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///C:/Users/lcc25/Desktop/hawaii.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
Measurement = Base.classes.measurement
Station = Base.classes.station

# Create our session (link) from Python to the DB
session = Session(engine)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/tobs<br/>"
        f"/api/v1.0/stations<br/>"
        f"/api/v1.0/2017<br/>"
        f"/api/v1.0/start2<br/>"
        f"/api/v1.0/range<br/>"
    )


@app.route("/api/v1.0/tobs")
def tobs():
    """Return a list of all dates and tobs"""
    results = session.query(Measurement.date, Measurement.tobs).all()
    
    # Convert list of tuples into normal list
    all_names = list(np.ravel(results))

    return jsonify(all_names)


@app.route("/api/v1.0/stations")
def stations_call():
    """Return a list of all Stations"""
    # Query all stations
    stations_call = session.query(Station.station).all()
    all_stations = list(np.ravel(stations_call))
    
    return jsonify(all_stations)
    

@app.route("/api/v1.0/2017")
def stations():
    """Return a list of all the temperatures in a given year"""
    # Query all stations before a given date 2017
    results = session.query(Measurement.date, Measurement.tobs).filter(func.strftime("%Y", Measurement.date) >= "2017").all()
    all_results = list(np.ravel(results))
    
    return jsonify(all_results)    


@app.route("/api/v1.0/start2")
def start_date():
    """Return a list of min, avg, and max temp before a given date"""
    # Query all stations before a given date return max,min,avg values
    qry = session.query(func.max(Measurement.tobs).label("max_temp"), func.min(Measurement.tobs).label("min_temp"), func.avg(Measurement.tobs).label("avg_temp")).filter(func.strftime("%Y", Measurement.date) >= "2017").all()
    before_date = list(np.ravel(qry))

    return jsonify(before_date)


@app.route("/api/v1.0/range")
def range_date():
    """Return a list of min, avg, and max temp in a given date range"""
    # Query all stations within a certain range
    data = [Measurement.date, func.max(Measurement.tobs), func.min(Measurement.tobs), func.avg(Measurement.tobs)]
    qry = session.query(*data).filter(Measurement.date.between('2014-01-17', '2017-01-01')).all()
    before_date = list(np.ravel(qry))

    return jsonify(before_date)

if __name__ == '__main__':
    app.run(debug=True)