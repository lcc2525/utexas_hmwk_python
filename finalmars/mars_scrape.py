# Dependencies
from bs4 import BeautifulSoup
import requests
from splinter import Browser
import pandas as pd

def init_browser():
    # @NOTE: Replace the path with your actual path to the chromedriver
    executable_path = {"executable_path": "/chromedriver"}
    return Browser("chrome", **executable_path, headless=False)

def scrape():
    browser = init_browser()
    # create mars_data dict that we can insert into mongo
    mars_data = {}
    
    
    # Scrape for Mars news
    url = "https://mars.nasa.gov/news/"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    news_title = soup.find('div', class_="content_title").text
    news_p = soup.find('div', class_="rollover_description_inner").text
    # print news and text
    # print(news_title, news_p)
    # splinter find image jet populsion
    #find and click full image button
    url = 'https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars'
    browser.visit(url)
    browser.click_link_by_partial_text('FULL IMAGE')
    # establish beautiful soup and scape for image
    html = browser.html
    soup = BeautifulSoup(html, 'html.parser')
    
    # Parse beautiful soup and parse to form website
    imag = str(soup.find(class_='carousel_item'))
    imagUrl = imag.split('url' )[1].split('\n')
    imagUrl1 = imagUrl[0].split("/")
    
    # perform iteration on string, parse what is needed
    imag4 = imagUrl1[4].split('-')
    imgUrl3 = "https://www.jpl.nasa.gov"
    featured_image_url = imgUrl3 + "/" + imagUrl1[1] + "/" + imagUrl1[2] + "/largesize/" + imag4[0] +  "_hires.jpg"
    # Print url
    # print(featured_image_url)

    # Visit Mars Weather scrape tweeter and find latest weather tweet
    url2 = 'https://twitter.com/marswxreport?lang=en/'
    response = requests.get(url2)
    soup = BeautifulSoup(response.text, 'html.parser')
    mars_weather = soup.find('p', class_='tweet-text').text
    #  print weather tweet
    #  mars_weather

    # Scrap table using pandas for Mars facts
    # form as a table label as dataFrame convert to html
    url = 'https://space-facts.com/mars/'
    tables = pd.read_html(url,  index_col=0)

    df = tables[0]
    
    # df.head()
    html_table = df.to_html()
    html_table.replace('\n', '')
    #   html_table

    # setup dictionary with hemisphere urls (website (https://astrogeology.usgs.gov/) down using google)
    hemisphere_image_urls = [
        {"title": "Valles Marineris Hemisphere", "img_url": "https://photojournal.jpl.nasa.gov/jpeg/PIA00003.jpg"},
        {"title": "Cerberus Hemisphere", "img_url": "https://photojournal.jpl.nasa.gov/jpeg/PIA00091.jpg"},
        {"title": "Schiaparelli Hemisphere", "img_url": "https://photojournal.jpl.nasa.gov/jpeg/PIA00004.jpg"},
        {"title": "Syrtis Major Hemisphere", "img_url": "https://photojournal.jpl.nasa.gov/jpeg/PIA00092.jpg"},
    ]

    #  use data to compile information from scrape
    mars_scrape = {}
    # setup dictionary
    mars_scrape = {
        "news_title" : news_title,
        "news_p" : news_p,
        "featured_image_url" : featured_image_url,
        "mars_weather" : mars_weather,
        "html_table" : html_table,
        "hemisphere_image_urls" : hemisphere_image_urls
    }
    
        # mars_scrape["news_title"] = news_title
        # mars_scrape["news_p"] = news_p
        # mars_scrape["mars_weather"] = mars_weather
        # mars_scrape["html_table"] = html_table
        # mars_scrape["hemisphere_image_urls"] = hemisphere_image_urls
    
    browser.quit()
    return mars_scrape
