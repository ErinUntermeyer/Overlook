import User from '../src/User';
import Customer from '../src/Customer';

class Manager extends User {
	constructor(usersData) {
		super();
		this.allCustomers = this.updateAllCustomers(usersData);
	}

	updateAllCustomers(usersData) {
		return usersData.map(user => new Customer(user));
	}

	searchForCustomer(name) {
		let input = name.toLowerCase();
		const searchResults = this.allCustomers.find(customer => input == customer.name.toLowerCase())
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