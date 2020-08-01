const chai = require('chai');
const expect = chai.expect;

import Manager from '../src/Manager';
import Customer from '../src/Customer';

describe('Manager', function () {
	let userData1, userData2, usersData, bookingsData, roomsData,  customer1, manager, bookedRooms;
 
	beforeEach(function () {
		userData1 = { id: 1, name: 'John Smith' };
		userData2 = { id: 2, name: 'Jane Smith' };
		usersData = [userData1, userData2];
		bookingsData = [
			{ id: 1, userID: 1, date: 'today', roomNumber: 1, roomServiceCharges: [] },
			{ id: 2, userID: 2, date: 'tomorrow', roomNumber: 2, roomServiceCharges: [] },
			{ id: 3, userID: 3, date: 'some date', roomNumber: 3, roomServiceCharges: [] }];
		roomsData = [
			{ number: 1, roomType: 'suite', bidet: true, bedSize: 'king', numBeds: 2, costPerNight: 400 },
			{ number: 2, roomType: 'single room', bidet: false, bedSize: 'full', numBeds: 2, costPerNight: 100 }];
		customer1 = new Customer(userData1, bookingsData);
		manager = new Manager(usersData, bookingsData);
		bookedRooms = [1];
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

	it('should only take in a string for a name', function () {
		expect(manager.searchForCustomer(32)).to.equal('Invalid search');
	})

	it('should get total revenue for today', function () {
		expect(manager.getRevenueToday(bookedRooms, roomsData, 'today')).to.equal(400);
	})

	it('should get percent of occupied rooms for today', function () {
		expect(manager.getPercentRoomsOccupied(bookingsData, roomsData, 'today')).to.equal(50);
	})

})