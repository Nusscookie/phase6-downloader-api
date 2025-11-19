const { convertData } = require("./convert.js");

exports.createCSV = function (cardList, unitsList) {
    let list = convertData(cardList, unitsList);

    let csvContent = list.map(listItem => {
        return `${listItem[0]}\u0009${listItem[1]}\u0009${listItem[2].replaceAll(' ', '_')}\n`;
    });

    csvContent = csvContent.toString().replaceAll(',','');
    return Buffer.from(csvContent);
}