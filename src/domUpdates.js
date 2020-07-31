const domUpdates = {
	// toggleView(element, hide, display) {
	// 	pageElement = document.querySelector(element);
	// 	pageElement.classList.remove(hide);
	// 	pageElement.classList.add(display);
	// },

	verifyCustomerId(input) {
		const customerId = input.match(/\d+/g).map(Number);
		customerId < 51 ? this.displayCustomerLandingPage() : this.displayErrorMessage();
	},

	verifyLoginCredentials(event) {
		event.preventDefault();
		const usernameInput = document.querySelector('#username').value;
		const passwordInput = document.querySelector('#password').value;
		if (usernameInput.includes('customer') && passwordInput === 'overlook2020') {
			this.verifyCustomerId(usernameInput);
		} else if (usernameInput === 'manager' && passwordInput === 'overlook2020') {
			this.displayManagerLandingPage();
		} else {
			this.displayErrorMessage();
		}
	},

	displayCustomerLandingPage() {
		const loginPage = document.querySelector('.login-wrapper');
		const customerLandingPage = document.querySelector('.customer-wrapper');
		loginPage.classList.add('hidden');
		customerLandingPage.classList.remove('hidden');
	},

	displayManagerLandingPage() {
		const loginPage = document.querySelector('.login-wrapper');
		const managerLandingPage = document.querySelector('.manager-wrapper');
		loginPage.classList.add('hidden');
		managerLandingPage.classList.remove('hidden');
	},

	displayErrorMessage() {
		const loginErrorMessage = document.querySelector('.login-error-message');
		loginErrorMessage.innerHTML = `<p>Invalid username and/or password</p>`;
	}
}

export default domUpdates;