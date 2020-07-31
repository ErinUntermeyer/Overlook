import './css/base.scss';
import './images/black-tables-on-beach.jpg'
import Manager from './Manager';
import Booking from './Booking';

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
		const manager = new Manager(parsedData[0]);
		const allRooms = parsedData[1];
		const allBookings = parsedData[2].map(item => new Booking(item));
	})