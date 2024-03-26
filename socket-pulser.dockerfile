FROM python:3.8
WORKDIR /app
COPY . /app

CMD ["python", "socket-pulser.py"]

# Expose ports
EXPOSE 4146
EXPOSE 4147



