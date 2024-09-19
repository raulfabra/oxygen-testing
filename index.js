class Room {
  constructor(name, rate, discount) {
    this.name = name;
    this.bookings = [];
    this.rate = rate;
    this.discount = discount;
  }

  isOccupied(date) {
    for (const booking of this.bookings) {
    }
  }

  occupancyPercentage(startDate, endDate) {}
}
