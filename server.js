const express = require("express");
const app = express();
const cors = require('cors');
const { fetchData } = require("./scripts/fetch-data.js");
const port = 3000;

app.use(express.json({ limit: '50mb' }));
app.use(cors())

app.post('/:filetype', (req, res) => {
    fetchData(req, res);
});

app.listen(port, () => console.log("server on port " + port));