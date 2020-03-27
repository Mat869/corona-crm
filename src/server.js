const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const validation = require('./validation');
const port = 3000;

app.use(express.static('public')); // to overcome CORS
app.use(bodyParser.urlencoded({extended: true})); // to make the app able to read requests with json 
app.use(bodyParser.json()); // to make the app able to read requests with json 


let customers = [];

app.get('/', (req, res) => {
	res.send('hello');
});

app.put('/customer', (req, res) => {
    //console.log(req.body);
    if(!validation(req.body.name, req.body.email, req.body.birthdate, req.body.creationDate, req.body.notes, req.body.overEighteen)) {
        res.status(400).send();
        return;
    }
    customers.push({
        id: users.length + 1,
        name: req.body.name,
		email: req.body.email,
		birthdate: req.body.birthdate,
		creationDate: null,
		notes: req.body.notes,
		overEighteen: false
    });
    res.status(201).send();
});

app.get('/customer/', (req, res) => {
    res.json(customers);
});

app.get('/customer/:id', (req, res) => {
    const requestedCustomer = customers.find(customer => { 
        return customer.id === parseInt(req.params.id); 
    });
    if (!requestedCustomer) { 
        res.status(404).send();
        return;
    }
    res.status(200).json(requestedCustomer);
});

app.post('/customer/:id', (req, res) => {
    const requestedCustomer = customers.find(customer => {
        return customer.id === parseInt(req.params.id);
    });
    if(!requestedCustomer) {
        res.status(404).send();
        return;
    }
    res.status(200).send();
});

app.delete('/customer/:id', (req, res) => {
    const requestedCustomer = customers.find(customer => {
        return customer.id === parseInt(req.params.id);
    });
    if (!requestedCustomer) {
        res.status(404).send();
        return;
    }
    const index = customers.indexOf(requestedCustomer);
    customers.splice(index, 1);
    res.status(204).send();
});

app.listen(port, () => {
	console.log('App is listening on port ' + port);
});