const chai = require('chai');
const expect = chai.expect;

import Booking from '../src/Booking';

describe('Booking', function () {
	let booking1, booking, booking2, badBooking;

	beforeEach(function () {
		booking1 = { id: 1, userID: 1, date: 'today', roomNumber: 1, roomServiceCharges: [] };
		booking = new Booking(booking1);
		booking2 = { id: 'one', userID: 'one', date: 123456, roomNumber: 'one', roomServiceCharges: 'none' };
		badBooking = new Booking(booking2);
	})

	it('should be a function', function () {
		expect(Booking).to.be.a('function');
	})

	it('should be an instance of Booking', function () {
		expect(booking).to.be.an.instanceof(Booking);
	})

	it('should hold all properties of a booking', function () {
		expect(booking.id).to.equal(1);
		expect(booking.userID).to.equal(1);
		expect(booking.date).to.equal('today');
		expect(booking.roomNumber).to.equal(1);
		expect(booking.roomServiceCharges).to.deep.equal([]);
	})

	it('should only take in valid data types', function () {
		expect(badBooking.id).to.equal(0);
		expect(badBooking.userID).to.equal(0);
		expect(badBooking.date).to.equal('Invalid');
		expect(badBooking.roomNumber).to.equal(0);
		expect(badBooking.roomServiceCharges).to.deep.equal([]);
	})

})