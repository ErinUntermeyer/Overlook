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

	displayRoomCards() {

	}

}

export default domUpdates;