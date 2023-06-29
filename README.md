# CS 453 Project 1
Zachary Armistead

## Running
This server supplies the basic routes for Mad Mike's Mechanic Shop

GET /vehicles - fetch all vehicles

POST /vehicles - create a new vehicle

GET /vehicles/{param} - fetch specific vehicle(s) based on parameter

PUT /vehicles/{param} - update specific vehicle based on parameter

DELETE /vehicles/{param} - delete specific vehicle based on parameter

You can see how it's structured in the vehicles.yaml openapi 3.0 spec. 

To run, 

```shell
docker-compose build 
```
this will pull the express image and pull the mongo image if need be. 
```shell
docker-compose up
```
This will start the two containers (express app & mongo)

To make sure its working got to [http://localhost:3000/vehicles](http://localhost:3000/vehicles)

You can creat a new vehicle with curl 
```shell
curl -X POST --location "http://localhost:3000/vehicles" \
     -H "Accept: application/json" \
     -H "Content-Type: application/json" \
     -d "{
            \"VIN\": \"123456789\",
            \"Make\": \"Scion\",
            \"Model\": \"xB\",
            \"Year\": \"2009\",
            \"PlateNumber\": \"H3LL0\",
            \"PlateState\": \"Alabama\",
            \"Customer\": {
              \"FirstName\": \"Zach\",
              \"LastName\":\"Armistead\",
              \"DLNumber\":\"85432\",
              \"Address\": {
                \"Street\": \"123 Street Rd\",
                \"City\": \"Huntsville\",
                \"Zip\": 35802
              }
            },
            \"Problem\": \"Could be the alternator\",
            \"Shop\": 40,
            \"AcceptDate\":\"6/27/2023\",
            \"CompleteDate\":\"6/29/2023\",
            \"Employee\": \"Jared Dines\"
        }"
```

And to fetch vehicles
```shell
curl -X GET --location "http://localhost:3000/vehicles"
```

To close the containers, you can hit ctrl^c in the terminal you started it in or 
```shell
docker-compose down -v 
```
## Project Explanation

With the container running, the following files can be used to test functionality of the Mad Mike's Mechanic Shop API:

_**[curl_test.sh](curl_test.sh)**_ will run curl request tests for all routes with all possible parameters.

_**[wget_test.sh](wget_test.sh)**_ will run a POST and GET request and save the responses in _**response1.json**_ and **_response2.json_** respectively

_**[test.http](test.http)**_ has the http requests I used for testing. I ran the tests individually from the file in my IDE.

_**[Project 1.postman_collection.json](Project%201.postman_collection.json)**_ can be imported into Postman to load more requests used for testing.

