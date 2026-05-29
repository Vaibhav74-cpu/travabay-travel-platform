import asyncHandler from "../middleware/asyncHandler.js";
import Booking from "../model/bookingModel.js";

// @desc   book Your Spot
// @route  POST /api/booking
// @access  Public
export const reserveSpot = asyncHandler(async (req, res) => {
  const {
    fullName,
    countryCode,
    phoneNumber,
    email,
    tripDetails,
    specialRequest,
    whatsappUpdates,
    departureCity,
    departureDate,
    packageId,
  } = req.body;

  // Validation
  if (
    !fullName ||
    !phoneNumber ||
    !email ||
    !tripDetails ||
    !packageId ||
    !departureCity
  ) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  const booking = new Booking({
    fullName,
    countryCode: countryCode || "+91",
    phoneNumber,
    email,
    tripDetails,
    specialRequest: specialRequest || "",
    whatsappUpdates: whatsappUpdates !== undefined ? whatsappUpdates : true,
    departureCity: departureCity || "All departures",
    departureDate: departureDate || "",
    packageId,
  });

  const createdBooking = await booking.save();

  res.status(201).json({
    success: true,
    message: "Reservation created successfully",
    booking: createdBooking,
  });
});

// @desc   get all bookings
// @route  get /api/booking
// @access  Private/admin
export const getBookings = asyncHandler(async (req, res) => {
  // latest bookings first
  const bookings = await Booking.find({})
    .populate("packageId", "title image price")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: bookings.length,
    bookings,
  });
});

// @desc    get booking by ID
// @route   get /api/booking/:id
// @access  Private/Admin
export const getBookingById = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id).populate(
    "packageId",
    "title image price",
  );

  if (!booking) {
    res.status(404);
    throw new Error("Booking not found");
  }

  res.status(200).json({
    success: true,
    booking,
  });
});

// @desc   mark booking status as cancel or confirmed
// @route   Put /api/booking/:id/status
// @access  Private/Admin
export const updateBookingStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  if (!status || !["confirmed", "cancelled"].includes(status)) {
    res.status(400);
    throw new Error("Status must be either confirmed or cancelled");
  }

  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    res.status(404);
    throw new Error("Booking not found");
  }

  booking.status = status;

  const updatedBooking = await booking.save();

  res.status(200).json({
    success: true,
    message: `Booking marked as ${status}`,
    booking: updatedBooking,
  });
});

// @desc   delete booking
// @route   delete /api/booking/:id
// @access  Private/Admin
export const deleteBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    res.status(404);
    throw new Error("Booking not found");
  }

  await booking.deleteOne();

  res.status(200).json({
    success: true,
    message: "Booking deleted successfully",
  });
});
