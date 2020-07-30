const chai = require('chai');
const expect = chai.expect;

import Customer from '../src/Customer';

describe('Customer', function() {
	let customer, badCustomer;

	beforeEach(function() {
		customer = new Customer(1, 'John Smith');
		badCustomer = new Customer('one', 123456);
	})

	it('should be a function', function() {
		expect(Customer).to.be.a('function');
	})

	it('should be an instance of Customer', function() {
		expect(customer).to.be.an.instanceof(Customer);
	})

	it('should only take in valid data types', function() {
		expect(badCustomer.id).to.equal(0);
		expect(badCustomer.name).to.equal('Invalid');
		expect(badCustomer.bookings).to.deep.equal([]);
	})

})