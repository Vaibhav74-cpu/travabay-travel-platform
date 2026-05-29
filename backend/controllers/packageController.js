import asyncHandler from "../middleware/asyncHandler.js";
import dotenv from "dotenv";
dotenv.config();
import getDataUri from "../util/dataUri.js";
import cloudinary from "../services/cloudinary.js";
import Package from "../model/packageModel.js";
import { log } from "console";

// desc -> fetch all products
// route-> /api/packages/
//access-> public
export const getPackages = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? { title: { $regex: req.query.keyword, $options: "i" } }
    : {};
  const packages = await Package.find({ ...keyword });
  res.json(packages);
});

// desc -> fetch a packages
// route-> /api/packages/id
//access-> public
export const getPackageById = asyncHandler(async (req, res) => {
  const pkg = await Package.findById(req.params.id);
  if (pkg) {
    return res.json(pkg);
  } else {
    res.status(404);
    throw new Error("Package not found");
  }
});

// @desc    Create New Package
// @route   POST /api/package/add
// @access  Private/Admin
export const createNewPackage = asyncHandler(async (req, res) => {
  const {
    title,
    badge,
    tags,
    rating,
    reviews,
    inclusive,
    days,
    // destinations,
    departures,
    highlights,
    price,
    priceNote,

    type,
    category,
    group,
    destinationName,
  } = req.body;

  const image = req.file;

  // Required field validation
  if (
    !title ||
    !price ||
    !days ||
    // !destinations ||
    !departures ||
    !highlights ||
    !type ||
    !category ||
    !group ||
    !destinationName
  ) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  // Image validation
  if (!image) {
    return res.status(400).json({
      success: false,
      message: "Please upload package image",
    });
  }

  // Convert image to data URI
  const imageUri = getDataUri(image);

  // Upload to Cloudinary
  const cloudResponse = await cloudinary.uploader.upload(imageUri.content);

  let parsedTags = [];

  if (tags) {
    try {
      parsedTags = typeof tags === "string" ? JSON.parse(tags) : tags;
    } catch (error) {
      parsedTags = [];
    }
  }

  // Create package using your package structure from uploaded data :contentReference[oaicite:0]{index=0}
  const packageData = new Package({
    title: title || "Sample Package",
    image: cloudResponse.secure_url || "https://sample-image.jpg",

    badge: badge || "NEW",

    tags: parsedTags,

    rating: rating || 0,
    reviews: reviews || 0,

    inclusive: inclusive !== undefined ? inclusive : true,

    days: days || "5 Days 4 Nights",
    // destinations: destinations || 1,
    departures: departures || 1,

    highlights: highlights || "Sample package highlights",

    price: price || 0,

    priceNote: priceNote || "Prices are on twin-sharing basis.",

    type: type || "Type is not consider",
    category: category || "Type is not consider",
    group: group || "it will comes later",

    destinationName:
      destinationName.toLowerCase() ||
      destinationName ||
      "Destination is comes later",

    user: req.admin._id,
  });

  const createdPackage = await packageData.save();

  res.status(201).json({
    success: true,
    message: "Package created successfully",
    package: createdPackage,
  });
});

// desc -> update product details
// route-> /api/products/:id
//access-> private/admin
export const updatePackage = asyncHandler(async (req, res) => {
  const {
    title,
    badge,
    tags,
    rating,
    reviews,
    inclusive,
    days,
    // destinations,
    departures,
    highlights,
    price,
    priceNote,

    type,
    category,
    group,
    destinationName,
  } = req.body;
  const image = req.file;


  const pkg = await Package.findById(req.params.id);
  if (!pkg) {
    res.status(404);
    throw new Error("Package not found");
  }

  const parsedTags = tags ? JSON.parse(tags) : [];

  let imageUrl = pkg.image; // keep old image
  if (image) {
    const imageUri = getDataUri(image);
    const cloudResponse = await cloudinary.uploader.upload(
      imageUri.content,
      // {
      //   folder:"shop/products",
      // }
    );
    imageUrl = cloudResponse.secure_url;
  }

  pkg.user = pkg.user || req.admin._id || req.admin;

  if (pkg) {
    pkg.title = title;
    pkg.badge = badge;
    pkg.tags = parsedTags;
    pkg.rating = rating;
    pkg.reviews = reviews;
    pkg.inclusive = inclusive;
    pkg.days = days;
    // pkg.destinations = destinations;
    pkg.departures = departures;
    pkg.highlights = highlights;
    pkg.price = price;
    pkg.priceNote = priceNote;
    pkg.image = imageUrl || image;
    pkg.type = type || pkg.type;
    pkg.category = category || pkg.category;
    pkg.group = group || pkg.group;
    pkg.destinationName = destinationName?.toLowerCase() || pkg.destinationName;

    const updatedPackage = await pkg.save();

    res.status(200).json({
      success: true,
      message: "Package updated successfully",
      package: updatedPackage,
    });
  } else {
    res.status(404);
    throw new Error("Package not found");
  }
});

// desc -> delete a product
// route-> /api/products/:id
//access-> private/admin
export const deletePackage = asyncHandler(async (req, res) => {
  const pkg = await Package.findById(req.params.id);
  if (pkg) {
    await Package.deleteOne({ _id: pkg._id });
    res.status(200).json({ message: "Package deleted" });
  } else {
    res.status(404);
    throw new Error("Package not found");
  }
});

//@desc get packages by city
//@route /api/package/city/:city
//access pbu
export const getPackagesByCity = asyncHandler(async (req, res) => {
  const { city } = req.params;

  const packages = await Package.find({
    destinationName: { $regex: `^${city}$`, $options: "i" },
  });

  res.json(packages);
});
