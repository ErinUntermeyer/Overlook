const chai = require('chai');
const spies = require('chai-spies');
const expect = chai.expect;
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

	it('should', function () {

	})
})