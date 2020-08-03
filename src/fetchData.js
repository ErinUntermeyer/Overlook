const fetchData = {
	getUsersData() {
	return fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
		.then(response => response.json())
	},

	getRoomsData() {
		return fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
			.then(response => response.json())
	},

	getBookingsData() {
		return fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
			.then(response => response.json())
	},

	getData() {
		return Promise.all([this.getUsersData(), this.getRoomsData(), this.getBookingsData()])
			.then(dataSets => {
				return dataSets;
			})
			.catch(error => console.log(error));
	},

}

export default fetchData;