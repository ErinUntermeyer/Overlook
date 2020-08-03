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
		let searchResults;
		if (typeof name === 'string') {
			let input = name.toLowerCase();
			searchResults = this.allCustomers.find(customer => input === customer.name.toLowerCase());
			return searchResults;
		}
		if (searchResults === undefined) {
			return 'Invalid search'
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