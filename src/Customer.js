import User from '../src/User';

class Customer extends User {
  constructor(userData) {
    super();
    this.id = super.checkDataType(userData.id, 'number');
    this.name = super.checkDataType(userData.name, 'string');
  }
}

export default Customer;