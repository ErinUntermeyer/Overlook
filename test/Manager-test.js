const chai = require('chai');
const expect = chai.expect;

import Manager from '../src/Manager';
import Customer from '../src/Customer';

describe('Manager', function () {
	let customer1, customer2, usersData, manager;

	beforeEach(function () {
		customer1 = new Customer(1, 'John Smith');
		customer2 = new Customer(2, 'Jane Smith');
		usersData = [customer1, customer2]
		manager = new Manager(usersData);
	})

	it('should be a function', function () {
		expect(Manager).to.be.a('function');
	})

	it('should be an instance of Manager', function () {
		expect(manager).to.be.an.instanceof(Manager);
	})

	it('should hold all Customer instances', function () {
		expect(manager.allCustomers[0]).to.be.an.instanceof(Customer);
		expect(manager.allCustomers[1]).to.be.an.instanceof(Customer);
	})

	it('should be able to search for a customer by name', function () {
		expect(manager.searchForCustomer('John Smith')).to.deep.equal(customer1);
	})

})