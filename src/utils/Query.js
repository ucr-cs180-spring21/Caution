let queries = [
    {
        name: "traffic_signal_true",
        columnIndex: 43,
        value: "TRUE"
    },
    {
        name: "weather_condition_light_snow",
        columnIndex: 31,
        value: "Light Snow"
    },
    {
        name: "humidity_100%",
        columnIndex: 25,
        value: "100"
    },
    {
        name: "severity_3/3",
        columnIndex: 3,
        value: "3"
    },
    {
        name: "timezone_us/eastern",
        columnIndex: 20,
        value: "US/Eastern"
    },
    {
        name: "city_dayton",
        columnIndex: 15,
        value: "Dayton"
    },
    {
        name: "airport_kday",
        columnIndex: 21,
        value: "KDAY"
    },
    {
        name: "pressure_29.61_in",
        columnIndex: 26,
        value: "29.61"
    }
];

function queryRecords(data, queryType) {
    let returnData;

    if (queryType == "all_records") {
        returnData = data;
    } else {
        for (q of queries) {
            if (q.name == queryType) {
                returnData = getQueryResults(data, q.columnIndex, q.value);
                break;
            }
        }
    }

    return returnData;
}

function getQueryResults(data, columnIndex, value) {
    var returnData = []

    for(let i = 0; i < data.length; i++) {
        if (data[i][columnIndex] == value){
            returnData.push(data[i]);
        }
    }

    return returnData;
}

exports.queryRecords = queryRecords;