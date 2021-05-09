var fs = require('fs')

function process(data, path) {
    const lineReader = require('readline').createInterface({
        input: fs.createReadStream(path)
    })

    lineReader.on('line', function (line) {
        var splitter = new RegExp(/[^,]+/,'g')
        let match;
        let obj = [];
        while ((match = splitter.exec(line)) !== null) {
            obj.push(match[0])
        }

        data.push(obj)
    }).on('close', function() {
        data.splice(0, 1);
    });
}

function backup(data) {
    //let csvContent = "data:text/csv;charset=utf-8,";
    let csvContent;

    data.forEach(function(rowArray) {
        let row = rowArray.join(",");
        csvContent += row + "\r\n";
    });

    let stream = fs.createWriteStream("data/backup.csv");
    stream.write(csvContent);
}

exports.process = process;
exports.backup = backup;