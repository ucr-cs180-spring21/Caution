// all data
var data = []
// each line
var obj = []
let match


const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('data/test.csv')
});

lineReader.on('line', function (line) {
    var splitter = new RegExp(/[^,]+/,'g')
    
    
    //data.push({txt: match[2]})
    
    
    console.log('Line from file:', line);
    //match = splitter.exec(line)

    while ((match = splitter.exec(line)) !== null) {
        //console.log(`Found ${match[0]} start=${match.index} end=${splitter.lastIndex}.`);
        obj.push(match[0])
        // expected output: "Found football start=6 end=14."
        // expected output: "Found foosball start=16 end=24."
    }
    data.push(obj)
    console.log(data)
    obj = []
});



// var data = ["David", "Cynthia", "Raymond"]


// for(var i = 0; i < 10; i++){

// }

//  /((?:-)*\d+(?:[-.]\d+)*(?:[ :]\d+)*)|(\w+(?:[- \/]\w+)*(?:[.])*)/gm

// var line = data.readline()

// console.log(line)