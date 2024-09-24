interface RoomInterface {
  name: string;
  bookings: Booking[];
  price: number;
  discount: number;
}

class Room {
  name: string;
  bookings: Booking[];
  price: number;
  discount: number;

  constructor({ name, bookings, price, discount }: RoomInterface) {
    this.name = name;
    this.bookings = bookings;
    this.price = price;
    this.discount = discount;
  }

  static totalOccupancyPercentage(rooms: Room[], startDate: string, endDate: string) {
    // Devuelve el Percentage de Ocupación TOTAL de todo el hotel dentro del rango pasado por parámetros, incluidos los extremos
    let percentageSum = 0;

    for (const room of rooms) {
      percentageSum += room.occupancyPercentage(startDate, endDate);
    }

    return percentageSum / rooms.length;
  }
  static availableRooms(rooms: Room[], startDate: string, endDate: string) {
    // Devuelve las habitaciones que no estan ocupadas en el rango pasado por parametros, incluidos los extremos. === HABITACIONES LIBRES ENTRE EL RANGO PASADO
    let occupiedList = [];

    for (const room of rooms) {
      if (room.occupancyPercentage(startDate, endDate) < 100) {
        occupiedList.push(room);
      }
    }

    return occupiedList;
  }

  isOccupied(date: string) {
    // Devuelve Falso si la hab. no esta ocupada = DISPONIBLE
    // Devuelve True si la hab. esta ocupada = RESERVADA
    for (const booking of this.bookings) {
      const dateTimeBooking = date;
      const startDateBooking = booking.checkIn;
      const endDateBooking = booking.checkOut;

      if (
        (dateTimeBooking >= startDateBooking && dateTimeBooking <= endDateBooking) ||
        dateTimeBooking == startDateBooking ||
        dateTimeBooking == endDateBooking
      )
        return true;
    }
    return false;
  }

  occupancyPercentage(startDate: string, endDate: string) {
    // Devuelve el Porcentage de ocupación dentro del rango pasado por parámetros, incluidos los extremos
    let availableAmount = 0;

    for (const booking of this.bookings) {
      const startTime = startDate;
      const endTime = endDate;
      const startDateBooking = booking.checkIn;
      const endDateBooking = booking.checkOut;

      if ((startTime >= startDateBooking && endTime <= endDateBooking) || startTime == startDateBooking || endTime == endDateBooking) {
        availableAmount += 1;
      }
    }

    return (availableAmount / this.bookings.length) * 100;
  }
}

interface BookingInterface {
  name: string;
  email: string;
  arrival: string;
  departure: string;
  discount: number;
  room: Room;
}

class Booking {
  name: string;
  email: string;
  checkIn: string;
  checkOut: string;
  discount: number;
  room: Room;

  constructor({ name, email, arrival, departure, discount, room }: BookingInterface) {
    this.name = name;
    this.email = email;
    this.checkIn = arrival;
    this.checkOut = departure;
    this.discount = discount;
    this.room = room;
  }

  fee() {
    // Devuelve el precio final de la reserva contando el descuento de la habitacion (Hotel) y de la reserva (Pagina de reserva)
    const roomFee = this.room.price - this.room.price * (this.room.discount / 100);
    return roomFee - roomFee * (this.discount / 100);
  }
}

module.exports = { Room, Booking };
