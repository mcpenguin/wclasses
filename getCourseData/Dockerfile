FROM python:3

WORKDIR /usr/src/app

COPY requirements.txt /tmp
WORKDIR /tmp
RUN pip install --no-cache-dir -r requirements.txt
COPY . .

CMD [ "python", "./get_previous_class_schedules.py" ]