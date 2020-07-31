import './css/base.scss';
import './images/black-tables-on-beach.jpg'
import Manager from './Manager';
import Booking from './Booking';
import domUpdates from './domUpdates'

let currentCustomerId;
const body = document.querySelector('body');

// event listeners
body.addEventListener('click', handleClick);

// event handlers
function handleClick(event) {
	if (event.target.classList.contains('login-button')) {
		event.preventDefault();
		verifyLoginCredentials();
	}
}

// fetch data
function getUsersData() {
	return fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
		.then(response => response.json())
}

function getRoomsData() {
	return fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
		.then(response => response.json())
}

function getBookingsData() {
	return fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
		.then(response => response.json())
}

function getData() {
	return Promise.all([getUsersData(), getRoomsData(), getBookingsData()])
	.then(dataSets => {
		return dataSets;
	})
}

function callGetData() {
	return getData()
		.then(parsedData => {
			const usersData = parsedData[0]
			const roomsData = parsedData[1]
			const bookingsData = parsedData[2];
			if (currentCustomerId) {
				displayCustomerInfo(usersData, roomsData, bookingsData);
			} else {
				displayManagerInfo(usersData, roomsData, bookingsData);
			}
		})
}

function displayCustomerInfo(usersData, roomsData, bookingsData) {
	domUpdates.displayCustomerLandingPage();
}

function displayManagerInfo(usersData, roomsData, bookingsData) {
	domUpdates.displayManagerLandingPage();
}

function verifyLoginCredentials() {
	const usernameInput = document.querySelector('#username').value;
	const passwordInput = document.querySelector('#password').value;
	if (usernameInput.includes('customer') && passwordInput === 'overlook2020') {
		verifyCustomerId(usernameInput);
	} else if (usernameInput === 'manager' && passwordInput === 'overlook2020') {
		callGetData();
	} else {
		domUpdates.displayErrorMessage();
	}
}

function verifyCustomerId(input) {
	const customerId = input.match(/\d+/g).map(Number);
	if (customerId < 51) {
		currentCustomerId = customerId;
		callGetData();
	} else {
		domUpdates.displayErrorMessage();
	}
}

