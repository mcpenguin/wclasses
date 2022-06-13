# WClasses Website and Bot

## Development

1. Download Docker and Docker Compose

2. Download the Chromedriver to your desired location: https://sites.google.com/chromium.org/driver/

3. Add the folder containing the geckodriver to your `$PATH`

4. Place respective .env files in each folder:
- `getCourseData`
- `server`

## Running Python Script

1. Run `cd getCourseData`

2. Run `pip install -r requirements.txt`

3. Run `python3 get_previous_class_schedules.py`

## Running API

1. Run `cd server`

2. Run `npm install`

3. Run `npm run build && npm start`

4. The API will be hosted on `localhost:8000`




