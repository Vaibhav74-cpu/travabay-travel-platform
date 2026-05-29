import React, { useEffect, useState } from "react";
import { Form, useNavigate, useParams } from "react-router-dom";
import {
  useGetPackageByIdQuery,
  useUpdatePackageMutation,
} from "@/redux/slices/packageApiSlice";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { indiaData, tags, worldData } from "@/data/staticData";

function PackageEditScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: pkg, isLoading, isError } = useGetPackageByIdQuery(id);
  const [updatePackage, { isLoading: updating }] = useUpdatePackageMutation();

  // const indiaData = {
  //   "north-india": {
  //     "himachal pradesh": ["Manali", "Shimla", "Dharamshala"],
  //     uttarakhand: ["Nainital", "Rishikesh", "Haridwar"],
  //     "jammu kashmir": ["Srinagar", "Gulmarg"],
  //   },

  //   "south-india": {
  //     kerala: ["Munnar", "Alleppey", "Kochi"],
  //     tamilnadu: ["Ooty", "Kodaikanal", "Chennai"],
  //     karnataka: ["Coorg", "Bangalore"],
  //   },

  //   "west-india": {
  //     goa: ["North Goa", "South Goa"],
  //     gujarat: ["Ahmedabad", "Kutch"],
  //     rajasthan: ["Jaipur", "Udaipur", "Jaisalmer"],
  //     maharashtra: ["Mumbai", "Lonavala", "Pune"],
  //   },

  //   "north-east": {
  //     assam: ["Guwahati", "Kaziranga"],
  //     sikkim: ["Gangtok"],
  //     meghalaya: ["Shillong"],
  //   },
  // };

  // const worldData = {
  //   asia: {
  //     japan: ["Tokyo", "Kyoto", "Osaka"],
  //     thailand: ["Bangkok", "Phuket", "Krabi"],
  //     indonesia: ["Bali"],
  //   },

  //   europe: {
  //     france: ["Paris", "Nice"],
  //     italy: ["Rome", "Venice"],
  //     switzerland: ["Zurich", "Lucerne"],
  //   },

  //   america: {
  //     usa: ["New York", "Los Angeles", "Las Vegas"],
  //     canada: ["Toronto", "Vancouver"],
  //   },

  //   africa: {
  //     egypt: ["Cairo", "Luxor"],
  //     kenya: ["Nairobi"],
  //   },
  // };

  // const tagOptions = [
  //   "GROUP TOUR",
  //   "FAMILY",
  //   "BEACH",
  //   "ADVENTURE",
  //   "HONEYMOON",
  //   "TREKKING",
  // ];
  const [type, setType] = useState(""); // india | world

  // india
  const [category, setCategory] = useState("");
  const [stateName, setStateName] = useState("");
  const [city, setCity] = useState("");

  // world
  const [continent, setContinent] = useState("");
  const [country, setCountry] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [input, setInput] = useState({
    title: "",
    badge: "",
    tags: [],
    rating: "",
    reviews: "",
    inclusive: false,
    days: "",
    destinations: "",
    departures: "",
    highlights: "",
    price: "",
    priceNote: "",
    imageFile: "",
  });

  useEffect(() => {
    if (pkg) {
      setInput({
        title: pkg.title || "",
        badge: pkg.badge || "",
        tags: pkg.tags || [],
        rating: pkg.rating || "",
        reviews: pkg.reviews || "",
        inclusive: pkg.inclusive || false,
        days: pkg.days || "",
        destinations: pkg.destinations || "",
        departures: pkg.departures || "",
        highlights: pkg.highlights || "",
        price: pkg.price || "",
        priceNote: pkg.priceNote || "",
        image: pkg.image || "",
      });
      setType(pkg.type || [] || "");
    }
  }, [pkg]);

  const handleBadgeChange = (e) => {
    setInput((prev) => ({
      ...prev,
      badge: e.target.value,
    }));
  };

  const handleTagChange = (tag) => {
    setInput((prev) => {
      const exists = prev.tags.includes(tag);

      return {
        ...prev,
        tags: exists ? prev.tags.filter((t) => t !== tag) : [...prev.tags, tag],
      };
    });
  };

  const inputHandler = (e) => {
    const { name, value, type, checked } = e.target;

    setInput((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const updateHandler = async (e) => {
    e.preventDefault();
    if (type === "india") {
      if (!category || !stateName || !city) {
        toast.error("Please select Category, State and City");
        return;
      }
    }

    if (type === "world") {
      if (!continent || !country || !city) {
        toast.error("Please select Continent, Country and City");
        return;
      }
    }

    const formData = new FormData();
    formData.append("title", input.title);
    formData.append("badge", input.badge);
    formData.append("tags", JSON.stringify(input.tags));
    formData.append("rating", input.rating);
    formData.append("reviews", input.reviews);
    formData.append("inclusive", input.inclusive);
    formData.append("days", input.days);
    formData.append("destinations", input.destinations);
    formData.append("departures", input.departures);
    formData.append("highlights", input.highlights);
    formData.append("price", input.price);
    formData.append("priceNote", input.priceNote);
    if (imageFile) {
      formData.append("image", imageFile);
    }
    formData.append("type", type);
    if (type === "india") {
      formData.append("category", category);
      formData.append("group", stateName);
      formData.append("destinationName", city);
    }

    if (type === "world") {
      formData.append("category", continent);
      formData.append("group", country);
      formData.append("destinationName", city);
    }

    try {
      const res = await updatePackage({ id, formData }).unwrap();
      setImageFile(res.image);
      navigate("/admin/packages");
      toast.success(res?.data?.message || "package Updated");
    } catch (error) {
      toast.error(error?.data?.message || "");
    }
  };
  return (
    <div>
      <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-4">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/packages")}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={18} />
            <span className="hidden sm:inline">Back</span>
          </Button>
        </div>
        <h1 className="text-2xl font-bold mb-6">Edit Package Details</h1>

        <form
          onSubmit={updateHandler}
          className="bg-white p-6 rounded-xl shadow space-y-6"
        >
          {/* REGIONS / CATEGORY / GROUP / CITY */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            <select
              value={type}
              onChange={(e) => {
                setType(e.target.value);

                // reset everything
                setCategory("");
                setStateName("");
                setCity("");
                setContinent("");
                setCountry("");
              }}
              className="input"
            >
              <option value="">Select Type</option>
              <option value="india">India</option>
              <option value="world">World</option>
            </select>
            {type === "india" && (
              <>
                {/* CATEGORY */}
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setStateName("");
                    setCity("");
                  }}
                  className="input"
                >
                  <option value="">Select Category</option>
                  {Object.keys(indiaData).map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>

                {/* STATE */}
                {category && (
                  <select
                    value={stateName}
                    onChange={(e) => {
                      setStateName(e.target.value);
                      setCity("");
                    }}
                    className="input"
                  >
                    <option value="">Select State</option>
                    {Object.keys(indiaData[category]).map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                )}

                {/* CITY */}
                {stateName && (
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="input"
                  >
                    <option value="">Select City</option>
                    {indiaData[category][stateName].map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                )}
              </>
            )}

            {type === "world" && (
              <>
                {/* CONTINENT */}
                <select
                  value={continent}
                  onChange={(e) => {
                    setContinent(e.target.value);
                    setCountry("");
                    setCity("");
                  }}
                  className="input"
                >
                  <option value="">Select Continent</option>
                  {Object.keys(worldData).map((cont) => (
                    <option key={cont} value={cont}>
                      {cont}
                    </option>
                  ))}
                </select>

                {/* COUNTRY */}
                {continent && (
                  <select
                    value={country}
                    onChange={(e) => {
                      setCountry(e.target.value);
                      setCity("");
                    }}
                    className="input"
                  >
                    <option value="">Select Country</option>
                    {Object.keys(worldData[continent]).map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                )}

                {/* CITY */}
                {country && (
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="input"
                  >
                    <option value="">Select City</option>
                    {worldData[continent][country].map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                )}
              </>
            )}
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="title"
              value={input.title}
              onChange={inputHandler}
              placeholder="Title"
              className="input"
            />

            {/* BADGE */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Badge
              </label>

              <select
                name="badge"
                value={input.badge || ""}
                onChange={handleBadgeChange}
                className="input bg-white"
              >
                <option value="">Select Badge</option>
                <option value="HOT DEAL">HOT DEAL</option>
                <option value="LIMITED OFFER">LIMITED OFFER</option>
                <option value="BEST SELLER">BEST SELLER</option>
                <option value="NEW">NEW</option>
              </select>
            </div>

            {/* TAGS */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Tags
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {tags.map((tag) => (
                  <label
                    key={tag}
                    className={`flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer transition ${
                      input.tags.includes(tag)
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-gray- 50 hover:bg-gray-100"
                    }`}
                  >
                    <input
                      type="checkbox"
                      value={tag}
                      checked={input.tags.includes(tag)}
                      onChange={() => handleTagChange(tag)}
                      className="hidden"
                    />

                    <span className="text-sm font-medium">{tag}</span>
                  </label>
                ))}
              </div>
            </div>

            <input
              type="number"
              name="rating"
              value={input.rating}
              onChange={inputHandler}
              placeholder="Rating"
              className="input"
            />

            <input
              type="number"
              name="reviews"
              value={input.reviews}
              onChange={inputHandler}
              placeholder="Reviews"
              className="input"
            />

            <input
              type="text"
              name="days"
              value={input.days}
              onChange={inputHandler}
              placeholder="Days (e.g. 7 Nights 8 Days)"
              className="input"
            />

            <input
              type="number"
              name="destinations"
              value={input.destinations}
              onChange={inputHandler}
              placeholder="Destinations"
              className="input"
            />

            <input
              type="number"
              name="departures"
              value={input.departures}
              onChange={inputHandler}
              placeholder="Departures"
              className="input"
            />

            <input
              type="number"
              name="price"
              value={input.price}
              onChange={inputHandler}
              placeholder="Price"
              className="input"
            />

            <input
              type="text"
              name="priceNote"
              value={input.priceNote}
              onChange={inputHandler}
              placeholder="Price Note"
              className="input"
            />
          </div>

          {/* Highlights */}
          <textarea
            name="highlights"
            value={input.highlights}
            onChange={inputHandler}
            placeholder="Highlights"
            className="input w-full h-24"
          />

          {/* Image */}
          <input
            type="file"
            onChange={(e) => setImageFile(e.target.files[0])}
            placeholder="select image"
          />

          {/* <input
            type="text"
            name="image"
            value={formData.image}
            onChange={inputHandler}
            placeholder="Image URL"
            className="input w-full"
          /> */}

          {/* Preview */}
          {input.image && (
            <img src={input.image} alt="preview" className="w-40 rounded-lg" />
          )}

          {/* Checkbox */}
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="inclusive"
              checked={input.inclusive}
              onChange={inputHandler}
            />
            Inclusive Package
          </label>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/admin/packages")}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-black text-white px-6 py-2 rounded"
              disabled={updating}
            >
              {updating ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PackageEditScreen;
