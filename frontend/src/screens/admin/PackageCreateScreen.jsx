import { Button } from "@/components/ui/button";
import { indiaData, tags, worldData } from "@/data/staticData";
import { useCreatePackageMutation } from "@/redux/slices/packageApiSlice";
import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function PackageCreateScreen() {
  const navigate = useNavigate();
  const [createPkg, { isLoading, isError }] = useCreatePackageMutation();

  // STATES
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [type, setType] = useState(""); // india | world

  // india
  const [category, setCategory] = useState("");
  const [stateName, setStateName] = useState("");
  const [city, setCity] = useState("");

  // world
  const [continent, setContinent] = useState("");
  const [country, setCountry] = useState("");
  const [input, setInput] = useState({
    title: "",
    badge: "",
    tags: [],
    rating: "",
    reviews: "",
    inclusive: false,
    days: "",
    // city: "",
    departures: "",
    highlights: "",
    price: "",
    priceNote: "",
    image: "",
  });

  const inputHandler = (e) => {
    const { name, value, type, checked } = e.target;

    setInput((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
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

  const createPackageHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", input.title);
    formData.append("badge", input.badge);
    formData.append("tags", JSON.stringify(input.tags));
    formData.append("rating", input.rating);
    formData.append("reviews", input.reviews);
    formData.append("inclusive", input.inclusive);
    formData.append("days", input.days);
    formData.append("departures", input.departures);
    formData.append("highlights", input.highlights);
    formData.append("price", input.price);
    formData.append("priceNote", input.priceNote);
    formData.append("type", type);
    if (imageFile) {
      formData.append("image", imageFile);
    }

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
      const res = await createPkg(formData).unwrap();
      toast.success(res?.data?.message || "Package created", {
        position: "top-center",
      });
      navigate("/admin/packages");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to create package");
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
        <h1 className="text-2xl font-bold mb-6">Add New Package</h1>

        <form
          onSubmit={createPackageHandler}
          className="bg-white p-6 rounded-xl shadow space-y-6"
        >
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
              name="departures"
              min={1}
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
          {/* <input
            type="file"
            onChange={(e) => setImageFile(e.target.files[0])}
            placeholder="select image"
          /> */}
          {/* Preview */}
          {/* {input.image && (
            <img src={input.image} alt="preview" className="w-40 rounded-lg" />
          )
          } */}

          {/* Image */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];

              if (file) {
                setImageFile(file);
                setImagePreview(URL.createObjectURL(file));
              }
            }}
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-4 w-40 h-40 object-cover rounded-lg border"
            />
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
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded"
              disabled={isLoading}
            >
              {isLoading ? "Creating" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PackageCreateScreen;
