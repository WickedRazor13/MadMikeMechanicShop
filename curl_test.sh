#!/bin/bash
# This script assumes the docker container is already running

curl -X POST --location "http://localhost:3000/vehicles" \
     -H "Accept: application/json" \
     -H "Content-Type: application/json" \
     -d "{
            \"VIN\": \"123456789\",
            \"Make\": \"Scion\",
            \"Model\": \"xB\",
            \"Year\": 2009,
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

curl -X GET --location "http://localhost:3000/vehicles"

curl -X GET --location "http://localhost:3000/vehicles/123456789"

curl -X GET --location "http://localhost:3000/vehicles/Scion"

curl -X GET --location "http://localhost:3000/vehicles/xB"

curl -X GET --location "http://localhost:3000/vehicles/2009"

curl -X GET --location "http://localhost:3000/vehicles/H3LL0"

curl -X GET --location "http://localhost:3000/vehicles/Alabama"

curl -X GET --location "http://localhost:3000/vehicles/Armistead"

curl -X GET --location "http://localhost:3000/vehicles/85432"

curl -X PUT --location "http://localhost:3000/vehicles/123456789" \
     -H "Accept: application/json" \
     -H "Content-Type: application/json" \
     -d "{ \"Year\": 2010 }"

curl -X GET --location "http://localhost:3000/vehicles"

curl -X DELETE --location "http://localhost:3000/vehicles/H3LL0"

curl -X GET --location "http://localhost:3000/vehicles"


# WGET testing
#wget http://localhost:3000/vehicles/Y33T

