const { createPDF } = require("./pdf.js");
const { createAPKG } = require("./anki.js");
const { createCSV } = require("./csv.js");

exports.fetchData = async function (req, res) {
    const { cardList, unitsList, motherTongue, languageToLearn } = req.body;
    const { filetype } = req.params;

    if (!cardList) {
        res.status(418).send({ response: "empty" });
        return;
    }

    if (filetype == "pdf-data") {

        res.set("Content-Type", "application/octet-stream");
        res.send(await createPDF(cardList, unitsList, motherTongue, languageToLearn))
        console.log("POST /pdf-data: PDF DATA SENT")

    } else if (filetype == "anki-data") {

        res.set("Content-Type", "application/octet-stream");
        res.send(await createAPKG(cardList, unitsList))
        console.log("POST /anki-data: ANKI DATA SENT")

    } else if (filetype == "csv-data") {

        res.set("Content-Type", "application/octet-stream");
        res.send(createCSV(cardList, unitsList))
        console.log("POST /csv-data: CSV DATA SENT")

    } else {
        res.send({
            response: "Unknown json string"
        });
    }
}