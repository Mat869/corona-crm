const express = require('express');
const bodyParser = require('body-parser');
const isEmail = require('./utils/is-email');
const isFullName = require('./utils/is-full-name');
const app = express();


app.use(express.static('public')); // to overcome CORS
app.use(bodyParser.urlencoded({extended: true})); // to make the app able to read requests with json 
app.use(bodyParser.json()); // to make the app able to read requests with json 


let customers = [];

app.put('/customer', (req, res) => {
    if(! validateCustomer(req.body.fullName, req.body.email)) {
        res.status(400).send();
        return;
    }
	const index = customers.push({
		id: customers.length + 1,
		fullName: req.body.fullName,
		email: req.body.email,
		birthDate: req.body.birthDate,
		notes: req.body.notes
	});
	res.status(201).json(customers[index]);
});

app.get('/customer', (req, res) => {
	res.json(customers);
});

app.post('/customer/:id', (req, res) => {
	const requestedCustomer = customers.find(customer => {
		return customer.id === parseInt(req.params.id);
	});

	if(! requestedCustomer) {
		res.sendStatus(404);
		return;
	}

	if(! validateCustomer(req.body.fullName, req.body.email)) {
		res.sendStatus(400);
		return;
	}

	const index = customers.indexOf(requestedCustomer);
	customers[index] = {
        id: index + 1,
		fullName: req.body.fullName,
		email: req.body.email,
		birthDate: req.body.birthDate,
		notes: req.body.notes
	};
	res.json(customers[index]);
});

app.delete('/customer/:id', (req, res) => {
	const requestedCustomer = customers.find(customer => {
		return customer.id === parseInt(req.params.id);
	});

	if(!requestedCustomer) {
		res.sendStatus(404);
		return;
	}

	const index = customers.indexOf(requestedCustomer);
	customers.splice(index, 1);
	res.json(requestedCustomer);
});

function validateCustomer(fullName, email) {
	return isFullName(fullName) && isEmail(email);
}

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);