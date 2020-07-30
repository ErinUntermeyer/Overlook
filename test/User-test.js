const chai = require('chai');
const expect = chai.expect;

import User from '../src/User';
import Customer from '../src/Customer';

describe('User', function () {
	let user, badCustomer, booking1, booking2, bookings, room1, room2, rooms;

	beforeEach(function () {
		user = new User();
		badCustomer = new Customer('one', 123456);
		booking1 = {id: 1, userID: 1, date: 'today', roomNumber: 1, roomServiceCharges: []};
		booking2 = {id: 2, userID: 2, date: 'tomorrow', roomNumber: 2, roomServiceCharges: []};
		bookings = [booking1, booking2];
		room1 = {number: 1, roomType: 'suite', bidet: true, bedSize: 'king', numBeds: 2, costPerNight: 400};
		room2 = {number: 2, roomType: 'single room', bidet: false, bedSize: 'full', numBeds: 2, costPerNight: 100};
		rooms = [room1, room2];
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
		expect(user.listRoomsAvailable(bookings, rooms, 'today')).to.deep.equal([room2]);
	})

	it('should fiercely apologize if no rooms are available', function () {
		expect(user.apologizeForNoRooms('some date in the future')).to.equal('Overlook regrets to inform you that there are no rooms available for some date in the future');
	})

	it('should list all bookings for a customer', function () {
		expect(user.listBookingsById(bookings, 1)).to.deep.equal([booking1]);
	})

	it('should return total amount spent on rooms for a customer', function () {
		expect(user.retrieveTotalSpent(bookings, rooms, 1)).to.equal(400);
	})

	it('should be able to filter rooms by room type', function () {
		expect(user.filterByRoomType('suite', rooms)).to.deep.equal([room1]);
	})

})