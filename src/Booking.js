class Booking {
  constructor(booking) {
    this.id = this.validateBookingData(booking.id, 'number');
    this.userID = this.validateBookingData(booking.userID, 'number');
    this.date = this.validateBookingData(booking.date, 'string');
    this.roomNumber = this.validateBookingData(booking.roomNumber, 'number');
    this.roomServiceCharges = this.validateBookingData(booking.roomServiceCharges, 'object');
  }

  validateBookingData(attribute, dataType) {
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
}

export default Booking;