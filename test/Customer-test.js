const chai = require('chai');
const expect = chai.expect;

import Customer from '../src/Customer';

describe('Customer', function() {
  let userData1, customer1, badUserData, badCustomer;

  beforeEach(function() {
    userData1 = { id: 1, name: 'John Smith' };
    customer1 = new Customer(userData1)
    badUserData = { id: 'one', name: 123 };
    badCustomer = new Customer(badUserData);
  })

  it('should be a function', function() {
    expect(Customer).to.be.a('function');
  })

  it('should be an instance of Customer', function() {
    expect(customer1).to.be.an.instanceof(Customer);
  })

  it('should only take in valid data types', function() {
    expect(badCustomer.id).to.equal(0);
    expect(badCustomer.name).to.equal('Invalid');
  })

})