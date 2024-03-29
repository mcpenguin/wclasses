# python script to get previous years' class schedules

from bs4 import BeautifulSoup

from helpers import parse_time_string, parse_term_code
from datetime import datetime
import pytz

# %%
from pymongo import MongoClient
import os
from dotenv import load_dotenv

import itertools
from tqdm import tqdm

# python script to get uwflow metrics

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from selenium.webdriver.chrome.options import Options

import chromedriver_autoinstaller

load_dotenv()

# UW_FLOW_URL = 'https://uwflow.com/course'
# num of seconds before timeout

subjectCode = None
catalogNumber = None
tmp_subjectCode = 'ACC'

url = "https://cs.uwaterloo.ca/cscf/teaching/schedule/expert"
TIMEOUT = 2

def process_subject_data(term, level, subject, soup):
    mainClassTable = soup.find('table', {'border': '2'}).find('tbody')

    # if query has no matches, move on
    if mainClassTable == None:
        # print("No classes for subject {} for term {}".format(SUBJECT, TERM))
        raise Exception("No classes for subject {} for level {} for term {}".format(subject, level, term))

    # otherwise, get iterator for children of main table
    mainClassTableChildren = mainClassTable.findChildren("tr", recursive=False)

    # course contains a list of classes
    course = {}
    # classesList is a list of classes (for a particular course)
    classesList = []

    for child in mainClassTableChildren:
    
        children = child.findChildren(recursive=False)

        # if tr is a header row, add course to classes and reinitialize the course object
        if children[0].name == 'th':
            # add course to course list if course is not empty
            if course.get('subjectCode', None) != None:
                classesList.extend(classes)

            # reinitialize course
            course = {
                'term': term,
                'level': 'UG' if level == "under" else 'G' 
            }
            # add last updated time to course
            course['dateUpdated'] = datetime.now(pytz.timezone('US/Eastern'))

        # if tr is a course data row, add details to the course object
        elif children[0].name == 'td' and len(children) > 2:
            course['subjectCode'] = children[0].text.strip()
            course['catalogNumber'] = children[1].text.strip()
            course['units'] = children[2].text.strip()
            course['title'] = children[3].text.strip()

        # if tr is a course notes row, add notes to the current course object
        elif children[0].name == 'td' and len(children) == 1:
            course['notes'] = children[0].text

        # if tr is a course classes row, initialize classes list and iterate over the class table to 
        # add the classes to the course
        elif children[0].name == 'td' and len(children) == 2:
            classes = []
            class_soup = BeautifulSoup(str(children[1]), 'html.parser')
            classTableRows = class_soup.find('table').find_all('tr')

            for row in classTableRows:
                indiv_class_soup = BeautifulSoup(str(row), 'html.parser')
                # if table row is not a class (ie it is just headers or notes), we ignore it  
                # we do this by checking the first element of the table row's children, as that is the class number
                # if the number is not a number, it cannot be a class, so we can ignore it
                if indiv_class_soup.find('th') != None or not indiv_class_soup.find_all('td')[0].text.strip().isnumeric():
                    continue
                
                # otherwise, the table row is a class, and so we add it to the classes list for the courses
                else:
                    subchildren = indiv_class_soup.find_all('td')

                    # parse time and room
                    time = subchildren[10].text.strip() if len(subchildren) >= 11 else None
                    room = subchildren[11].text.strip() if len(subchildren) >= 12 else None

                    # room = (building code) (room number)
                    try:
                        [buildingCode, roomNumber] = room.split()
                    except:
                        [buildingCode, roomNumber] = ["", ""]
                    # HH:MM-HH:MM(days)[MM/DD-MM/DD]
                    parsedTime = parse_time_string(time)

                    enrolCap = subchildren[6].text.strip() if len(subchildren) >= 7 else None
                    enrolTotal = subchildren[7].text.strip() if len(subchildren) >= 8 else None

                    if len(subchildren) >= 2:
                        section = subchildren[1].text.strip()
                        sectionAsList = section.split()
                        filter(None, section)
                        sectionAsObject = {
                            'type': sectionAsList[0],
                            'num': sectionAsList[1]
                        }
                    else:
                        sectionAsObject = None

                    if len(subchildren) >= 3:
                        campusLocation = subchildren[2].text.strip()
                        campusLocationAsList = campusLocation.split()
                        filter(None, campusLocation)
                        campusLocationAsObject = {
                            'first': campusLocationAsList[0],
                            'second': campusLocationAsList[1]
                        }
                    else:
                        campusLocationAsObject = None
                    
                    classes += [{
                        **course,
                        'classNumber': subchildren[0].text.strip() if len(subchildren) >= 1 else None,
                        'section': sectionAsObject,
                        'campusLocation': campusLocationAsObject,
                        'enrolCap': int(enrolCap) if enrolCap else None,
                        'enrolTotal': int(enrolTotal) if enrolCap else None,
                        'time': parsedTime,
                        'buildingCode': buildingCode,
                        'roomNumber': roomNumber,
                        'instructor': subchildren[12].text.strip() if len(subchildren) >= 13 else None,
                    }]

        # otherwise, the tr is an undefined row, and we ignore it
        else:
            pass

    # add final course
    if course.get('subjectCode', None) != None:
        classesList.extend(classes)

    return classesList

def add_subject_to_db(term, level, subject, classesList, client):
    delete_query = {
        'term': term,
        'subjectCode': subject,
        'level': 'UG' if level == "under" else 'G'
    }
    client[os.getenv('DB_NAME')][os.getenv('DB_COLLECTION_COURSES')].delete_many(delete_query)

    # insert new data
    client[os.getenv('DB_NAME')][os.getenv('DB_COLLECTION_COURSES')].insert_many(classesList)

# start_term: term to start at
def get_previous_class_schedule(driver, client, start_term=None, specific_terms=None):
    driver.get(url)
    # wait for page to load
    WebDriverWait(driver, TIMEOUT).until(
            EC.presence_of_element_located((By.NAME, "select")))

    # switch to select form frame
    driver.switch_to.frame(0)
    # get page source of select form
    soup = BeautifulSoup(driver.page_source, 'html.parser')

    # get list of terms, levels and subjects
    # list of termcodes
    terms = [option.attrs['value'] for option in soup.find('select', {'name': 'sess'}).find_all('option')]

    if start_term is not None:
        terms = list(filter((lambda term: int(term) <= int(start_term)), terms)) 
    elif specific_terms is not None:
        terms = specific_terms

    # list of levels (undergrad or grad)
    levels = [option.attrs['value'] for option in soup.find('select', {'name': 'level'}).find_all('option')]
    # list of subject codes (get if non empty)
    subjects = [option.attrs['value'] for option in soup.find('select', {'name': 'subject'}).find_all('option') if option.attrs['value']]

    pbar = tqdm(list(itertools.product(terms, levels, subjects)))

    # iterate over product of terms, levels, subjects
    for (term, level, subject) in pbar:
        pbar.set_postfix(term=parse_term_code(term), level='UG' if level == 'under' else 'G', subject=subject)
        # select relevant term, level, subject from the relevant dropdown lists
        term_option = driver.find_element_by_css_selector(f"option[value='{term}']")
        term_option.click()
        level_option = driver.find_element_by_css_selector(f"option[value='{level}']")
        level_option.click()
        subject_option = driver.find_element_by_css_selector(f"option[value='{subject}']")
        subject_option.click()
        # submit the form
        driver.find_element_by_css_selector(f"input[type='submit']").click()

        # switch frame to result frame
        driver.switch_to.default_content()
        driver.switch_to.frame(1)
        
        # do processing on the subject
        try:
            class_soup = BeautifulSoup(driver.page_source, "html.parser")
            # get classes list
            classesList = process_subject_data(term, level, subject, class_soup)
            # add classesList list to db
            add_subject_to_db(term, level, subject, classesList, client)

            # print(f"Added courses for subject {subject} for term {term} for level {'UG' if level == 'under' else 'G'}")
        except Exception as e:
            pass

        # once done, switch back to the form frame
        driver.switch_to.default_content()
        driver.switch_to.frame(0)

    return

if __name__ == '__main__':
    # get mongodb database using mongo client
    client = MongoClient(os.getenv('MONGO_WRITER_URL'))
    print("Connected to client")

    print("Installing ChromeDriver...")
    chromedriver_autoinstaller.install()

    # get all courses from mongo client
    collection = client[os.getenv('DB_NAME')][os.getenv('DB_COLLECTION_COURSE_DESCRIPTIONS')]
    courses = list(collection.find({}, {'subjectCode': 1, 'catalogNumber': 1,
                '_id': 0}).sort([('subjectCode', 1), ('catalogNumber', 1)]))

    chrome_options = Options()
    chrome_options.add_argument("--headless")
    driver = webdriver.Chrome(options=chrome_options)
    try:
        print("Driver up and running")
        get_previous_class_schedule(driver, client, start_term=os.getenv("CUSTOM_START_TERM"))
    finally:
        driver.close()

