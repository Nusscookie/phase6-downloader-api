const { createPDF } = require("./pdf.js");
const { createAPKG } = require("./anki.js");

exports.fetchData = async function (req, res) {
    const { cardList, unitsList } = req.body;
    const { filetype } = req.params;

    if (!cardList) {
        res.status(418).send({ response: "empty" });
        return;
    }

    if (filetype == "pdf-data") {

        res.send({
            response: await createPDF(cardList, unitsList)
        });

    } else if (filetype == "anki-data") {

        res.send({
            response: await createAPKG(cardList, unitsList)
        });


    } else {
        res.send({
            response: "Unknown json string"
        });
    }
}