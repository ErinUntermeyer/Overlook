class User {
	checkDataType(attribute, dataType) {
		return typeof attribute === dataType ? attribute : this.giveDefaultValue(dataType);
	}

	giveDefaultValue(dataType) {
		switch (dataType) {
			case 'number':
				return 0;
			case 'string':
				return 'Invalid';
			case 'object':
				return [];
		}
	}

	listRoomsAvailable(bookedRooms, rooms, date) {
		const	availableRooms = rooms.filter(room => (!bookedRooms.includes(room.number)));
		if (availableRooms.length === 0) {
			this.apologizeForNoRooms(date);
		} else {
			return availableRooms;
		}
	}

	apologizeForNoRooms(date) {
		return `Overlook regrets to inform you that there are no rooms available for ${date}`;
	}

	listBookingsById(bookings, id) {
		return bookings.filter(booking => booking.userID === id);
	}

	retrieveTotalSpent(bookings, rooms, id) {
		const allBookings = this.listBookingsById(bookings, id);
		return allBookings.reduce((totalSpent, booking) => {
			rooms.find(room => {
				if (room.number === booking.roomNumber) {
					totalSpent += room.costPerNight;
				}
			})
			return totalSpent;
		}, 0)
	}

	filterByRoomType(roomType, rooms) {
		return rooms.filter(room => room.roomType === roomType);
	}
}

export default User;