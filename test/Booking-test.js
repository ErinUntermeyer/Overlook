const chai = require('chai');
const expect = chai.expect;

import Booking from '../src/Booking';

describe('Booking', function () {
	let booking;

	beforeEach(function () {
		booking = new Booking();
	})

	it('should be a function', function () {
		expect(Booking).to.be.a('function');
	})

	it('should be an instance of Customer', function () {
		expect(booking).to.be.an.instanceof(Booking);
	})

})