const API_URL = 'http://localhost:3000';
const newCustomerForm = document.getElementById('new-customer-form');

newCustomerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if(! validate(newCustomerForm)) {
        return;
    }

    createCustomer({
        name: newCustomerForm.name.value,
        email: newCustomerForm.email.value,
        birthdate: newCustomerForm.birthdate.value,
        notes: newCustomerForm.notes.value
    });

});

function createCustomer(customer) {
    return fetch(API_URL + '/customer', {
        method: 'PUT',
        body: JSON.stringify(customer),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

function validate(form) {
    if(! form.overEighteen.checked) {
        return false;
    }
    return true;
}