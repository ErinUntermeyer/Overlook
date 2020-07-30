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

	getRoomsBooked(bookings, date) {
		const bookedRooms = [];
		bookings.forEach(booking => {
			if (booking.date === date) {
				bookedRooms.push(booking.roomNumber);
			}
		})
		return bookedRooms;
	}

	listRoomsAvailable(bookings, rooms, date) {
		const bookedRooms = this.getRoomsBooked(bookings, date);
		return bookedRooms.reduce((availableRooms, booking) => {
			rooms.forEach(room => {
				if (room.number !== booking) {
					availableRooms.push(room);
				}
				})
				if (availableRooms.length === 0) {
					this.apologizeForNoRooms(date);
				} else {
					return availableRooms;
				}
		}, [])
	}

	apologizeForNoRooms(date) {
		return `Overlook regrets to inform you that there are no rooms available for ${date}`;
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

	retrieveTotalSpent(bookings, rooms, id) {
		const allBookings = this.listBookingsById(bookings, id);
		return allBookings.reduce((totalSpent, booking) => {
			rooms.forEach(room => {
				if (room.number === booking.roomNumber) {
					totalSpent += room.costPerNight;
				}
			})
			return totalSpent;
		}, 0)
	}

	filterByRoomType(roomType, rooms) {
		const filteredRooms = [];
		rooms.forEach(room => {
			if (room.roomType === roomType) {
				filteredRooms.push(room);
			}
		})
		return filteredRooms;
	}
}

export default User;