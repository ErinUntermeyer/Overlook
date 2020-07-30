const chai = require('chai');
const expect = chai.expect;

import Booking from '../src/Booking';

describe('Booking', function () {
	let booking1, booking;

	beforeEach(function () {
		booking1 = { id: 1, userID: 1, date: 'today', roomNumber: 1, roomServiceCharges: [] }
		booking = new Booking(booking1);
	})

	it('should be a function', function () {
		expect(Booking).to.be.a('function');
	})

	it('should be an instance of Customer', function () {
		expect(booking).to.be.an.instanceof(Booking);
	})

	it('should hold all properties of a booking', function () {
		expect(booking.id).to.equal(1);
		expect(booking.userID).to.equal(1);
		expect(booking.date).to.equal('today');
		expect(booking.roomNumber).to.equal(1);
		expect(booking.roomServiceCharges).to.deep.equal([]);
	})

})