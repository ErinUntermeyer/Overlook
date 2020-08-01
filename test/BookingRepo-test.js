const chai = require('chai');
const expect = chai.expect;

import BookingRepo from '../src/BookingRepo';

describe('BookingRepo', function () {
	let bookingRepo, bookingsData;

	beforeEach(function () {
		bookingsData = [
			{ id: 1, userID: 1, date: 'today', roomNumber: 1, roomServiceCharges: [] },
			{ id: 2, userID: 2, date: 'tomorrow', roomNumber: 2, roomServiceCharges: [] },
			{ id: 3, userID: 3, date: 'some date', roomNumber: 2, roomServiceCharges: [] },
			{ id: 4, userID: 2, date: 'today', roomNumber: 3, roomServiceCharges: [] }];
		bookingRepo = new BookingRepo(bookingsData);
		}),

	it('should be a function', function () {
		expect(BookingRepo).to.be.a('function');
	})

	it('should be an instance of Booking', function () {
		expect(bookingRepo).to.be.an.instanceof(BookingRepo);
	})

	it('should list all booked room', function () {
		expect(bookingRepo.getBookedRooms('today')).to.deep.equal([1, 3]);
	})


})