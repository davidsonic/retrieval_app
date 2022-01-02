import requests
import json


url = 'https://rxlfm8bjh0.execute-api.us-east-1.amazonaws.com/test/torchservedensenet'

myobj = {'url': "https://s3.amazonaws.com/model-server/inputs/kitten.jpg"}
x = requests.post(url, data=json.dumps(myobj))
print(x.content)