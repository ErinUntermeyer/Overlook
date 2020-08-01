class BookingRepo {
	constructor(bookingsData) {
		this.bookings = bookingsData;
	}

	sortBookingsByDate() {
		return this.bookings.sort((a, b) => new Date(b.date) - new Date(a.date));
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

	getPastBookings(date) {
		
	}

	getFutureBookings(date) {

	}

	listBookingsById(id) {
		return this.bookings.filter(booking => booking.userID === id);
	}
}

export default BookingRepo;