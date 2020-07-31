const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);

import domUpdates from '../src/domUpdates';

describe('domUpdates', function () {

	beforeEach(function () {
		global.document = {};
		chai.spy.on(document, ['querySelector'], function () {
			return {};
		})
	})

	afterEach(function () {
		chai.spy.restore();
	})

	it('should hide login card upon valid login', function () {
		domUpdates.successfulLogin()
		expect(document.querySelector).to.have.been.called(1);
		expect(document.querySelector).to.have.been.called.with('.login-wrapper');
	})
})