import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { FaWhatsapp } from "react-icons/fa";

function ReserveSpot({ pkg, reserveSpot }) {

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState({
    fullName: "",
    countryCode: "+91",
    phoneNumber: "",
    email: "",
    tripDetails: "",
    specialRequest: "",
    whatsappUpdates: true,
    departureCity: "",
    departureDate: "",
    packageId: pkg?._id,
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;

    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const payload = {
      fullName: input.fullName || "",
      countryCode: input.countryCode || "+91",
      phoneNumber: input.phoneNumber || "",
      email: input.email || "",
      tripDetails: input.tripDetails || "",
      specialRequest: input.specialRequest,
      whatsappUpdates: input.whatsappUpdates,
      departureCity: input.departureCity || "All departures",
      departureDate: input.departureDate || "",
      packageId: pkg?._id,
    };

    try {
      const res = await reserveSpot(payload).unwrap();
      toast.success(
        res?.data?.message ||
          res?.message ||
          "Reservation created successfully",
        {
          style: {
            background: "white",
            color: "black",
            border: "1px solid #e5e7eb",
          },
        },
      );
      setOpen(false);
      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* BUTTON */}
      <SheetTrigger asChild>
        <Button
          type="button"
          className="w-full h-11 bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 rounded-xl text-sm transition-colors"
        >
          Reserve your spot
        </Button>
      </SheetTrigger>

      {/* SIDEBAR */}
      <SheetContent
        side="right"
        className="w-full sm:max-w-xl overflow-y-auto bg-white border-l shadow-2xl pt-0"
      >
        <div className="px-2 pt-0 pb-1 bg-white">
          <SheetHeader className="text-left">
            <p className="text-[11px] uppercase tracking-[0.18em] text-gray-400 font-medium">
              Travabay Holidays
            </p>

            <SheetTitle className="text-[28px] text-xl font-bold leading-tight text-gray-900">
              Traveller details & booking
            </SheetTitle>

            <SheetDescription className="text-sm text-gray-500 leading-relaxed">
              Select your departure city & date, share your details and reserve
              your trip instantly.
            </SheetDescription>
          </SheetHeader>
        </div>

        {/* PACKAGE INFO */}
        <div className="px-4 mx-2">
          <h3 className="font-bold text-lg uppercase">
            {pkg?.title} <span className="text-blue-800">({pkg?.group})</span>
          </h3>

          <div className="flex items-center gap-3 text-gray-500  text-sm">
            <span>{pkg?.days}</span>
            <span>•</span>
            <span>{pkg?.departures} departures</span>
            <span>•</span>
            <span>₹{pkg?.price}</span>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={submitHandler} className="space-y-3">
          <Input
            type="text"
            name="fullName"
            value={input.fullName}
            onChange={inputHandler}
            placeholder="Full Name*"
            required
            className="h-10  rounded-xl"
          />

          {/* PHONE */}
          <div className="grid grid-cols-3 gap-3">
            <select
              name="countryCode"
              value={input.countryCode}
              onChange={inputHandler}
              className="w-full h-10 rounded-xl border border-input px-3 text-sm"
            >
              <option value="+91">IN +91</option>
              <option value="+1">US +1</option>
              <option value="+44">UK +44</option>
            </select>

            <div className="col-span-2">
              <Input
                type="tel"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={inputHandler}
                placeholder="Phone Number*"
                required
                className="h-10 rounded-xl"
              />
            </div>
          </div>

          {/* EMAIL */}
          <Input
            type="email"
            name="email"
            value={input.email}
            onChange={inputHandler}
            placeholder="Email ID*"
            required
            className="h-10 rounded-xl"
          />

          {/* DETAILS */}
          <Textarea
            name="tripDetails"
            value={input.tripDetails}
            onChange={inputHandler}
            placeholder="Tell us about your trip or special requests*"
            required
            className="min-h-[80px] rounded-xl resize-none"
          />

          <Input
            type="text"
            name="departureCity"
            value={input.departureCity}
            onChange={inputHandler}
            placeholder="Departure City (e.g. Nagpur, Mumbai)"
            className="h-12 rounded-xl"
            maxLength={14}
            required
          />

          <Input
            type="date"
            name="departureDate"
            value={input.departureDate}
            onChange={inputHandler}
            min={new Date().toISOString().split("T")[0]}
            required
            className="h-12 rounded-xl"
          />

          {/* OPTIONAL */}
          <Textarea
            name="specialRequest"
            value={input.specialRequest}
            onChange={inputHandler}
            placeholder="Special requests (optional)"
            className="min-h-[80px] rounded-xl resize-none"
          />

          {/* WHATSAPP */}
          <div className="flex items-center gap-3">
            <Checkbox
              checked={input.whatsappUpdates}
              onCheckedChange={(checked) =>
                setInput((prev) => ({
                  ...prev,
                  whatsappUpdates: checked === true,
                }))
              }
            />

            <Label className="text-sm flex items-center gap-2">
              Receive updates on{" "}
              <span className="text-green-700">WhatsApp</span> <FaWhatsapp />
            </Label>
          </div>

          {/* BUTTON */}
          <Button
            type="submit"
            className="w-full h-12 rounded-xl bg-amber-400 hover:bg-amber-500 text-black font-semibold"
          >
            Reserve your spot
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}

export default ReserveSpot;
