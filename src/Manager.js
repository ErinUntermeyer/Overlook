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
}

export default Manager;