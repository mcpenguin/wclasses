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

### Running Locally
1. Run `cd server`

2. Run `npm install`

3. Run `npm run build && npm start`

4. The API will be hosted on `localhost:8000`

### Running on Docker

1. Download Docker and Docker Compose

2. Run `docker-compose up`

3. The API will be hosted on `localhost:8000`

## Notes

MongoDB runs really slowly if we are using it in Next.js directly instead of a separate service, so we need to separate the API and front end layers.

Run locally first - right now, `www` uses models from `server`, and currently, the way things are configured, the 

### TODO
- Add `concurrently` to run server and www together, add `tsc-watch` to server
- Set dockerfile + docker compose to run the server and www IN THE SAME CONTAINER rather than separately so we can reuse types


