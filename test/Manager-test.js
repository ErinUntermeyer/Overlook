const chai = require('chai');
const expect = chai.expect;

import Manager from '../src/Manager';
import Customer from '../src/Customer';

describe('Manager', function () {
	let customer1, customer2, usersData, manager, booking1, booking2, bookings, room1, room2, rooms;

	beforeEach(function () {
		customer1 = new Customer(1, 'John Smith');
		customer2 = new Customer(2, 'Jane Smith');
		usersData = [customer1, customer2]
		manager = new Manager(usersData);
		booking1 = { id: 1, userID: 1, date: 'today', roomNumber: 1, roomServiceCharges: [] };
		booking2 = { id: 2, userID: 2, date: 'today', roomNumber: 2, roomServiceCharges: [] };
		bookings = [booking1, booking2];
		room1 = { number: 1, roomType: 'suite', bidet: true, bedSize: 'king', numBeds: 2, costPerNight: 400 };
		room2 = { number: 2, roomType: 'single room', bidet: false, bedSize: 'full', numBeds: 2, costPerNight: 100 };
		rooms = [room1, room2];
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

	it('should search for a customer by name', function () {
		expect(manager.searchForCustomer('John Smith')).to.deep.equal(customer1);
	})

	it('should get total revenue for today', function () {
		expect(manager.getRevenueToday(bookings, rooms, 'today')).to.equal(500);
	})

})