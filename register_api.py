import requests

url = "https://j5e885m040.execute-api.us-east-2.amazonaws.com/login/sign"
data = {
    "name": "Pabll",
    "last_name": "WebXR",
    "email": "pabll@webxr.com",
    "password": "password123"
}

try:
    response = requests.post(url, json=data)
    print("Status Code:", response.status_code)
    print("Response:", response.text)
except Exception as e:
    print("Error:", e)
