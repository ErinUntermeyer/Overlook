const chai = require('chai');
const expect = chai.expect;

import Customer from '../src/Customer';

describe('Customer', function() {
	let userData1, userData2, badUserData, bookingsData, customer1, customer2, badCustomer;

	beforeEach(function() {
		userData1 = { id: 1, name: 'John Smith' };
		userData2 = { id: 2, name: 'Jane Smith' };
		badUserData = { id: 'one', name: 123 };
		bookingsData = [
			{ id: 1, userID: 1, date: 'today', roomNumber: 1, roomServiceCharges: [] },
			{ id: 2, userID: 2, date: 'tomorrow', roomNumber: 2, roomServiceCharges: [] },
			{ id: 3, userID: 3, date: 'some date', roomNumber: 3, roomServiceCharges: [] }]
		customer1 = new Customer(userData1, bookingsData)
		customer2 = new Customer(userData2, bookingsData)
		badCustomer = new Customer(badUserData, bookingsData);
	})

	it('should be a function', function() {
		expect(Customer).to.be.a('function');
	})

	it('should be an instance of Customer', function() {
		expect(customer1).to.be.an.instanceof(Customer);
	})

	it('should only take in valid data types', function() {
		expect(badCustomer.id).to.equal(0);
		expect(badCustomer.name).to.equal('Invalid');
		expect(badCustomer.bookings).to.deep.equal([]);
	})

})