const { generate } = require("@pdfme/generator");
const jsonTemplate = require("../templates/template.json");
const { table, text } = require("@pdfme/schemas");
const { convertData } = require("./convert.js");

const template = jsonTemplate;

exports.createPDF = async function (cardList, unitsList, motherTongue, languageToLearn) {
    let list = convertData(cardList, unitsList);

    template.schemas[0][1].head = [motherTongue, languageToLearn, "Lesson"];

    const inputs = [{
        "heading": "Phase6 Vocabulary",
        "table": list
    }]
    
    const pdf = await generate({ template, inputs, plugins: { Table: table, Text: text } });

    return Buffer.from(pdf);
}