FROM python:3.10-slim
WORKDIR /app
COPY . .
RUN pip install -r requirements.txt
ENV TUNNEL_DOMAIN=""
EXPOSE 82 5000
CMD ["python", "main.py"]
