# Get class schedule data from classes.uwaterloo.ca (both undergrad + grad), store into MongoDB database
# Takes about 20 minutes to run once

from helpers import get_default_term, get_last_term_code
from pymongo import MongoClient
import os
from dotenv import load_dotenv

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from selenium.webdriver.chrome.options import Options

import chromedriver_autoinstaller

from get_previous_class_schedules import get_previous_class_schedule

# take env vars from .env file
load_dotenv()

if __name__ == '__main__':
    # get mongodb database using mongo client
    client = MongoClient(os.getenv('MONGO_WRITER_URL'))

    print("Installing ChromeDriver...")
    chromedriver_autoinstaller.install()

    # get all courses from mongo client
    collection = client[os.getenv('DB_NAME')][os.getenv('DB_COLLECTION_COURSES')]
    
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    driver = webdriver.Chrome(options=chrome_options)
    print("Driver up and running.")

    try:
        CURRENT_TERM = get_default_term()
        LAST_TERM = get_last_term_code(CURRENT_TERM)
        get_previous_class_schedule(driver, client, specific_terms=[LAST_TERM, CURRENT_TERM])
    finally:
        driver.close()

