#Dependencies
import pandas as pd
from random import uniform
import csv
import matplotlib.pyplot as plt
import requests
import pandas as pd
import json

# Save config information
url = "http://api.openweathermap.org/data/2.5/weather?"
# lon = "-111.279592"
#lat = "42.972357"
api_key = "db9924354313017f1a2d1f43bfdc0894"

# Build list of coordinates
lon = []
lat = []
id =[]
temp = []
cloudy = []
wind = []
lon_df = []
lat_df = []
city = []

def newpoint():
    lon = str(uniform(-180,180)) 
    lat = str(uniform(-90, 90))
    return

points = (newpoint() for x in range(510))
for point in points:
  lon.append(lon)
  lat.append(lat)


points = range(len(lon))
for i in points:
  query_url = url + "appid=" + api_key + "&lat=" + str(lat[i]) + "&lon=" + str(lon[i])
  summary = requests.get(query_url).json()
  city.append(summary[0]['name'])
  id.append(summary[0]['id'])
  lat_df.append(summary[0]['coord']['lat'])
  lon_df.append(summary[0]['coord']['lon'])
  temp.append(summary[0]['main']['temp'])
  cloudy.append(summary[0]['clouds']['all'])
  wind.append(summary[0]['wind']['speed'])