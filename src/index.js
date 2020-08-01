import './css/base.scss';
import './images/black-tables-on-beach.jpg'
import Manager from './Manager';
import domUpdates from './domUpdates'
import User from './User';
import BookingRepo from './BookingRepo';
const Moment = require('moment');

let currentCustomerId, currentCustomerName, currentCustomerBookings, manager;
const user = new User();
const today = new Moment().format('YYYY/MM/DD');
const body = document.querySelector('body');

// event listeners
body.addEventListener('click', handleClick);

// event handlers
function handleClick(event) {
	event.preventDefault();
	if (event.target.classList.contains('login-button')) {
		verifyLoginCredentials();
	} else if (event.target.classList.contains('search-button')) {
		getSearchResultsForManager();
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
			const usersData = parsedData[0].users;
			const roomsData = parsedData[1].rooms;
			const bookingsData = parsedData[2].bookings;
			const bookingRepo = new BookingRepo(bookingsData);
			// if (currentCustomerId) {
			// 	currentCustomerName = usersData.find(user => user.id === currentCustomerId);
			// 	currentCustomerBookings = bookingsData.listBookingsById(currentCustomerId);
			// 	displayCustomerInfo(roomsData, currentCustomerName, currentCustomerBookings);
			// } else {
			// 	displayManagerInfo(usersData, roomsData, bookingsData);
			// }
		})
}

function displayCustomerInfo(roomsData, currentCustomerName, currentCustomerBookings) {
	domUpdates.displayCustomerLandingPage();
	domUpdates.displayCustomerName(currentCustomerName);
	// domUpdates.displayCustomerSpent(currentCustomerInfo, roomsData);
	domUpdates.displayCustomerBookings(currentCustomerBookings, roomsData);
}

function displayManagerInfo(usersData, roomsData, bookingsData) {
	manager = new Manager(usersData, bookingsData);
	const dailyStats = getManagerDailyStats(bookingsData, roomsData, today);
	domUpdates.displayManagerLandingPage();
	domUpdates.displayManagerWelcome();
	domUpdates.displayDailyStatsForManager(dailyStats);
}

function verifyLoginCredentials() {
	const usernameInput = document.querySelector('#username').value;
	const passwordInput = document.querySelector('#password').value;
	if (usernameInput.includes('customer') && passwordInput === 'overlook2020') {
		verifyCustomerId(usernameInput);
	} else if (usernameInput === 'manager' && passwordInput === 'overlook2020') {
		callGetData();
	} else {
		domUpdates.displayLoginErrorMessage();
	}
}

function verifyCustomerId(input) {
	const customerId = input.match(/\d+/g).map(Number);
	if (customerId < 51) {
		currentCustomerId = customerId[0];
		callGetData();
	} else {
		domUpdates.displayLoginErrorMessage();
	}
}

function getManagerDailyStats(bookings, rooms, date) {
	// all of these now need to take in roomsBooked array from getBookedRooms(date)
	// const totalRoomsAvailable = user.listRoomsAvailable(bookings, rooms, date).length;
	// const totalRevenue = manager.getRevenueToday(bookings, rooms);
	// const percentOfOccupied = manager.getPercentRoomsOccupied(bookings, rooms);
	return [totalRoomsAvailable, totalRevenue, percentOfOccupied];
}

function getSearchResultsForManager() {
	const searchInput = document.querySelector('#search').value;
	const customerMatch = manager.searchForCustomer(searchInput);
	if (customerMatch === 'Invalid search') {
		domUpdates.displaySearchErrorMessage();
	} else {
		domUpdates.hideManagerLandingDisplay();
		domUpdates.displayMatchedCustomerName(customerMatch);
		domUpdates.displayMatchedCustomerBookings(customerMatch);
	}
}

