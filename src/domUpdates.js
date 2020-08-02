import User from '../src/User';
const user = new User();

const domUpdates = {
	hideDisplay(element) {
		const pageElement = document.querySelector(element);
		const hide = pageElement.classList.add('hidden');
		switch(element) {
			case '.login-wrapper':
				hide;
				break;
			case '.daily-stats':
				hide;
				break;
			case '.search-form':
				hide;
				break;
			case '.customer-bookings':
				hide;
				break;
			case '.available-rooms-list':
				hide;
				break;
			case '.apology':
				hide;
				break;
		}
	},

	showDisplay(element) {
		const pageElement = document.querySelector(element);
		const show = pageElement.classList.remove('hidden');
		switch (element) {
			case '.customer-wrapper':
				show;
				break;
			case '.manager-wrapper':
				show;
				break;
			case '.available-rooms-nav':
				show;
				break;
			case '.apology':
				show;
				break;
		}
	},

	displayLoginErrorMessage() {
		const loginErrorMessage = document.querySelector('.login-error-message');
		loginErrorMessage.innerHTML = `<p>Invalid username and/or password</p>`;
	},

	createRoomCard(section, sectionClass, booking, variableName) {
		return section.innerHTML += `
			<section class="${sectionClass}">
			 <h3 class="card-header">booked for</h3>
			  <p>${new Date(booking.date).toLocaleString().split(',')[0]}</p>
			 <h3 class="card-header">${variableName.roomType}</h3>
				<p>room number: ${variableName.number}</p>
				<p>bidet: ${variableName.bidet}</p>
				<p>beds: ${variableName.numBeds} ${variableName.bedSize} size</p>
				<p>$${variableName.costPerNight} per night</p>
			</section>
			`
	},

	createBookRoomCard(section, sectionClass, variableName) {
		return section.innerHTML += `
			<section class="${sectionClass}">
			 <h3 class="card-header">${variableName.roomType}</h3>
				<p>room number: ${variableName.number}</p>
				<p>bidet: ${variableName.bidet}</p>
				<p>beds: ${variableName.numBeds} ${variableName.bedSize} size</p>
				<p>$${variableName.costPerNight} per night</p>
				<button class="reserve">reserve</button>
			</section>
			`
	},

	// customer section
	displayCustomerLandingPage() {
		this.hideDisplay('.login-wrapper');
		this.showDisplay('.customer-wrapper');
	},

	displayCustomerDetails(customerName, customerBookings, roomsData) {
		this.hideDisplay('.apology');
		this.displayCustomerName(customerName);
		this.displayCustomerSpent(customerBookings, roomsData);
		this.displayCustomerBookings(customerBookings, roomsData);
	},

	displayCustomerName(customerName) {
		const nameDisplay = document.querySelector('.name-display');
		nameDisplay.innerHTML = `${customerName}`
	},

	displayCustomerSpent(customerBookings, roomsData) {
		const totalSpentDisplay = document.querySelector('.total-spent');
		const totalSpent = (user.retrieveTotalSpent(customerBookings, roomsData)).toFixed(2);
		totalSpentDisplay.innerHTML = `total spent: $${totalSpent}`
	},

	displayCustomerBookings(customerBookings, roomsData) {
		const customerBookingSection = document.querySelector('.customer-wrapper');
		customerBookings.forEach(booking => {
			const match = roomsData.find(room => booking.roomNumber === room.number);
			this.createRoomCard(customerBookingSection, 'customer-bookings', booking, match)
		})
	},

	displayAvailableRoomsToBook(availableRooms) {
		const availableRoomsSection = document.querySelector('.available-rooms-list');
		this.hideDisplay('.customer-wrapper');
		this.showDisplay('.available-rooms-nav');
		availableRooms.forEach(room => {
			this.createBookRoomCard(availableRoomsSection, 'available-rooms-to-book', room);
		});
	},

	displayApology(message) {
		const apologySection = document.querySelector('.apology');
		this.hideDisplay('.customer-wrapper');
		this.showDisplay('.apology');
		apologySection.innerHTML = `
			<h3 class="card-header message">${message}</h3>
			<button class="try-again">Try again!</button>
		`
	},

	displayFilteredList(availableRooms) {
		this.hideDisplay('.available-rooms-list');
		const filteredRoomsSection = document.querySelector('.filtered-list');
		filteredRoomsSection.innerHTML = ``;
		availableRooms.forEach(room => {
			this.createBookRoomCard(filteredRoomsSection, 'available-rooms-to-book', room);
		});
	},

	displayFilteredList(availableRooms) {
		this.hideDisplay('.available-rooms-list');
		const filteredRoomsSection = document.querySelector('.filtered-list');
		availableRooms.forEach(room => {
			filteredRoomsSection.innerHTML += `
			<section class="available-rooms-to-book">
			 <h3 class="card-header">room details</h3>
				<p>room number: ${room.number}</p>
				<p>room type: ${room.roomType}</p>
				<p>bidet: ${room.bidet}</p>
				<p>bed size: ${room.bedSize}</p>
				<p>number of beds: ${room.numBeds}</p>
				<p>cost per night: $${room.costPerNight}</p>
				<button class="reserve">reserve</button>
			</section>
			`
		})
	},

	// manager section 
	displayManagerLandingPage() {
		this.hideDisplay('.login-wrapper');
		this.showDisplay('.manager-wrapper');
	},

	hideManagerLandingPage() {
		this.hideDisplay('.daily-stats');
		this.hideDisplay('.search-form');
	},

	displayManagerWelcome() {
		const nameDisplay = document.querySelector('.name-display');
		nameDisplay.innerHTML = `Welcome back , Manager`;
	},

	displayDailyStatsForManager(dailyStats) {
		const dailyStatsSection = document.querySelector('.daily-stats');
		dailyStatsSection.innerHTML += `
			<h2 class="daily-stats-heading">today's details:</h2>
			<h3 class="card-header">total rooms available</h3>
				<p>${dailyStats[0]}</p>
			<h3 class="card-header">total revenue</h3>
				<p>$${dailyStats[1]}</p>
			<h3 class="card-header">percent of rooms occupied</h3>
				<p>${dailyStats[2]}%</p>
		`
	},

	displaySearchErrorMessage() {
		const searchErrorMessage = document.querySelector('.search-error-message');
		searchErrorMessage.innerHTML = `<p>Invalid customer name</p>`;
	},

	displayMatchedCustomerName(customerMatch, customerSpent) {
		const searchResultsSection = document.querySelector('.search-results');
		searchResultsSection.innerHTML += `
			<section class="customer-match-details">
				<h2 class="customer-match-name">${customerMatch.name}</h2>
				<h3 class="card-header">total spent on rooms</h3>
				<p>$${customerSpent}</p>
			</section>
			`
	},

	displayMatchedCustomerBookings(customerBookings, roomsData) {
		const searchResultsSection = document.querySelector('.search-results');
		searchResultsSection.classList.remove('hidden');
		customerBookings.forEach(booking => {
			const match = roomsData.find(room => booking.roomNumber === room.number);
			this.createRoomCard(searchResultsSection, 'customer-bookings', booking, match);
		})
	}
}

export default domUpdates;