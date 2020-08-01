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

	displayErrorMessage() {
		const loginErrorMessage = document.querySelector('.login-error-message');
		loginErrorMessage.innerHTML = `<p>Invalid username and/or password</p>`;
	},

	displayCustomerName(customer) {
		const nameDisplay = document.querySelector('.name-display');
		nameDisplay.innerHTML = `${customer.name}`
	},

	displayCustomerSpent(customer, rooms) {
		const totalSpentDisplay = document.querySelector('.total-spent');
		const totalSpent = (user.retrieveTotalSpent(customer.bookings, rooms, customer.id)).toFixed(2);
		totalSpentDisplay.innerHTML = `total spent: $${totalSpent}`
	},

	displayCustomerBookings(customer, rooms) {
		const customerBookingSection = document.querySelector('.customer-wrapper');
		customer.bookings.forEach(booking => {
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
		const managerBookingSection = document.querySelector('.manager-wrapper');
		managerBookingSection.innerHTML += `
		<section class="daily-stats">
			<h2 class="daily-stats-heading">today's details:</h2>
			<h3 class="card-header">total rooms available</h3>
				<p>${dailyStats[0]}</p>
			<h3 class="card-header">total revenue</h3>
				<p>$${dailyStats[1]}</p>
			<h3 class="card-header">percent of rooms occupied</h3>
				<p>${dailyStats[2]}%</p>
		</section>
		`
	},

	displayManagerWelcome(date) {
		const nameDisplay = document.querySelector('.name-display');
		nameDisplay.innerHTML = `Welcome back , Manager`;
	},

}

export default domUpdates;