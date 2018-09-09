const express = require('express');
const app = express();

var port = process.env.PORT || 5000;

app.get('//riot.txt', (req, res) => {
    return res.sendFile(__dirname + '/riot.txt');
});

app.listen(port, (err) => {
    if (err) console.log(err);

    console.log('Aplicação web rodando! Porta: ' + port);
});