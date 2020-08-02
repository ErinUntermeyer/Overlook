import './css/base.scss';
import './images/black-tables-on-beach.jpg'
import Manager from './Manager';
import domUpdates from './domUpdates'
import User from './User';
import BookingRepo from './BookingRepo';
const Moment = require('moment');

let customerId, customerName, customerBookings, manager, usersData, roomsData, bookingRepo, availableRooms;

const user = new User();
const today = new Moment().format('YYYY/MM/DD');
const body = document.querySelector('body');
const filterButtons = document.querySelector('.filter-buttons');

// event listeners
body.addEventListener('click', handleClick);

// event handlers
function handleClick(event) {
	if (event.target.classList.contains('login-button')) {
		event.preventDefault();
		verifyLoginCredentials();
	} else if (event.target.classList.contains('search-button')) {
		event.preventDefault();
		getSearchResultsForManager();
	} else if (event.target.classList.contains('availability-button')) {
		checkAvailability();
	} else if (event.target.classList.contains('filter-button')) {
		event.preventDefault();
		filterRoomOnClick();
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
	.catch(error => console.log(error));
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
		const customerSpent = (user.retrieveTotalSpent(customerBookings, roomsData)).toFixed(2);
		domUpdates.hideManagerLandingPage();
		domUpdates.displayMatchedCustomerName(customerMatch, customerSpent);
		domUpdates.displayMatchedCustomerBookings(customerBookings, roomsData);
	}
}

function getDateSelected() {
	const calendarInput = document.querySelector('#customer-calendar').value;
	return calendarInput.split('-').join('/');
}

function checkAvailability() {
	const dateSelected = getDateSelected();
	const bookedRooms = bookingRepo.getBookedRooms(dateSelected);
	availableRooms = user.listRoomsAvailable(bookedRooms, roomsData, dateSelected);
	domUpdates.displayAvailableRoomsToBook(availableRooms);
}

function filterRoomOnClick() {
	if (event.target.id === 'res') {
		availableRooms = user.filterByRoomType('residential suite', availableRooms);
		domUpdates.displayFilteredList(availableRooms);
	} else if (event.target.id === 'suite') {
		availableRooms = user.filterByRoomType('suite', availableRooms);
		domUpdates.displayFilteredList(availableRooms);
	} else if (event.target.id === 'single') {
		availableRooms = user.filterByRoomType('single room', availableRooms);
		domUpdates.displayFilteredList(availableRooms);
	} else if (event.target.id === 'junior') {
		availableRooms = user.filterByRoomType('junior suite', availableRooms);
		domUpdates.displayFilteredList(availableRooms);
	}
}