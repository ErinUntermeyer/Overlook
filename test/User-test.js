const chai = require('chai');
const expect = chai.expect;

import User from '../src/User';
import Customer from '../src/Customer';

describe('User', function () {
	let user, userData1, bookingsData, roomsData, badUserData, badCustomer, bookedRooms;

	beforeEach(function () {
		user = new User();
		userData1 = { id: 1, name: 'John Smith' };
		bookingsData = [
			{ id: 1, userID: 1, date: 'today', roomNumber: 1, roomServiceCharges: [] },
			{ id: 2, userID: 2, date: 'tomorrow', roomNumber: 2, roomServiceCharges: [] },
			{ id: 3, userID: 3, date: 'some date', roomNumber: 3, roomServiceCharges: [] }];
		roomsData = [
			{ number: 1, roomType: 'suite', bidet: true, bedSize: 'king', numBeds: 2, costPerNight: 400 },
			{ number: 2, roomType: 'single room', bidet: false, bedSize: 'full', numBeds: 2, costPerNight: 100 }];
		badUserData = { id: 'one', name: 123 };
		badCustomer = new Customer(badUserData, bookingsData);
		bookedRooms = [1];
	})

	it('should be a function', function () {
		expect(User).to.be.a('function');
	})

	it('should return default value for invalid data types', function () {
		expect(badCustomer.id).to.equal(0);
		expect(badCustomer.name).to.equal('Invalid');
		expect(badCustomer.bookings).to.deep.equal([]);
	})

	it('should list all rooms available for a day', function () {
		expect(user.listRoomsAvailable(bookedRooms, roomsData, 'today')).to.deep.equal([roomsData[1]]);
	})

	it('should fiercely apologize if no rooms are available', function () {
		expect(user.apologizeForNoRooms('some date in the future')).to.equal('Overlook regrets to inform you that there are no rooms available for some date in the future');
	})

	it('should list all bookings for a customer', function () {
		expect(user.listBookingsById(bookingsData, userData1.id)).to.deep.equal([bookingsData[0]]);
	})

	it('should return total amount spent on rooms for a customer', function () {
		expect(user.retrieveTotalSpent(bookingsData, roomsData, 1)).to.equal(400);
	})

	it('should be able to filter rooms by room type', function () {
		expect(user.filterByRoomType('suite', roomsData)).to.deep.equal([roomsData[0]]);
	})

})