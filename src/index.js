import './css/base.scss';
import './images/black-tables-on-beach.jpg'
import Manager from './Manager';
import domUpdates from './domUpdates'
import User from './User';
import BookingRepo from './BookingRepo';
const Moment = require('moment');

let customerId, customerName, customerBookings, manager, usersData, roomsData, bookingRepo;

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
	const customerIdInput = input.match(/\d+/g).map(Number);
	if (customerIdInput < 51) {
		customerId = customerIdInput[0];
		callGetData();
	} else {
		domUpdates.displayLoginErrorMessage();
	}
}

function callGetData() {
	return getData()
		.then(parsedData => {
			usersData = parsedData[0].users;
			roomsData = parsedData[1].rooms;
			bookingRepo = new BookingRepo(parsedData[2].bookings);
			if (customerId) {
				customerName = usersData.find(user => user.id === customerId).name;
				customerBookings = bookingRepo.listBookingsById(customerId);
				displayCustomerInfo(customerName, customerBookings);
			} else {
				displayManagerInfo();
			}
		})
}

function displayCustomerInfo(customerName, customerBookings) {
	domUpdates.displayCustomerLandingPage();
	domUpdates.displayCustomerDetails(customerName, customerBookings, roomsData);
}

function displayManagerInfo() {
	manager = new Manager(usersData);
	const dailyStats = getManagerDailyStats(bookingRepo, roomsData, today);
	domUpdates.displayManagerLandingPage();
	domUpdates.displayManagerWelcome();
	domUpdates.displayDailyStatsForManager(dailyStats);
}

function getManagerDailyStats(date) {
	const bookedRooms = bookingRepo.getBookedRooms(date);
	const totalRoomsAvailable = user.listRoomsAvailable(bookedRooms, roomsData, date).length;
	const totalRevenue = manager.getRevenueToday(bookedRooms, roomsData);
	const percentOfOccupied = manager.getPercentRoomsOccupied(bookedRooms, roomsData);
	return [totalRoomsAvailable, totalRevenue, percentOfOccupied];
}

function getSearchResultsForManager() {
	const searchInput = document.querySelector('#search').value;
	const customerMatch = manager.searchForCustomer(searchInput);
	if (customerMatch === 'Invalid search') {
		domUpdates.displaySearchErrorMessage();
	} else {
		customerId = customerMatch.id;
		customerBookings = bookingRepo.listBookingsById(customerId);
		domUpdates.hideManagerLandingDisplay();
		domUpdates.displayMatchedCustomerName(customerMatch);
		domUpdates.displayMatchedCustomerBookings(customerBookings, roomsData);
	}
}