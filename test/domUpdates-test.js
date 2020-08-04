const chai = require('chai');
const spies = require('chai-spies');
const expect = chai.expect;
chai.use(spies);

import domUpdates from '../src/domUpdates';

describe('domUpdates', function() { 
  let section, sectionClass, bookings, variableName, customerName, rooms, message;

  beforeEach(function() {
    section = 'this section';
    sectionClass = 'this section class';
    bookings = 'these bookings';
    variableName = 'this variable name';
    customerName = 'erin';
    rooms = 'these rooms';
    message = 'this is a message';
    global.document = {};
    chai.spy.on(document, ['querySelector'], function () {
      return {} 
    })
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
    chai.spy.on(domUpdates, ['createRoomCard', 'createBookRoomCard'], function () {
      return {} 
    })
    domUpdates.createRoomCard(section, sectionClass, bookings, variableName);
    domUpdates.createBookRoomCard(section, sectionClass, variableName);

    expect(domUpdates.createRoomCard).to.have.been.called(1);
    expect(domUpdates.createRoomCard).to.have.been.called.with(section, sectionClass, bookings, variableName);
    expect(domUpdates.createBookRoomCard).to.have.been.called(1);
    expect(domUpdates.createBookRoomCard).to.have.been.called.with(section, sectionClass, variableName);
  })
	
  it('should display the customer landing page', function () {
    chai.spy.on(domUpdates, ['displayCustomerLandingPage'], function () {
      return {} 
    })
    domUpdates.displayCustomerLandingPage();

    expect(domUpdates.displayCustomerLandingPage).to.have.been.called(1);
  })

  it('should display the customer details', function () {
    chai.spy.on(domUpdates, ['displayCustomerDetails'], function () {
      return {} 
    })
    domUpdates.displayCustomerDetails(customerName, bookings, rooms);

    expect(domUpdates.displayCustomerDetails).to.have.been.called(1);
    expect(domUpdates.displayCustomerDetails).to.have.been.called.with(customerName, bookings, rooms);
  })

  it('should display the available rooms to book', function () {
    chai.spy.on(domUpdates, ['displayAvailableRoomsToBook'], function () {
      return {} 
    })
    domUpdates.displayAvailableRoomsToBook(rooms);

    expect(domUpdates.displayAvailableRoomsToBook).to.have.been.called(1);
    expect(domUpdates.displayAvailableRoomsToBook).to.have.been.called.with(rooms);
  })

  it('should display an apology', function () {
    chai.spy.on(domUpdates, ['displayApology'], function () {
      return {} 
    })
    domUpdates.displayApology(message);

    expect(domUpdates.displayApology).to.have.been.called(1);
    expect(domUpdates.displayApology).to.have.been.called.with(message);
  })

  it('should display a filtered list of rooms', function () {
    chai.spy.on(domUpdates, ['displayFilteredList'], function () {
      return {} 
    })
    domUpdates.displayFilteredList(rooms);

    expect(domUpdates.displayFilteredList).to.have.been.called(1);
    expect(domUpdates.displayFilteredList).to.have.been.called.with(rooms);
  })

  it('should display manager welcome', function () {
    domUpdates.displayManagerWelcome();

    expect(document.querySelector).to.have.been.called(1);
    expect(document.querySelector).to.have.been.called.with('.name-display');
  })
})