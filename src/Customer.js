import User from '../src/User';
import Booking from './Booking';

class Customer extends User {
	constructor(usersData, bookingsData) {
		super();
		this.id = super.checkDataType(usersData.id, 'number');
		this.name = super.checkDataType(usersData.name, 'string');
		this.bookings = this.updateCustomerBookings(bookingsData, this.id);
	}

	updateCustomerBookings(bookingsData, id) {
		const customerBookings = super.listBookingsById(bookingsData, id)
		return customerBookings.map(booking => new Booking(booking))
	}
}

export default Customer;