const express = require("express");
const app = express();
const cors = require('cors');
const port = 3000;

app.use(express.json());
app.use(cors())

app.post('/pdf-data', (req, res) => {
    const { pdfData } = req.body;

    if (!pdfData) {
        res.status(418).send({ response: "empty" });
        return;
    }

    res.send({
        response: pdfData[2],
    })
});

app.listen(port, () => console.log("server on port " + port));