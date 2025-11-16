const initSqlJs = require('sql.js');
const { Deck, Model, Package } = require('genanki-js');
const { convertData, getUnitNames } = require("./convert.js");
const crypto = require('crypto');

let SQL = null;
let db = null;

exports.createAPKG = async function (cardList, unitsList) {
    await initDb();
    return await createPackage(cardList, unitsList);
}

async function initDb() {
    SQL = await initSqlJs({
        locateFile: file => './templates/sql-wasm.wasm'
    });
    db = new SQL.Database();
}

async function createPackage(cardList, unitsList) {
    // Ensure SQL is initialized
    if (!SQL) {
        await initDb();
    }

    let list = convertData(cardList, unitsList);
    let unitNames = getUnitNames();
    let ankiPackage = new Package();
    ankiPackage.setSqlJs(db);

    let standardModel = new Model({
        name: "Basic",
        id: "1762166912130",
        flds: [
            { name: "Front" },
            { name: "Back" }
        ],
        req: [
            [0, "all", [0]],
        ],
        tmpls: [
            {
                name: "Card",
                qfmt: "{{Front}}",
                afmt: "{{Front}}\n\n<hr id=answer>\n\n{{Back}}",
            },
        ],
    });

    for (let name of unitNames) {
        let deckId = Date.now() - Math.floor(unitNames.indexOf(name)*Math.PI^2); // oh yaay
        let firstName = "";
        let secondName = "";
        let deckName = "";
        let tag = name.replaceAll(' ', '_');

        if (name.includes('|')) {
            firstName = name.split('|').shift().trim();
            secondName = name.split('|').pop().trim();
            deckName = `Deck::${firstName}::${secondName}`;
        } else if (name.includes('-')) {
            firstName = name.split('-').shift().trim();
            secondName = name.split('-').pop().trim();
            deckName = `Deck::${firstName}::${secondName}`;
        } else {
            deckName = `Deck::${name}`;
        }

        let deck = new Deck(deckId, deckName);
        let filteredCards = list.filter(card => card[2] === name);

        for (let card of filteredCards) {
            let guid = Date.now() - Math.floor(filteredCards.indexOf(card)*Math.E^2);
            deck.addNote(standardModel.note([card[0], card[1]], [tag], guid));
        }

        ankiPackage.addDeck(deck);
    }

    const ankiPackageBuffer = await ankiPackage.writeToBuffer();

    return ankiPackageBuffer;
}