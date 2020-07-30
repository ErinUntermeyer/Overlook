class Customer {
	constructor(id, name) {
		this.id = this.checkDataType(id, 'number');
		this.name = this.checkDataType(name, 'string');
		this.bookings = this.checkDataType([], 'object');
	}

	checkDataType(attribute, dataType) {
		return typeof attribute === dataType ? attribute : this.giveDefaultValue(dataType);
	}

	giveDefaultValue(dataType) {
		switch(dataType) {
			case 'number':
				return 0;
				break;
			case 'string':
				return 'Invalid';
				break;
			case 'object':
				return [];
				break;
		}
	}
}

export default Customer;