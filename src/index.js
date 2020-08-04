import './css/base.scss';
import './images/black-tables-on-beach.jpg'
import User from './User';
import Manager from './Manager';
import BookingRepo from './BookingRepo';
import domUpdates from './domUpdates'
import fetchData from './fetchData'
const Moment = require('moment');

let availableRooms, bookingRepo, currentUser, customerBookings, customerId, customerName, dateSelected, manager, roomsData, usersData;

const user = new User();
const today = new Moment().format('YYYY/MM/DD');

// event listeners
const body = document.querySelector('body');
body.addEventListener('click', handleClick);

// event handlers
function handleClick(event) {
	if (event.target.classList.contains('login-button')) {
		event.preventDefault();
		verifyLoginCredentials();
		assignCurrentUser();
	} else if (event.target.classList.contains('search-button')) {
		event.preventDefault();
		getSearchResultsForManager();
	} else if (event.target.classList.contains('calendar')) {
		document.querySelector('.availability-button').disabled = false;
	} else if (event.target.classList.contains('availability-button')) {
		getAllAvailableRooms();
	} else if (event.target.classList.contains('filter-button')) {
		getFilteredRooms();
	} else if (event.target.classList.contains('try-again')) {
		determineHomePage();
	} else if (event.target.classList.contains('reserve')) {
		addABooking();
	} else if (event.target.classList.contains('log-out')) {
		logOut();
	} else if (event.target.classList.contains('delete')) {
		deleteBooking(retrieveBookingId());
		domUpdates.displayDeleteConfirmation();
	}
}

// POST data
function formatBookingData() {
	const bookingData = {
		userID: customerId,
		date: dateSelected,
		roomNumber: getRoomCardClicked()
	}
	return bookingData;
}

function postBooking() {
	fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(formatBookingData())
	})
}

// DELETE data
function deleteBooking(id) {
	fetchData.getData()
		.then(parsedData => {
			usersData = parsedData[0].users;
			roomsData = parsedData[1].rooms;
			bookingRepo = new BookingRepo(parsedData[2].bookings);
			fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
						"id": id
					})
			})
		})
}

// login page
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
	return fetchData.getData()
		.then(parsedData => {
			usersData = parsedData[0].users;
			roomsData = parsedData[1].rooms;
			bookingRepo = new BookingRepo(parsedData[2].bookings);
			if (customerId) {
				customerName = usersData.find(user => user.id === customerId).name;
				customerBookings = bookingRepo.sortBookingsByDate(bookingRepo.listBookingsById(customerId));
				displayCustomerInfo(customerName, customerBookings);
			} else {
				displayManagerInfo();
			}
		})
}

function assignCurrentUser() {
	if (customerId) {
		currentUser = 'customer'
	} else {
		currentUser = 'manager'
	}
}

function logOut() {
	window.location.reload();
}

// display functions
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
		customerBookings = bookingRepo.sortBookingsByDate(bookingRepo.listBookingsById(customerId));
		const customerSpent = (user.retrieveTotalSpent(customerBookings, roomsData)).toFixed(2);
		domUpdates.hideManagerLandingPage();
		domUpdates.displayMatchedCustomerName(customerMatch, customerSpent);
		getMatchedCustomerBookings(customerBookings, roomsData);
	}
}

function getMatchedCustomerBookings(customerBookings, roomsData) {
	const pastBookings = bookingRepo.getPastBookings(today, customerBookings);
	const futureBookings = bookingRepo.getFutureBookings(today, customerBookings);
	domUpdates.displayFutureBookings(futureBookings, roomsData);
	domUpdates.displayPastBookings(pastBookings, roomsData);
}

function getAllAvailableRooms() {
	fetchData.getData()
		.then(parsedData => {
			usersData = parsedData[0].users;
			roomsData = parsedData[1].rooms;
			bookingRepo = new BookingRepo(parsedData[2].bookings);
			availableRooms = checkAvailability();
			if (availableRooms) {
				domUpdates.displayAvailableRoomsToBook(availableRooms);
			}
		})
}

function getFilteredRooms() {
	const roomTypeSelected = getRoomTypeClicked();
	if (roomTypeSelected === 'all-rooms') {
		domUpdates.resetAvailableRoomsDisplay();
	} else {
		availableRooms = checkAvailability();
		const filteredAvailable = user.filterByRoomType(roomTypeSelected, availableRooms);
		domUpdates.displayFilteredList(filteredAvailable);
	}
}

function checkAvailability() {
	dateSelected = getDateSelected();
	const bookedRooms = bookingRepo.getBookedRooms(dateSelected);
	if (bookedRooms.length < 25) {
		return user.listRoomsAvailable(bookedRooms, roomsData, dateSelected);
	} else {
		apologizeForAvailability();
	}
}

function apologizeForAvailability() {
	const apologyMessage = user.apologizeForNoRooms();
	domUpdates.displayApology(apologyMessage);
}

function resetCheckAvailability() {
	displayCustomerInfo(customerName, customerBookings);
}

function getDateSelected() {
	let calendarInput;
	if (currentUser === 'customer') {
		calendarInput = document.querySelector('#customer-calendar').value;
	} else {
		calendarInput = document.querySelector('#manager-calendar').value;
	}
	return calendarInput.split('-').join('/');
}

function getRoomTypeClicked() {
	const roomType = event.target.id;
	return roomType;
}

function getRoomCardClicked() {
	const button = event.target;
	const roomNumberText = button.closest('.available-rooms-to-book').children[1].innerText;
	return roomNumberText.match(/\d+/g).map(Number)[0];
}

function addABooking() {
	postBooking();
	domUpdates.displaySuccessMessage();
}

function retrieveBookingId() {
	const roomNumberElement = event.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling;
	const roomNumber = roomNumberElement.innerText.match(/\d+/g).map(Number)[0];
	const dateBooked = roomNumberElement.previousElementSibling.previousElementSibling.innerText
	const futureBookings = bookingRepo.getFutureBookings(today, customerBookings);
	const matchedBooking = futureBookings.find(booking => booking.roomNumber === roomNumber && booking.date.includes(dateBooked.slice(0, 5)))
	return parseInt(matchedBooking.id)
}

function determineHomePage() {
	fetchData.getData()
		.then(parsedData => {
			usersData = parsedData[0].users;
			roomsData = parsedData[1].rooms;
			bookingRepo = new BookingRepo(parsedData[2].bookings);
			customerBookings = bookingRepo.sortBookingsByDate(bookingRepo.listBookingsById(customerId))
			if (currentUser === 'customer') {
				resetCheckAvailability();
			} else {
				getSearchResultsForManager();
			}
		})
}