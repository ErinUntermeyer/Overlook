import User from '../src/User';
import Customer from '../src/Customer';

class Manager extends User {
	constructor(usersData) {
		super();
		this.allCustomers = usersData.map(user => new Customer(user.id, user.name))
	}

	searchForCustomer(name) {
		return this.allCustomers.find(customer => name);
	}

	getRevenueToday(bookings, rooms, date) {
		const bookedRooms = super.getRoomsBooked(bookings, date);
		return bookedRooms.reduce((totalRevenue, bookedRoom) => {
			rooms.forEach(room => {
				if (room.number === bookedRoom) {
					totalRevenue += room.costPerNight;
				}
			})
			return totalRevenue;
		}, 0)	
	}
}

export default Manager;