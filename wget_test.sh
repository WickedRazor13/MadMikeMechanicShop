#!/bin/bash
# This script assumes the docker container is already running

wget -S --header="Accept-Encoding: gzip, deflate" \
        --header='Accept-Charset: UTF-8' \
        --header='Content-Type: application/json' \
        -O response1.json --post-data \
        '{"VIN":"111111111",
        "Make":"Kia",
        "Model":"Soul",
        "Year": "2017",
        "PlateNumber":"76234",
        "PlateState":"Alabama",
        "Customer": {
          "FirstName":"William",
          "LastName":"Armistead",
          "DLNumber":"97345",
          "Address": {
            "Street":"123 Broken Dream Blvd",
            "City":"Huntsville",
            "Zip":35802}
            },
        "Problem":"Could be the alternator",
        "Shop":42,
        "AcceptDate":"6/27/2023",
        "CompleteDate":"7/1/2023",
        "Employee":"Jared Dines"}' \
         http://localhost:3000/vehicles

wget -S --header="Accept-Encoding: gzip, deflate" -O response2.json http://localhost:3000/vehicles




