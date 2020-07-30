import User from '../src/User';

class Customer extends User {
	constructor(id, name) {
		super();
		this.id = super.checkDataType(id, 'number');
		this.name = super.checkDataType(name, 'string');
		this.bookings = super.checkDataType([], 'object');
	}
}

export default Customer;