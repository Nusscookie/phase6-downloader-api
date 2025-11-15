const { htmlToText } = require('html-to-text');

let cardsObject = null;
let unitsObject = null;
let units = [];

exports.convertData = function(cardList, unitsList) {
    try {
        cardsObject = Array.from(cardList.replyContent.cards);
        unitsObject = Array.from(unitsList.replyContent.units);
    } catch (error) {
        // outputField.textContent = `Invalid JSON data`;
        console.error("Error parsing JSON data:", error);
        return;
    }

    let cards = cardsObject.map(card => {
        return [card.cardContent.question.split("[").shift(), card.cardContent.answer.split("[").shift(), card.unitIdToOwner.id];
    });

    units = unitsObject.map(unit => {
        return [unit.unitId.id, unit.unitContent.name];
    });

    let list = cards.map(card => {
        let unitName = units.find(unit => unit[0] === card[2])[1];

        // if (unitName.includes("\u00A0")) {
        //     unitName = unitName.replaceAll("\u00A0", '');
        // }

        unitName = removeNBSP(unitName);

        if (card[0].includes("<") || card[1].includes("<")) {
            card[0] = htmlToText(card[0]);
            card[1] = htmlToText(card[1]);
        }

        return [card[0], card[1], unitName];
    });

    return list;
    // console.log(list)
}

exports.getUnitNames = function() {
    let unitsNames = units.map(unit => {
        return removeNBSP(unit[1]);
    });
    return unitsNames;
}

function removeNBSP(string) {
    try {
        if (string.includes("\u00A0")) {
            string = string.replaceAll("\u00A0", '');
            return string;
        } else {
            return string;
        }
    } catch (error) {
        // outputField.textContent = `Value provided to remove non-breaking spaces isn't a string`;
        console.error("Value provided to remove non-breaking spaces isn't a string:", error);
    }

}