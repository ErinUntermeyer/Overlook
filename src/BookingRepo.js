const Moment = require('moment')

class BookingRepo {
	constructor(bookingsData) {
		this.bookings = bookingsData;
	}

	sortBookingsByDate() {
		return this.bookings.sort((a, b) => new Moment(b.date).format('YYYYMMDD') - new Moment(a.date).format('YYYYMMDD'));
	}

	getBookedRooms(date) {
		const bookedRooms = [];
		this.bookings.forEach(booking => {
			if (booking.date === date) {
				bookedRooms.push(booking.roomNumber);
			}
		})
		return bookedRooms;
	}

	getPastBookings(today) {
		return this.bookings.filter(booking => booking.date < today);
	}

	getFutureBookings(today) {
		return this.bookings.filter(booking => booking.date > today);
	}

	listBookingsById(id) {
		return this.bookings.filter(booking => booking.userID === id);
	}
}

export default BookingRepo;