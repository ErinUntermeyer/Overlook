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
			case '.available-rooms-nav':
				hide;
				break;
			case '.filtered-list':
				hide;
				break;
			case '.success':
				hide;
				break;
			case '.search-results':
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
			case '.success':
				show;
				break;
			case '.available-rooms-list':
				show;
				break;
			case '.filtered-list':
				show;
				break;
			case '.log-out':
				show;
				break;
			case '.delete-confirmation':
				show;
				break;
			case '.search-results':
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
			  <p>${this.formatDate(booking.date)}</p>
			 <h3 class="card-header">${variableName.roomType}</h3>
				<p class="room-num">room number: ${variableName.number}</p>
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
				<p class="room-num">room number: ${variableName.number}</p>
				<p>bidet: ${variableName.bidet}</p>
				<p>beds: ${variableName.numBeds} ${variableName.bedSize} size</p>
				<p>$${variableName.costPerNight} per night</p>
				<button class="reserve">reserve</button>
			</section>
			`
	},

	formatDate(date) {
		const dateString = new Date(date).toLocaleString().split(',')[0];
		return (0 + dateString.split('/')[0]).slice(-2) + '/' + (0 + dateString.split('/')[1]).slice(-2) + '/' + dateString.split('/')[2];
	},

	// customer section
	displayCustomerLandingPage() {
		this.hideDisplay('.login-wrapper');
		this.hideDisplay('.success');
		this.showDisplay('.customer-wrapper');
		this.showDisplay('.log-out');
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
		this.hideDisplay('.search-results');
		this.hideDisplay('.customer-wrapper');
		this.showDisplay('.available-rooms-nav');
		this.showDisplay('.available-rooms-list');
		availableRooms.forEach(room => {
			this.createBookRoomCard(availableRoomsSection, 'available-rooms-to-book', room);
		});
	},

	resetAvailableRoomsDisplay() {
		this.showDisplay('.available-rooms-list');
		this.hideDisplay('.filtered-list');
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
		this.showDisplay('.filtered-list');
		const filteredRoomsSection = document.querySelector('.filtered-list');
		filteredRoomsSection.innerHTML = ``;
		availableRooms.forEach(room => {
			this.createBookRoomCard(filteredRoomsSection, 'available-rooms-to-book', room);
		});
	},

	displaySuccessMessage() {
		const successSection = document.querySelector('.success');
		this.hideDisplay('.available-rooms-nav')
		this.hideDisplay('.available-rooms-list')
		this.hideDisplay('.filtered-list')
		this.hideDisplay('.delete-confirmation')
		this.showDisplay('.success')
		successSection.innerHTML = `
			<h3 class="card-header message">Success! Enjoy your stay!</h3>
			<button class="try-again">Home</button>
		`
	},

	// manager section 
	displayManagerLandingPage() {
		this.hideDisplay('.login-wrapper');
		this.hideDisplay('.success');
		this.showDisplay('.manager-wrapper');
		this.showDisplay('.log-out');
		this.showDisplay('.search-results');
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
				<label class="manager-book-new-label" for="calendar">Book a Room</label>
				<input class="calendar" id="manager-calendar" type="date">
				<input type="submit" value="Check Availability" class="availability-button" id="manager">
				</section>
				<h2 class="section-header booked-header">booked rooms:</h2>
			`
	},

	displayPastBookings(pastBookings, roomsData) {
		const searchResultsSection = document.querySelector('.search-results');
		searchResultsSection.classList.remove('hidden');
		pastBookings.forEach(booking => {
			const match = roomsData.find(room => booking.roomNumber === room.number);
			this.createRoomCard(searchResultsSection, 'past-customer-bookings', booking, match)
		})
	},

	displayFutureBookings(futureBookings, roomsData) {
		const searchResultsSection = document.querySelector('.search-results');
		searchResultsSection.classList.remove('hidden');
		futureBookings.forEach(booking => {
			const match = roomsData.find(room => booking.roomNumber === room.number);
			return searchResultsSection.innerHTML += `
			<section class="future-customer-bookings">
			 <h3 class="card-header">booked for</h3>
			  <p>${this.formatDate(booking.date)}</p>
			 <h3 class="card-header">${match.roomType}</h3>
				<p class="room-num">room number: ${match.number}</p>
				<p>bidet: ${match.bidet}</p>
				<p>beds: ${match.numBeds} ${match.bedSize} size</p>
				<p>$${match.costPerNight} per night</p>
				<button class="delete">delete reservation</button>
			</section>
			`
		})
	},

	displayDeleteConfirmation() {
		const deleteConfirmationSection = document.querySelector('.delete-confirmation');
		this.hideDisplay('.search-results');
		this.hideDisplay('.success')
		this.showDisplay('.delete-confirmation');
		deleteConfirmationSection.innerHTML = `
			<h3 class="card-header message">We miss you already!</h3>
			<button class="try-again">Home</button>
		`
	},
}

export default domUpdates;