---
title: 'Lesson 1 - Connect to an api.'
excerpt: '1. Locate your api key and secret inside your account settings.
  2. Review the documentation for authentication "LINK HERE"
  3. Try a request with curl or another request tool like Postman "POSTMAN LINK"
  4. The all requests will need the token attached to the headers with the key `Authorization`
  5. You will need to attach the api key to the url like this `https://api.bobiverse-learn.com`'
coverImage: ''
date: '2020-03-16T05:35:07.322Z'
author: Daniel Starling
ogImage:
  url: ''
---

# Setup your first api request

## Todo:

1. Locate your api key and secret inside your account settings.
2. Review the documentation for authentication "LINK HERE"
3. Try a request with curl or another request tool like Postman "POSTMAN LINK"
4. The all requests will need the token attached to the headers with the key `Authorization`
5. You will need to attach the api key to the url like this `https://api.bobiverse-learn.com/bobs`

Curl Example of api request - you can try this in an open terminal to make sure you have things set up correctly.

```bash
 curl -H "Authorization:{token}" https://api.bobiverse-learn.com/bobs
```

If you tried all that and got a response that looks like this back you have it set up correctly.

```json
{
    "data": [
        {
            "id": 1,
            "name": "Bob",
            "user_id": 1,
            "created_at": "2021-11-19T03:49:09.116+00:00",****
            "updated_at": "2021-11-19T03:49:09.116+00:00",
            "minerals": null,
            "location_id": 1,
            "coordinates": {
                "x": 1,
                "y": 0,
                "z": -5
            },
            "location": {
                "id": 1,
                "system": "Sol",
                "created_at": "2021-11-19T03:49:08.646+00:00",
                "updated_at": "2021-11-19T03:49:08.647+00:00"
            },
            "drones": [
                {
                    "id": 1,
                    "bob_id": 1,
                    "size": "md",
                    "job_complete_at": null,
                    "created_at": "2021-11-19T03:49:09.126+00:00",
                    "updated_at": "2021-11-19T03:49:09.126+00:00",
                    "target_id": null
                },
                {
                    "id": 2,
                    "bob_id": 1,
                    "size": "md",
                    "job_complete_at": null,
                    "created_at": "2021-11-19T03:49:09.131+00:00",
                    "updated_at": "2021-11-19T03:49:09.131+00:00",
                    "target_id": null
                }
            ]
        }
    ]
}
```


What are those drones doing just sitting around...
Lest put them to work. To send a drone to mine some minerals you will need to provide the id of the drone and the id of the mineral you want to mine. You can find both of these on the left side of your interface.


To set a drone to work you need to execute a get request to this url: https://bobiverse.herokuapp.com/api/{api_key}/drone/{drone_id}/mine/{mineral_id}


Try it out and see if you can set both drones to work. Once you have 200 minerals you can proceed to the next lesson.
