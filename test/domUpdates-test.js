const chai = require('chai');
const spies = require('chai-spies');
const expect = chai.expect;
chai.use(spies);

import domUpdates from '../src/domUpdates';

describe('domUpdates', function() { 
	let section, sectionClass, booking, variableName;

	beforeEach(function() {
		section = 'this section';
		sectionClass = 'this section class';
		booking = 'this booking';
		variableName = 'this variable name'
		global.document = {};
		chai.spy.on(document, ['querySelector'], function () { return {} })
	})

	afterEach(function() {
		chai.spy.restore();
	})

	it('should display error if login credentials invalid', function () {
		domUpdates.displayLoginErrorMessage();

		expect(document.querySelector).to.have.been.called(1);
		expect(document.querySelector).to.have.been.called.with('.login-error-message');
	})

	it('should create room cards', function () {
		chai.spy.on(domUpdates, ['createRoomCard', 'createBookRoomCard'], function () { return {} })
		domUpdates.createRoomCard(section, sectionClass, booking, variableName);
		domUpdates.createBookRoomCard(section, sectionClass, variableName);

		expect(domUpdates.createRoomCard).to.have.been.called(1);
		expect(domUpdates.createRoomCard).to.have.been.called.with(section, sectionClass, booking, variableName);
		expect(domUpdates.createBookRoomCard).to.have.been.called(1);
		expect(domUpdates.createBookRoomCard).to.have.been.called.with(section, sectionClass, variableName);
	})
	
	it('should display the customer landing page', function () {
		chai.spy.on(domUpdates, ['displayCustomerLandingPage'], function () { return {} })
		domUpdates.displayCustomerLandingPage();

		expect(domUpdates.displayCustomerLandingPage).to.have.been.called(1);
	})
})