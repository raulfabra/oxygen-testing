class Room {
  constructor(name, bookings, rate, discount) {
    this.name = name;
    this.bookings = bookings;
    this.rate = rate;
    this.discount = discount;
  }

  static totalOccupancyPercentage(rooms, startDate, endDate) {
    // Devuelve el Percentage de Ocupación TOTAL de todo el hotel dentro del rango pasado por parámetros, incluidos los extremos
    let percentageSum = 0;

    for (const room of rooms) {
      percentageSum += room.occupancyPercentage(startDate, endDate);
    }

    return percentageSum / roomList.length;
  }
  static availableRooms(rooms, startDate, endDate) {
    // Devuelve las habitaciones que no estan ocupadas en el rango pasado por parametros, incluidos los extremos. === HABITACIONES LIBRES ENTRE EL RANGO PASADO
    let occupiedList = [];

    for (const room of rooms) {
      if (room.occupancyPercentage(startDate, endDate) < 100) {
        occupiedList.push(room);
      }
    }

    return occupiedList;
  }

  isOccupied(date) {
    // Devuelve Falso si la hab. no esta ocupada = DISPONIBLE
    // Devuelve True si la hab. esta ocupada = RESERVADA
    for (const booking of this.bookings) {
      const dateTimeBooking = date.getTime();
      const startDateBooking = booking.checkIn.getTime();
      const endDateBooking = booking.checkIn.getTime();

      if (
        (dateTimeBooking >= startDateBooking && dateTimeBooking <= endDateBooking) ||
        dateTimeBooking == startDateBooking ||
        dateTimeBooking == endDateBooking
      )
        return true;
    }
    return false;
  }

  occupancyPercentage(startDate, endDate) {
    // Devuelve el Porcentage de ocupación dentro del rango pasado por parámetros, incluidos los extremos
    let availableAmount = 0;

    for (const booking of this.bookings) {
      const startTime = startDate.getTime();
      const endTime = endDate.getTime();
      const startDateBooking = booking.checkin.getTime();
      const endDateBooking = booking.checkout.getTime();

      if ((startTime >= startDateBooking && endTime <= endDateBooking) || startTime == startDateBooking || endTime == endDateBooking) {
        availableAmount += 1;
      }
    }

    return (availableAmount / this.bookings.length) * 100;
  }
}

class Booking {
  constructor(name, email, checkIn, checkOut, discount, room) {
    this.name = name;
    this.email = email;
    this.checkIn = checkIn;
    this.checkOut = checkOut;
    this.discount = discount;
    this.room = room;
  }

  fee() {
    // Devuelve el precio final de la reserva contando el descuento de la habitacion (Hotel) y de la reserva (Pagina de reserva)
    const roomFee = this.room.rate - this.room.rate * (this.room.discount / 100);
    return roomFee - roomFee * (this.discount / 100);
  }
}

module.exports = { Room, Booking };
