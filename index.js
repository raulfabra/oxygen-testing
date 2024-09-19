class Room {
  constructor(name, rate, discount) {
    this.name = name;
    this.bookings = [];
    this.rate = rate;
    this.discount = discount;
  }

  static totalOccupancyPercentage(rooms, startDate, endDate) {
    // Devuelve el Percentage de Ocupación TOTAL de todo el hotel dentro del rango pasado por parámetros, incluidos los extremos
  }
  static availableRooms(rooms, startDate, endDate) {
    // Devuelve las habitaciones que no estan ocupadas en el rango pasado por parametros, incluidos los extremos. === HABITACIONES LIBRES ENTRE EL RANGO PASADO
  }

  isOccupied(date) {
    // Devuelve Falso si la hab. no esta ocupada = DISPONIBLE
    // Devuelve True si la hab. esta ocupada = RESERVADA
  }

  occupancyPercentage(startDate, endDate) {
    // Devuelve el Porcentage de ocupación dentro del rango pasado por parámetros, incluidos los extremos
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
  }
}
