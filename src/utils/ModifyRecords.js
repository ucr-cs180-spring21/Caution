function updateValue(data, updateInfo) {
    let id = updateInfo[0];
    let attribute = updateInfo[1];
    let newValue = updateInfo[2];

    let attributeIndex;

    switch (attribute) {
        case "traffic_signal":
            attributeIndex = 43;
            break;
        case "weather_condition":
            attributeIndex = 31;
            break;
        case "humidity":
            attributeIndex = 25;
            break;
        case "severity":
            attributeIndex = 3;
            break;
        case "timezone":
            attributeIndex = 20;
            break;
        case "city":
            attributeIndex = 15;
            break;
        case "airport":
            attributeIndex = 21;
            break;
        case "pressure":
            attributeIndex = 26;
            break;
    }

    for (let i = 0; i < data.length; i++) {
        if (data[i][0] == id) {
            data[i][attributeIndex] = newValue;
        }
    }
}

function deleteRecord(data, id) {
    for(let i = 0; i < data.length; i++) {
        if (data[i][0] == id){
            data.splice(i, 1);
        }
    }
}

function insertRecord(data, newRecord) {
    newRecord.splice(0, 0, 'A-' + data.length);
    data.push(newRecord);
}

exports.updateValue = updateValue;
exports.deleteRecord = deleteRecord;
exports.insertRecord = insertRecord;