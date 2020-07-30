class User {
	checkDataType(attribute, dataType) {
		return typeof attribute === dataType ? attribute : this.giveDefaultValue(dataType);
	}

	giveDefaultValue(dataType) {
		switch (dataType) {
			case 'number':
				return 0;
				break;
			case 'string':
				return 'Invalid';
				break;
			case 'object':
				return [];
				break;
		}
	}

	listRoomsAvailable(bookings, rooms, date) {
		const bookedRooms = [];
		return bookings.reduce((availableRooms, booking) => {
			if (booking.date === date) {
				bookedRooms.push(booking.roomNumber);
				rooms.forEach(room => {
					if (room.number !== booking.roomNumber) {
						availableRooms.push(room);
					}
				})
			}
			return availableRooms;
		}, [])
	}

	listBookingsById(bookings, id) {
		const bookingsById = [];
		bookings.forEach(booking => {
			if (booking.userID === id) {
				bookingsById.push(booking);
			}
		})
		return bookingsById;
	}
}

export default User;