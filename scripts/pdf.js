const { generate } = require("@pdfme/generator");
const jsonTemplate = require("../templates/template.json");
const { table, text } = require("@pdfme/schemas");
const { convertData } = require("./convert.js");

const template = jsonTemplate;

exports.createPDF = async function (cardList, unitsList) {
    let list = convertData(cardList, unitsList);

    const inputs = [{
        "heading": "Phase6 Vocabulary",
        "table": list
    }]
    
    const pdf = await generate({ template, inputs, plugins: { Table: table, Text: text } });

    return pdf;
}