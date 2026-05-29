import asyncHandler from "../middleware/asyncHandler.js";
import Enquiry from "../model/enquiryModel.js";

// desc -> send enquiery to admin
// route-> /api/user/enquiery
//access-> public
export const sendEnquiry = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    countryCode,
    phoneNumber,
    destination,
    travellers,
    travelDetails,
  } = req.body;

  // Validation
  if (!name || !email || !phoneNumber || !destination || !travellers) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  // Create enquiry
  const enquiry = new Enquiry({
    name,
    email,
    countryCode: countryCode || "+91",
    phoneNumber,
    destination,
    travellers,
    travelDetails: travelDetails || "",
  });

  const createdEnquiry = await enquiry.save();

  res.status(201).json({
    success: true,
    message: "Enquiry sent successfully",
    enquiry: createdEnquiry,
  });
});

//@desc   get all enquiries
//@routes  get /api/enquiies
//@access  /private/admin
export const getEnquiries = asyncHandler(async (req, res) => {
  const enquiries = await Enquiry.find({}).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: enquiries.length,
    enquiries,
  });
});

//@desc   mark as done enquiry
//@routes  put /api/enquiry/:id/done
//@access  /private/admin
export const markEnquiryDone = asyncHandler(async (req, res) => {
  const enquiry = await Enquiry.findById(req.params.id);

  if (!enquiry) {
    res.status(404);
    throw new Error("Enquiry not found");
  }

  enquiry.status = "done";

  const updatedEnquiry = await enquiry.save();

  res.status(200).json({
    success: true,
    message: "Enquiry marked as done",
    enquiry: updatedEnquiry,
  });
});

//@desc    delete enquiery
//@routes  delete /api/admin/:id
//@access  /private/admin
export const deleteEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await Enquiry.findById(req.params.id);

  if (!enquiry) {
    res.status(404);
    throw new Error("Enquiry not found");
  }

  await enquiry.deleteOne();

  res.status(200).json({
    success: true,
    message: "Enquiry deleted successfully",
  });
});
