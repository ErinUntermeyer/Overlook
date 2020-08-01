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
		}
	},

	displayCustomerLandingPage() {
		this.hideDisplay('.login-wrapper');
		this.showDisplay('.customer-wrapper');
	},

	displayManagerLandingPage() {
		this.hideDisplay('.login-wrapper');
		this.showDisplay('.manager-wrapper');
	},

	displayLoginErrorMessage() {
		const loginErrorMessage = document.querySelector('.login-error-message');
		loginErrorMessage.innerHTML = `<p>Invalid username and/or password</p>`;
	},

	displayCustomerName(customerName) {
		const nameDisplay = document.querySelector('.name-display');
		nameDisplay.innerHTML = `${customerName}`
	},

	// displayCustomerSpent(customer, rooms) {
	// 	const totalSpentDisplay = document.querySelector('.total-spent');
	// 	const totalSpent = (user.retrieveTotalSpent(customer.bookings, rooms, customer.id)).toFixed(2);
	// 	totalSpentDisplay.innerHTML = `total spent: $${totalSpent}`
	// },

	displayCustomerBookings(customerBookings, rooms) {
		const customerBookingSection = document.querySelector('.customer-wrapper');
		customerBookings.forEach(booking => {
			const match = rooms.find(room => booking.roomNumber === room.number)
			customerBookingSection.innerHTML += `
			<section class="customer-bookings">
			 <h3 class="card-header">booked for</h3>
			  <p>${new Date(booking.date).toLocaleString().split(',')[0]}</p>
			 <h3 class="card-header">room details</h3>
				<p>room number: ${match.number}</p>
				<p>room type: ${match.roomType}</p>
				<p>bidet: ${match.bidet}</p>
				<p>bed size: ${match.bedSize}</p>
				<p>number of beds: ${match.numBeds}</p>
				<p>cost per night: $${match.costPerNight}</p>
			</section>
			`
		})
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

	displayManagerWelcome() {
		const nameDisplay = document.querySelector('.name-display');
		nameDisplay.innerHTML = `Welcome back , Manager`;
	},

	displaySearchErrorMessage() {
		const searchErrorMessage = document.querySelector('.search-error-message');
		searchErrorMessage.innerHTML = `<p>Invalid customer name</p>`;
	},

	hideManagerLandingDisplay() {
		this.hideDisplay('.daily-stats');
		this.hideDisplay('.search-form');
	},

	displayMatchedCustomerName(customerMatch) {
		const searchResultsSection = document.querySelector('.search-results');
		searchResultsSection.innerHTML += `
			<section class="customer-match-details">
				<h2 class="customer-match-name">${customerMatch.name}</h2>
				<h3 class="card-header">total spent on rooms</h3>
				<p>$43298</p>
			</section>
			`
	},

	displayMatchedCustomerBookings(customerMatch) {
		const searchResultsSection = document.querySelector('.search-results');
		searchResultsSection.classList.remove('hidden');
		customerMatch.bookings.forEach(booking => {
			searchResultsSection.innerHTML += `
				<section class="customer-bookings">
					<h3 class="card-header">booked for</h3>
						<p>${new Date(booking.date).toLocaleString().split(',')[0]}</p>
					<h3 class="card-header">room details</h3>
						<p>room number: ${customerMatch.number}</p>
						<p>room type: ${customerMatch.roomType}</p>
						<p>bidet: ${customerMatch.bidet}</p>
						<p>bed size: ${customerMatch.bedSize}</p>
						<p>number of beds: ${customerMatch.numBeds}</p>
						<p>cost per night: $${customerMatch.costPerNight}</p>
				</section>
			`
		})
	}
}

export default domUpdates;