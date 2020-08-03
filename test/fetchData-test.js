const chai = require('chai');
const spies = require('chai-spies');
const expect = chai.expect;
chai.use(spies);

import fetchData from '../src/fetchData'

describe('fetchData', function () {
	beforeEach(function () {
		global.fetch = (url) => {
			return Promise;
		}
		Promise.then = () => {
			return {};
		}
		Promise.catch = () => {
			return {};
		}
		chai.spy.on(global, ['fetch']);
	})

	it('should be an object', () => {
		expect(fetchData).to.be.a('object');
	})

	it('should call fetch', () => {
		fetchData.getUsersData();
		fetchData.getRoomsData();
		fetchData.getBookingsData();
		expect(global.fetch).to.have.been.called(3);
	})

	it('should return a Promise object', () => {
		expect(fetchData.getUsersData()).to.deep.equal({});
		expect(fetchData.getRoomsData()).to.deep.equal({});
		expect(fetchData.getBookingsData()).to.deep.equal({});
	})

	it('should catch errors', () => {
		expect(fetchData.getData().catch).to.be.a('function');
	})

	it('should be called with a url', () => {
		fetchData.getUsersData();
		const url = 'https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users'
		expect(global.fetch).to.have.been.called.with(url);
	})
})