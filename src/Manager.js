import User from '../src/User';
import Customer from '../src/Customer';

class Manager extends User {
	constructor(usersData, bookingsData) {
		super();
		this.allCustomers = this.updateAllCustomers(usersData, bookingsData);
	}

	updateAllCustomers(usersData, bookingsData) {
		return usersData.map(user => new Customer(user, bookingsData))
	}

	searchForCustomer(name) {
		if (typeof name !== 'string') {
			return 'Invalid search'
		} else {
			return this.allCustomers.find(customer => name === customer.name)
		}
	}

	getRevenueToday(bookings, rooms, date) {
		const bookedRooms = super.getRoomsBooked(bookings, date);
		return bookedRooms.reduce((totalRevenue, bookedRoom) => {
			rooms.find(room => {
				if (room.number === bookedRoom) {
					totalRevenue += room.costPerNight;
				}
			})
			return totalRevenue;
		}, 0)
	}

	getPercentRoomsOccupied(bookings, rooms, date) {
		const numberOfBookedRooms = super.getRoomsBooked(bookings, date).length;
		const numberOfRooms = rooms.length;
		return Math.floor(100 / (numberOfRooms / numberOfBookedRooms));
	}
}

export default Manager;