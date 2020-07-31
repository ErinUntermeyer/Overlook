import './css/base.scss';
import './images/black-tables-on-beach.jpg'
import Manager from './Manager';
import Booking from './Booking';
import domUpdates from './domUpdates'

const body = document.querySelector('body');

// event listeners
body.addEventListener('click', handleClick);

// event handlers
function handleClick(event) {
	if (event.target.classList.contains('login-button')) {
		verifyLoginCredentials(event);
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
		const usersData = dataSets[0].users;
		const roomsData = dataSets[1].rooms;
		const bookingsData = dataSets[2].bookings;
		return [usersData, roomsData, bookingsData];
	})
}

getData()
	.then(parsedData => {
		const allBookings = parsedData[2];
		const manager = new Manager(parsedData[0], allBookings);
		const allRooms = parsedData[1];
	})

function verifyCustomerId() {
	customerId = usernameInput.match(/\d+/g).map(Number);
	if (customerId < 51) {
		domUpdates.displayCustomerLandingPage();
	} else {
		domUpdates.displayErrorMessage();
	}
}

function verifyLoginCredentials(event) {
	event.preventDefault();
	const usernameInput = document.querySelector('#username').value;
	const passwordInput = document.querySelector('#password').value;
	if (usernameInput.includes('customer') && passwordInput === 'overlook2020') {
		verifyCustomerId(usernameInput);
	} else if (usernameInput === 'manager' && passwordInput === 'overlook2020') {
		domUpdates.displayManagerLandingPage();
	} else {
		domUpdates.displayErrorMessage();
	}
}