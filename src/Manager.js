import User from '../src/User';
import Customer from '../src/Customer';

class Manager extends User {
	constructor(usersData, bookingsData) {
		super();
		this.allCustomers = this.updateAllCustomers(usersData, bookingsData);
	}

	updateAllCustomers(usersData) {
		return usersData.map(user => new Customer(user));
	}

	searchForCustomer(name) {
		const searchResults = this.allCustomers.find(customer => name === customer.name)
		if (searchResults === undefined || typeof name !== 'string') {
			return 'Invalid search'
		} else {
			return searchResults;
		}
	}

	getRevenueToday(bookedRooms, rooms) {
		return bookedRooms.reduce((totalRevenue, bookedRoom) => {
			rooms.find(room => {
				if (room.number === bookedRoom) {
					totalRevenue += room.costPerNight;
				}
			})
			return totalRevenue;
		}, 0)
	}

	getPercentRoomsOccupied(bookedRooms, rooms) {
		const numberOfBookedRooms = bookedRooms.length;
		return Math.floor(100 / (rooms.length / numberOfBookedRooms));
	}
}

export default Manager;