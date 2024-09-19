const Room = require("./index").Room;
const Booking = require("./index").Booking;

const room1 = {
  name: "Room 1",
  rate: 250,
  discount: 14,
};

const room2 = {
  name: "Room 2",
  rate: 450,
  discount: 23,
};

const booking1 = {
  name: "booking edreams",
  email: "booking@fake.com",
  checkin: new Date("08/26/2024"),
  checkout: new Date("09/26/2024"),
  discount: 10,
};

const booking2 = {
  name: "booking trivago",
  email: "booking2@fake.com",
  checkin: new Date("08/24/2024"),
  checkout: new Date("10/26/2024"),
  discount: 30,
};

const booking3 = {
  name: "booking corteIngles",
  email: "booking3@fake.com",
  checkin: new Date("08/26/2024"),
  checkout: new Date("08/27/2024"),
  discount: 50,
};

describe("Room tests", () => {
  const booking_1 = new Booking({ booking1 }, room1);
  const booking_2 = new Booking({ booking2 }, room1);
  const booking_3 = new Booking({ booking3 }, room2);

  const room = new Room(room1.name, [booking_1, booking_2, booking_3], room1.rate, room1.discount);
  const room_2 = new Room(room2.name, [booking_1, booking_2, booking_3], room2.rate, room2.discount);

  test("check for invalid typeOf data names", () => {
    expect(new Room(1234)).toBe("Invalid type Name");
    expect(new Room(true)).toBe("Invalid type Name");
    expect(new Room({})).toBe("Invalid type Name");
    expect(new Room(null)).toBe("Invalid type Name");
  });

  test("check for invalid typeOf Dates Room", () => {
    expect(new Room("room 1", true, false)).toBe("Invalid type Dates");
  });

  test("check for valid Date booked", () => {
    expect(room.name).toBe("Mock Room");
    expect(room.rate).toBe(20000);
    expect(room.discount).toBe(10);
    expect(room.bookings).toHaveLength(3);
  });

  test("check for is occupied function", () => {
    expect(room.isOccupied(true)).toBe("Invalid data");
    expect(room.isOccupied("hello")).toBe("Invalid data");
    expect(room.isOccupied([])).toBe("Invalid data");
    expect(room.isOccupied(new Date("quesoParmesano"))).toBe("Invalid data");
  });

  test("check if is occupied function actually works", () => {
    expect(room.isOccupied(new Date("08/26/2024"))).toBe(true);
    expect(room.isOccupied(new Date("08/26/2025"))).toBe(false);
  });

  test("check for occupancy percentage function", () => {
    expect(room.occupancyPercentage(true)).toBe("Invalid data");
    expect(room.occupancyPercentage("hello")).toBe("Invalid data");
    expect(room.occupancyPercentage("hello", "quesoParmesano")).toBe("Invalid data");
    expect(room.occupancyPercentage(true, false)).toBe("Invalid data");
    expect(room.occupancyPercentage([])).toBe("Invalid data");
    expect(room.occupancyPercentage(new Date("quesoParmesano"))).toBe("Invalid data");
    expect(room.occupancyPercentage(new Date("quesoParmesano"), new Date("JamonJoselito"))).toBe("Invalid data");
  });

  test("check if occupancy percentage function actually works", () => {
    expect(room.occupancyPercentage(new Date("08/26/2024"), new Date("08/28/2024"))).toBe(100);
    expect(room.occupancyPercentage(new Date("08/25/2024"), new Date("08/26/2024"))).toBe((1 / 3) * 100);
    expect(room.occupancyPercentage(new Date("08/26/2030"), new Date("08/28/2030"))).toBe(0);
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

  test("check if static occupancy percentage function actually works", () => {
    expect(Room.totalOccupancyPercentage(roomList, new Date("08/26/2024"), new Date("08/28/2024"))).toBe(100);
    expect(Room.totalOccupancyPercentage(roomList, new Date("08/26/2030"), new Date("08/28/2030"))).toBe(0);
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

  test("check if static occupancy percentage function actually works", () => {
    expect(Room.availableRooms(roomList, new Date("08/26/2024"), new Date("08/28/2024"))).toHaveLength(0);
    expect(Room.availableRooms(roomList, new Date("08/26/2030"), new Date("08/28/2030"))).toHaveLength(2);
  });
});

describe("Booking test", () => {
  const booking = new Booking(booking1.name, booking1.email, booking1.checkin, booking1.checkout, booking1.discount, room1);
  const booking2 = new Booking(mockBooking2.name, mockBooking2.email, mockBooking2.checkin, mockBooking2.checkout, mockBooking2.discount, mockRoom);

  test("check for invalid data", () => {
    expect(new Booking("quesoParmesano").result).toBe("Invalid data");
    expect(new Booking(123).result).toBe("Invalid data");
    expect(new Booking(true).result).toBe("Invalid data");
    expect(new Booking(true, true, true, true).result).toBe("Invalid data");
    expect(new Booking("JamonJoselito", "quesoParmesano", [], true, false).result).toBe("Invalid data");
  });

  test("check for valid data", () => {
    expect(booking.name).toBe("Mock Booking");
    expect(booking.email).toBe("booking@fake.com");
    expect(booking.checkIn.getTime()).toBe(new Date("08/26/2024").getTime());
    expect(booking.checkOut.getTime()).toBe(new Date("09/26/2024").getTime());
    expect(booking.discount).toBe(10);
    expect(booking.room).toBe(mockRoom);
  });

  test("check for fee function", () => {
    expect(booking.fee()).toBe(162);
    expect(booking2.fee()).toBe(126);
  });
});
