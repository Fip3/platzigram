var express = require('express');
var app = express();

app.get('/', function(req,res){
	res.send('Hola mundo');
})

app.listen(3000,function(err){
	if (err) return console.log('ERROR'), process.exit(1);

	console.log('Platzigram escuchando al puerto 3000');
})