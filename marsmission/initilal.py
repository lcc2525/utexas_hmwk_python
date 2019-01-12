
#%%
# Dependencies
from bs4 import BeautifulSoup
import requests
from splinter import Browser
import pandas as pd
from selenium import webdriver


#%%
# url = 'https://mars.nasa.gov/news/?page=0&per_page=40&order=publish_date+desc%2Ccreated_at+desc&search=&category=19%2C165%2C184%2C204&blank_scope=Latest'
url = 'https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars'

response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')
soup


#%%
# click through hemisspere and store large image
url = 'https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars'
executable_path = {'executable_path': 'chromedriver.exe'}
browser = Browser('chrome', **executable_path, headless=False)

browser.visit(url)
# html= browser.find_element_by_xpath("""//*[@id="product-section"]/div[2]/div[1]/a/img""")
# html.text
# browser.find_by_id('product-section')
# browser.click_link_by_class('link_id')
# browser.click_link_by_id("results")
WebElement elem = driver.findElement(By.xpath("""//*[@id="product-section"]/div[2]/div[1]/a/img"""));
JavascriptExecutor executor = (JavascriptExecutor)driver;
executor.executeScript("arguments[0].click();", elem);


#%%
executable_path = {'executable_path': 'chromedriver.exe'}
browser = Browser('chrome', **executable_path, headless=False)

browser.visit(url)
# from selenium.webdriver.common.keys import Keys #need to send keystrokesWebDriverWait wait2 = new WebDriverWait(driver, 10);
# wait2.until(ExpectedConditions.elementToBeClickable(By.href("")));
browser.click_link_by_partial_href("/search/map/Mars/Viking/cerberus_enhanced")


#%%
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.events import EventFiringWebDriver as EwC
driver = webdriver.Chrome("C://Users/lcc25/repos/utexas_hmwk_python/marsmission/chromedriver.exe")
driver.get(url)


# element = WebDriverWait(driver,30).until(EwC.find_elements_by_partial_link_text('https://astrogeology.usgs.gov/search/map/Mars/Viking/cerberus_enhanced'))


#%%
url


#%%
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

wait = WebDriverWait(driver, 10)
driver.findElement(By.cssSelector("input:contains(^description$)")).click();
# element = wait.until(EC.element_to_be_clickable((By.XPATH, '//*[@id="product-section"]/div[2]/div[1]/a')))
# element.click()

# Driver.findElement(By.xpath("//li[contains(.,'Add Dexter')]//input[@type='checkbox']")).click();


#%%
all_names = soup.find_all('a', class_='href')
for x in all_names:
    print(x.get('search'))


#%%



(/*[@id="wide-image"]/img)
<img class="wide-image" src="/cache/images/cfa62af2557222a02478f1fcd781d445_cerberus_enhanced.tif_full.jpg">


#%%
from bs4 import BeautifulSoup
import requests
from urllib.request import urlopen
import re
 
html_page = urlopen("https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars")
soup = BeautifulSoup(html_page, 'lxml')
links = []
 
for link in soup.findAll('a', attrs={'href': re.compile("^http://")}):
    links.append(link.get('href'))
 
print(links)


#%%
# browser.click_link_by_partial_href("/search/map/Mars/Viking/cerberus_enhanced")
elem = browser.find_element_by_xpath("//*[@id="product-section"]/div[2]/div[1]/a")
# JavascriptExecutor executor = (JavascriptExecutor)driver;
# executor.executeScript("arguments[0].click();", ele);
# //*[@id="product-section"]/div[2]/div[1]/a
#  #product-section > div.collapsible.results > div:nth-child(1) > a


#%%
WebElement parent = driver.findElement(By.xpath("//a/li"));
WebElement date = parent.findElement(By.xpath("div/span[contains(@class, 'child-date')]"));
WebElement date = parent.findElement(By.xpath("//span[contains(@class, 'child-date')]"));


