# Dependencies
from bs4 import BeautifulSoup
import requests
from splinter import Browser
import pandas as pd



def scrape():

    # create mars_data dict that can be inserted into mongo
    marsscrape = {}
    # Read HTML from file
    # Create a Beautiful Soup object
    url = 'https://mars.nasa.gov/news/?page=0&per_page=40&order=publish_date+desc%2Ccreated_at+desc&search=&category=19%2C165%2C184%2C204&blank_scope=Latest'
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    # print(soup)

    # scrape for article title and teaser
    news_title = soup.find('div', class_="content_title").text
    news_p = soup.find('div', class_="rollover_description_inner").text

    # use splinter to click through website and find Featured Image
    # set up chromedriver open browser
    executable_path = {'executable_path': 'chromedriver.exe'}
    browser = Browser('chrome', **executable_path, headless=False)
    url = 'https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars'
    browser.visit(url)
    # splinter find image jet populsion
    #find and click full image button
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
    print(featured_image_url)

    # Visit Mars Weather scrape tweeter and find latest weather tweet
    url2 = 'https://twitter.com/marswxreport?lang=en/'
    response = requests.get(url2)
    soup = BeautifulSoup(response.text, 'html.parser')
    mars_weather = soup.find('p', class_='tweet-text').text

    # Scrap table using pandas for Mars facts
    # form as a table label as dataFrame convert to html
    url = 'https://space-facts.com/mars/'
    tables = pd.read_html(url)
    df = tables[0]
    # df.head()
    html_table = df.to_html()

    # setup dictionary
    marsscrape["news_title"] = news_title
    marsscrape["news_p"] = news_p
    marsscrape["mars_weather"] = mars_weather
    marsscrape["html_table"] = html_table
    marsscrape["featured_image_url"] = featured_image_url

    return marsscrape
