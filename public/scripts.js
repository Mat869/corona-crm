const API_URL = 'https://serene-mesa-70759.herokuapp.com';
const newCustomerForm = document.getElementById('new-customer-form');
const customerList = document.getElementById('customer-list');
const editCustomerForm = document.getElementById('edit-customer-form');

refreshCustomerList();

newCustomerForm.addEventListener('submit', (e) => {
	e.preventDefault();

	if(! validate(newCustomerForm)) {
		return;
	}

	createCustomer({
		fullName: newCustomerForm.fullName.value,
		email: newCustomerForm.email.value,
		birthDate: newCustomerForm.birthDate.value,
		notes: newCustomerForm.notes.value
	}).then(refreshCustomerList)
		.catch(console.log);
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

function openEditCustomerModal(customer) {
	openModal();
	editCustomerForm.setAttribute('id', customer.id);
	console.log(editCustomerForm.id);
}

function getCustomers() {
	return fetch(API_URL + '/customer');
}

function refreshCustomerList() {
	getCustomers()
		.then(res => res.json())
		.then(customers => {
			customerList.innerHTML = '';
			customers.forEach((customer, i) => {
				const row = buildCustomerRow(customer, i);
				customerList.appendChild(row);
			});
		})
		.catch(console.log);
}

function buildCustomerRow(customer, i) {
	const row = document.createElement('tr');
	row.innerHTML = `
		<td>${i + 1}</td>
		<td>${customer.fullName}</td>
		<td>${customer.email}</td>
		<td>${customer.birthDate}</td>
		<td>---</td>
		<td class="">
            <button class="btn btn-sm btn-edit"><i class="bx bx-sm bx-edit" id="editBtn" ></i></button>
            <button class="btn btn-sm btn-delete"><i class="bx bx-sm bx-trash" id="trashBtn" ></i></button>
        </td>`;
	row.querySelector('.btn-edit').addEventListener('click', () => {
		console.log(customer);
		openEditCustomerModal(customer);
	});
	row.querySelector('.btn-delete').addEventListener('click', () => {
		deleteCustomer(customer.id)
			.then(refreshCustomerList)
			.catch(console.log);
	});
	return row;
}

editCustomerForm.addEventListener('submit', (e) => {
	e.preventDefault();

	if(! validate(editCustomerForm)) {
		return;
	}
	editCustomer({
		id: editCustomerForm.id,
		fullName: editCustomerForm.fullName.value,
		email: editCustomerForm.email.value,
		birthDate: editCustomerForm.birthDate.value,
		notes: editCustomerForm.notes.value
	}).then(refreshCustomerList)
		.catch(console.log);
	
	closeModal();
});

function editCustomer(customer) {
	return fetch(API_URL + `/customer/${customer.id}`, {
		method: 'POST',
		body: JSON.stringify(customer),
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

function deleteCustomer (customerId){
	return fetch(API_URL + `/customer/${customerId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		}
	});
}