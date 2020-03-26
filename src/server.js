const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(express.static('public')); // to overcome CORS
app.use(bodyParser.urlencoded({extended: true})); // to make the app able to read requests with json 
app.use(bodyParser.json()); // to make the app able to read requests with json 

app.get('/', (req, res) => {
	res.send('hello');
});

app.listen(port, () => {
	console.log('App is listening on port ' + port);
});