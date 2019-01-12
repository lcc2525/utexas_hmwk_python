from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import scrape_mars


app = Flask(__name__)


mongo = PyMongo(app, uri="mongodb://localhost:27017/scrapemars_app")


@app.route('/')
def index():
    mars_scape = mongo.db.marsscrape.find_one()
    return render_template('index.html', marsscrape = marsscrape)


@app.route('/scrape')
def scrape():
    marsscrape = mongo.db.marsscrape
    data = scrape_mars.scrape()
    marsscrape.update(
        {},
        data,
        upsert=True
    )
    return redirect("/", code=302)

if __name__ == "__main__":
    app.run(debug=True)    