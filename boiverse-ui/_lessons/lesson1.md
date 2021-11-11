---
title: 'Lesson 1 - Connect to an api.'
excerpt: '1. Locate your api key and secret inside your account settings.
  2. Review the documentation for authentication "LINK HERE"
  3. Try a request with curl or another request tool like Postman "POSTMAN LINK"
  4. The all requests will need the api_secret attached to the headers with the key `x-api-secret`
  5. You will need to attach the api key to the url like this `https://bobiverse.herokuapp.com/api/{api_key}/drones`'
coverImage: ''
date: '2020-03-16T05:35:07.322Z'
author: Daniel Starling
ogImage:
  url: ''
---

# Setup your first api request

## Todo:

<p>&nbsp;</p>
1. Locate your api key and secret inside your account settings.
<p>&nbsp;</p>
2. Review the documentation for authentication "LINK HERE"
<p>&nbsp;</p>
3. Try a request with curl or another request tool like Postman "POSTMAN LINK"
<p>&nbsp;</p>
4. The all requests will need the api_secret attached to the headers with the key `x-api-secret`
<p>&nbsp;</p>
5. You will need to attach the api key to the url like this `https://bobiverse.herokuapp.com/api/{api_key}/drones`
<p>&nbsp;</p>
<hr/>
<p>&nbsp;</p>
Curl Example of api request - you can try this in an open terminal to make sure you have things set up correctly.
<p>&nbsp;</p>

```bash
 curl -H "x-api-secret:{api_secret}" https://bobiverse.herokuapp.com/api/{api_key}/drones
```

<p>&nbsp;</p>
If you tried all that and got a response that looks like this back you have it set up correctly.
<p>&nbsp;</p>

```json
{
  "drones": [
    {
      "id": 1,
      "variant": "miner",
      "action": "resting",
      "created_at": "2021-04-27T00:16:26.437Z",
      "updated_at": "2021-04-27T00:16:26.437Z"
    },
    {
      "id": 2,
      "variant": "miner",
      "action": "resting",
      "created_at": "2021-04-27T00:16:26.470Z",
      "updated_at": "2021-04-27T00:16:26.470Z"
    }
  ]
}
```

<p>&nbsp;</p>

What are those drones doing just sitting around...
Lest put them to work. To send a drone to mine some minerals you will need to provide the id of the drone and the id of the mineral you want to mine. You can find both of these on the left side of your interface.

<p>&nbsp;</p>

To set a drone to work you need to execute a get request to this url: https://bobiverse.herokuapp.com/api/{api_key}/drone/{drone_id}/mine/{mineral_id}

<p>&nbsp;</p>

Try it out and see if you can set both drones to work. Once you have 200 minerals you can proceed to the next lesson.
