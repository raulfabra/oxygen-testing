import { Room, Booking } from "./index";

const mockRoom = new Room({ name: "Room X", bookings: [], price: 500, discount: 33 });

const mockBooking = new Booking({
  name: "Alfredo DiStefanno",
  email: "alfred@booking.com",
  checkIn: new Date("2024-05-15"),
  checkOut: new Date("2024-05-25"),
  discount: 5,
  room: mockRoom,
});

describe("Class Room test", () => {
  describe("check function ➡ isOccupied", () => {
    test("should be return false if the room is available to booking", () => {
      const booking_1 = new Booking({
        name: "Manolo Gomez",
        email: "booking@fake.com",
        checkIn: new Date("2024-08-08"),
        checkOut: new Date("2024-08-13"),
        discount: 10,
        room: mockRoom,
      });
      const room = new Room({ name: "Room 2", bookings: [booking_1], price: 450, discount: 23 });
      const dateToCheck = new Date("2024-05-15");
      expect(room.isOccupied(dateToCheck)).toBe(false);
    });

    test("should be return true if the room is NOT available", () => {
      const booking_1 = new Booking({
        name: "Manolo Gomez",
        email: "booking@fake.com",
        checkIn: new Date("2024-08-08"),
        checkOut: new Date("2024-08-13"),
        discount: 10,
        room: mockRoom,
      });
      const room = new Room({ name: "Room 2", bookings: [booking_1], price: 450, discount: 23 });
      const dateToCheck = new Date("2024-08-10");
      expect(room.isOccupied(dateToCheck)).toBe(true);
    });
  });

  describe("check function ➡ occupancyPercentage", () => {
    test("should be throw an error if endDate is before than startDate", () => {
      const booking_1 = new Booking({
        name: "Manolo Gomez",
        email: "booking@fake.com",
        checkIn: new Date("2024-08-08"),
        checkOut: new Date("2024-08-13"),
        discount: 10,
        room: mockRoom,
      });
      const room = new Room({ name: "Room 2", bookings: [booking_1], price: 450, discount: 23 });
      expect(room.occupancyPercentage(new Date("2024-07-30"), new Date("2024-07-15"))).toBe(0);
    });

    test("should be 0% result if all rooms are available", () => {
      const booking_1 = new Booking({
        name: "Manolo Gomez",
        email: "booking@fake.com",
        checkIn: new Date("2024-08-08"),
        checkOut: new Date("2024-08-13"),
        discount: 10,
        room: mockRoom,
      });
      const room = new Room({ name: "Room 2", bookings: [booking_1], price: 450, discount: 23 });
      expect(room.occupancyPercentage(new Date("2024-07-09"), new Date("2024-07-11"))).toBe(0);
    });

    test("should be 100% result if all rooms are booked", () => {
      const booking_1 = new Booking({
        name: "Manolo Gomez",
        email: "booking@fake.com",
        checkIn: new Date("2024-08-08"),
        checkOut: new Date("2024-08-13"),
        discount: 10,
        room: mockRoom,
      });
      const room = new Room({ name: "Room 2", bookings: [booking_1], price: 450, discount: 23 });
      expect(room.occupancyPercentage(new Date("2024-08-09"), new Date("2024-08-11"))).toBe(100);
    });

    test("should be 33.33% result in a occupancy Percentage Function", () => {
      const booking_1 = new Booking({
        name: "Manolo Gomez",
        email: "booking@fake.com",
        checkIn: new Date("2024-08-08"),
        checkOut: new Date("2024-08-13"),
        discount: 10,
        room: mockRoom,
      });
      const booking_2 = new Booking({
        name: "Jennifer Beltran",
        email: "booking@fake.com",
        checkIn: new Date("2024-06-08"),
        checkOut: new Date("2024-06-13"),
        discount: 10,
        room: mockRoom,
      });
      const booking_3 = new Booking({
        name: "Jose Alfonso",
        email: "booking@fake.com",
        checkIn: new Date("2024-03-08"),
        checkOut: new Date("2024-03-13"),
        discount: 10,
        room: mockRoom,
      });
      const room = new Room({ name: "Room 2", bookings: [booking_1, booking_2, booking_3], price: 450, discount: 23 });
      expect(room.occupancyPercentage(new Date("2024-08-08"), new Date("2024-08-13"))).toBe((1 / 3) * 100);
    });
  });

  describe("check static function ➡ totalOccupancyPercentage", () => {
    test("should be full percentage result on the static occupancy percentage function", () => {
      const booking_1 = new Booking({
        name: "Manolo Gomez",
        email: "booking@fake.com",
        checkIn: new Date("2024-08-01"),
        checkOut: new Date("2024-08-30"),
        discount: 10,
        room: mockRoom,
      });
      const booking_2 = new Booking({
        name: "Jennifer Beltran",
        email: "booking@fake.com",
        checkIn: new Date("2024-08-10"),
        checkOut: new Date("2024-08-30"),
        discount: 10,
        room: mockRoom,
      });
      const booking_3 = new Booking({
        name: "Jose Alfonso",
        email: "booking@fake.com",
        checkIn: new Date("2024-08-02"),
        checkOut: new Date("2024-08-22"),
        discount: 10,
        room: mockRoom,
      });
      const booking_4 = new Booking({
        name: "Alicia Moreno",
        email: "booking@fake.com",
        checkIn: new Date("2024-08-07"),
        checkOut: new Date("2024-08-29"),
        discount: 10,
        room: mockRoom,
      });
      const booking_5 = new Booking({
        name: "Raul Guevara",
        email: "booking@fake.com",
        checkIn: new Date("2024-08-11"),
        checkOut: new Date("2024-08-29"),
        discount: 10,
        room: mockRoom,
      });

      const room1 = new Room({ name: "Room 1", bookings: [booking_1, booking_2], price: 450, discount: 23 });
      const room2 = new Room({ name: "Room 2", bookings: [booking_3, booking_4, booking_5], price: 250, discount: 5 });
      const roomList = [room1, room2];
      expect(Room.totalOccupancyPercentage(roomList, new Date("2024-08-15"), new Date("2024-08-20"))).toBe(100);
    });
    test("should be for a zero percentage result on the static occupancy percentage function", () => {
      const booking_1 = new Booking({
        name: "Manolo Gomez",
        email: "booking@fake.com",
        checkIn: new Date("2024-08-01"),
        checkOut: new Date("2024-08-30"),
        discount: 10,
        room: mockRoom,
      });
      const booking_2 = new Booking({
        name: "Jennifer Beltran",
        email: "booking@fake.com",
        checkIn: new Date("2024-08-10"),
        checkOut: new Date("2024-08-30"),
        discount: 10,
        room: mockRoom,
      });
      const booking_3 = new Booking({
        name: "Jose Alfonso",
        email: "booking@fake.com",
        checkIn: new Date("2024-08-02"),
        checkOut: new Date("2024-08-22"),
        discount: 10,
        room: mockRoom,
      });
      const booking_4 = new Booking({
        name: "Alicia Moreno",
        email: "booking@fake.com",
        checkIn: new Date("2024-08-07"),
        checkOut: new Date("2024-08-29"),
        discount: 10,
        room: mockRoom,
      });
      const booking_5 = new Booking({
        name: "Raul Guevara",
        email: "booking@fake.com",
        checkIn: new Date("2024-08-11"),
        checkOut: new Date("2024-08-29"),
        discount: 10,
        room: mockRoom,
      });

      const room1 = new Room({ name: "Room 1", bookings: [booking_1, booking_2], price: 450, discount: 23 });
      const room2 = new Room({ name: "Room 2", bookings: [booking_3, booking_4, booking_5], price: 250, discount: 5 });
      const roomList = [room1, room2];

      expect(Room.totalOccupancyPercentage(roomList, new Date("2024-07-15"), new Date("2024-07-29"))).toBe(0);
    });
  });
  describe("check static function ➡ availableRooms", () => {
    test("check for an empty result for the static availableRooms function", () => {
      const booking_1 = new Booking({
        name: "Manolo Gomez",
        email: "booking@fake.com",
        checkIn: new Date("2024-08-01"),
        checkOut: new Date("2024-08-30"),
        discount: 10,
        room: mockRoom,
      });
      const booking_2 = new Booking({
        name: "Jennifer Beltran",
        email: "booking@fake.com",
        checkIn: new Date("2024-08-10"),
        checkOut: new Date("2024-08-30"),
        discount: 10,
        room: mockRoom,
      });
      const booking_3 = new Booking({
        name: "Jose Alfonso",
        email: "booking@fake.com",
        checkIn: new Date("2024-08-02"),
        checkOut: new Date("2024-08-22"),
        discount: 10,
        room: mockRoom,
      });
      const booking_4 = new Booking({
        name: "Alicia Moreno",
        email: "booking@fake.com",
        checkIn: new Date("2024-08-07"),
        checkOut: new Date("2024-08-29"),
        discount: 10,
        room: mockRoom,
      });
      const booking_5 = new Booking({
        name: "Raul Guevara",
        email: "booking@fake.com",
        checkIn: new Date("2024-08-11"),
        checkOut: new Date("2024-08-29"),
        discount: 10,
        room: mockRoom,
      });

      const room1 = new Room({ name: "Room 1", bookings: [booking_1, booking_2], price: 450, discount: 23 });
      const room2 = new Room({ name: "Room 2", bookings: [booking_3, booking_4, booking_5], price: 250, discount: 5 });
      const roomList = [room1, room2];
      expect(Room.availableRooms(roomList, new Date("2024-08-15"), new Date("2024-08-20"))).toHaveLength(0);
    });

    test("check for a complete result for the static availableRooms function", () => {
      const booking_1 = new Booking({
        name: "Manolo Gomez",
        email: "booking@fake.com",
        checkIn: new Date("2024-08-01"),
        checkOut: new Date("2024-08-30"),
        discount: 10,
        room: mockRoom,
      });
      const booking_2 = new Booking({
        name: "Jennifer Beltran",
        email: "booking@fake.com",
        checkIn: new Date("2024-08-10"),
        checkOut: new Date("2024-08-30"),
        discount: 10,
        room: mockRoom,
      });
      const booking_3 = new Booking({
        name: "Jose Alfonso",
        email: "booking@fake.com",
        checkIn: new Date("2024-08-02"),
        checkOut: new Date("2024-08-22"),
        discount: 10,
        room: mockRoom,
      });
      const booking_4 = new Booking({
        name: "Alicia Moreno",
        email: "booking@fake.com",
        checkIn: new Date("2024-08-07"),
        checkOut: new Date("2024-08-29"),
        discount: 10,
        room: mockRoom,
      });
      const booking_5 = new Booking({
        name: "Raul Guevara",
        email: "booking@fake.com",
        checkIn: new Date("2024-08-11"),
        checkOut: new Date("2024-08-29"),
        discount: 10,
        room: mockRoom,
      });

      const room1 = new Room({ name: "Room 1", bookings: [booking_1, booking_2], price: 450, discount: 23 });
      const room2 = new Room({ name: "Room 2", bookings: [booking_3, booking_4, booking_5], price: 250, discount: 5 });
      const roomList = [room1, room2];

      expect(Room.availableRooms(roomList, new Date("2024-07-15"), new Date("2024-07-29"))).toHaveLength(2);
    });
  });
});

describe("Booking test", () => {
  test("should be for fee function", () => {
    const room = new Room({ name: "Room 1", bookings: [mockBooking], price: 450, discount: 23 });

    const booking_1 = new Booking({
      name: "Manolo Gomez",
      email: "booking@fake.com",
      checkIn: new Date("2024-08-01"),
      checkOut: new Date("2024-08-30"),
      discount: 10,
      room: room,
    });

    const room2 = new Room({ name: "Room 2", bookings: [mockBooking], price: 150, discount: 55 });
    const booking_2 = new Booking({
      name: "Jennifer Beltran",
      email: "booking@fake.com",
      checkIn: new Date("2024-08-10"),
      checkOut: new Date("2024-08-30"),
      discount: 10,
      room: room2,
    });
    console.log(booking_1.fee());
    console.log(booking_2.fee());
    expect(booking_1.fee()).toBe(311.85);
    expect(booking_2.fee()).toBe(60.75);
  });
});

/*
test("check for is occupied function", () => {
    const booking_1 = new Booking({ booking1 }, room1);
    const booking_2 = new Booking({ booking2 }, room1);
    const booking_3 = new Booking({ booking3 }, room2);
    const room = new Room(room1.name, [booking_1, booking_2, booking_3], room1.rate, room1.discount);
    expect(room.isOccupied(true)).toBe("Invalid data");
    expect(room.isOccupied("hello")).toBe("Invalid data");
    expect(room.isOccupied([])).toBe("Invalid data");
    expect(room.isOccupied(new Date("quesoParmesano"))).toBe("Invalid data");
  });

  test("check for occupancy percentage function", () => {
    const booking_1 = new Booking({ booking1 }, room1);
    const booking_2 = new Booking({ booking2 }, room1);
    const booking_3 = new Booking({ booking3 }, room2);
    const room = new Room(room1.name, [booking_1, booking_2, booking_3], room1.rate, room1.discount);
    expect(room.occupancyPercentage(true)).toBe("Invalid data");
    expect(room.occupancyPercentage("hello")).toBe("Invalid data");
    expect(room.occupancyPercentage("hello", "quesoParmesano")).toBe("Invalid data");
    expect(room.occupancyPercentage(true, false)).toBe("Invalid data");
    expect(room.occupancyPercentage([])).toBe("Invalid data");
    expect(room.occupancyPercentage(new Date("quesoParmesano"))).toBe("Invalid data");
    expect(room.occupancyPercentage(new Date("quesoParmesano"), new Date("JamonJoselito"))).toBe("Invalid data");
  });

  test("check for static occupancy percentage function", () => {
    expect(Room.totalOccupancyPercentage(true)).toBe("Invalid data");
    expect(Room.totalOccupancyPercentage("hello")).toBe("Invalid data");
    expect(Room.totalOccupancyPercentage("hello", "quesoParmesano", "letsgo party")).toBe("Invalid data");
    expect(Room.totalOccupancyPercentage(true, false, true)).toBe("Invalid data");
    expect(Room.totalOccupancyPercentage([])).toBe("Invalid data");
    expect(Room.totalOccupancyPercentage(new Date("quesoParmesano"))).toBe("Invalid data");
    expect(Room.totalOccupancyPercentage([], new Date("quesoParmesano"), new Date("JamonJoselito"))).toBe("Invalid data");
  });

  test("check for static available rooms function", () => {
    expect(Room.availableRooms(true)).toBe("Invalid data");
    expect(Room.availableRooms("hello")).toBe("Invalid data");
    expect(Room.availableRooms("hello", "quesoParmesano", "letsgo party")).toBe("Invalid data");
    expect(Room.availableRooms(true, false, true)).toBe("Invalid data");
    expect(Room.availableRooms([])).toBe("Invalid data");
    expect(Room.availableRooms(new Date("quesoParmesano"))).toBe("Invalid data");
    expect(Room.availableRooms([], new Date("quesoParmesano"), new Date("JamonJoselito"))).toBe("Invalid data");
  });
  */

//BOOKING TEST CLASS
/*
   test("check for invalid data", () => {
    expect(new Booking("quesoParmesano").result).toBe("Invalid data");
    expect(new Booking(123).result).toBe("Invalid data");
    expect(new Booking(true).result).toBe("Invalid data");
    expect(new Booking(true, true, true, true).result).toBe("Invalid data");
    expect(new Booking("JamonJoselito", "quesoParmesano", [], true, false).result).toBe("Invalid data");
  });

  test("check for valid data", () => {
    const booking = new Booking(booking1.name, booking1.email, booking1.checkin, booking1.checkout, booking1.discount, room1);

    expect(booking.name).toBe("Mock Booking");
    expect(booking.email).toBe("booking@fake.com");
    expect(booking.checkIn.getTime()).toBe(new Date("08/26/2024").getTime());
    expect(booking.checkOut.getTime()).toBe(new Date("09/26/2024").getTime());
    expect(booking.discount).toBe(10);
    expect(booking.room).toBe(mockRoom);
  });
  */
