const chai = require('chai');
const expect = chai.expect;

import BookingRepo from '../src/BookingRepo';

describe('BookingRepo', function () {
	let bookingRepo, bookingsData;

	beforeEach(function () {
		bookingsData = [
			{ id: 1, userID: 1, date: '2020/06/09', roomNumber: 1, roomServiceCharges: [] },
			{ id: 2, userID: 2, date: '2020/05/01', roomNumber: 2, roomServiceCharges: [] },
			{ id: 3, userID: 3, date: '2020/08/01', roomNumber: 2, roomServiceCharges: [] },
			{ id: 4, userID: 2, date: '2020/06/09', roomNumber: 3, roomServiceCharges: [] }];
		bookingRepo = new BookingRepo(bookingsData);
		}),

	it('should be a function', function () {
		expect(BookingRepo).to.be.a('function');
	})

	it('should be an instance of Booking', function () {
		expect(bookingRepo).to.be.an.instanceof(BookingRepo);
	})

	it('should list all booked room', function () {
		expect(bookingRepo.getBookedRooms('2020/06/09')).to.deep.equal([1, 3]);
	})
	
	it('should list all past bookings', function () {
		expect(bookingRepo.getPastBookings('2020/06/09', bookingsData)).to.deep.equal([bookingsData[1]]);
	})
	
	it('should list all future bookings', function () {
		expect(bookingRepo.getFutureBookings('2020/06/09', bookingsData)).to.deep.equal([bookingsData[2]]);
	})
	
	it('should list all bookings by ID', function () {
		expect(bookingRepo.listBookingsById(2)).to.deep.equal([bookingsData[1], bookingsData[3]]);
	})
	
})