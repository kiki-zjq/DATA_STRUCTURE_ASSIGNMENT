const fs = require('fs')

const main = function(fileName) {
    fs.readFile(fileName, 'utf8', (err, res) => {
        let [total, data] = handleData(res);
        data.sort((a, b) => a[0] - b[0]);
        let contri = +Infinity;
        // Calculate the unique contribute for each safeguard. And find the minimum contribute.
        for (let i = 0; i < data.length; i++) {
            let leftOverlap = rightOverlap = 0;
            if (i !== 0) leftOverlap = calcLeftOverlap(data[i - 1], data[i]);
            if (i !== data.length - 1) rightOverlap = calcRightOverlap(data[i], data[i + 1]);
            let curContri = data[i][1] - data[i][0] - leftOverlap - rightOverlap;
            contri = Math.min(contri, curContri);
            if (contri <= 0) {
                contri = 0;
                break;
            };
        }
        // Calculate the total time can be covered if we can hire all safeguards.
        let sum = data[0][1] - data[0][0];
        for (let i = 1; i < data.length; i++) {
            sum += data[i][1] - data[i][0];
            if (data[i][0] < data[i -1][1]) {
                sum -= data[i - 1][1] - data[i][0]; 
            }
        }
    
        // Reduce the minimum contribute
        outputFile(fileName, sum - contri);
    })
}

const handleData = function(data) {
    
    const total = data.split('\n')[0];
    let input = [];

    let dat = data.split('\n').slice(0);
    for (let i = 1; i < dat.length; i++) {
        let d = dat[i];
        input.push(d.split(' ').map(v => Number(v)));
    }
    input = input.filter(a => a.length === 2);
    return [total, input];
}

const calcRightOverlap = function(cur, next) {
    let overlap = Math.max(0, cur[1] - next[0]);
    return overlap;
}
const calcLeftOverlap = function(prev, cur) {
    let overlap = Math.max(0, prev[1] - cur[0]);
    return overlap;
}
const outputFile = function(fileName, value) {
    let outputName = fileName.replace('in', 'out');
    outputName = outputName.replace('in', 'out');
    fs.writeFile(outputName, value, (err, res) => {
        if (err) {
            console.log('Something went wrong when output file', err);
        } else {
            console.log(`Output file: ${outputName} success!`);
        }
    });
}

const init = function() {
    for (let i = 1; i <= 10; i++) {
        let fileName = `./input/${i}.in`;
        main(fileName);
    }
}

init();