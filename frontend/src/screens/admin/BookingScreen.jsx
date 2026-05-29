import {
  useDeleteBookingMutation,
  useGetBookingsQuery,
  useUpdatBookingStatusMutation,
} from "@/redux/slices/bookingApiSlice";
import React from "react";
import AdminDashboard from "./AdminDashboard";
import { FaTrash, FaWhatsapp } from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CheckCircle,
  CheckCircle2,
  Clock,
  MoreVertical,
  XCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

function BookingScreen() {
  const { data, isLoading, isError, refetch } = useGetBookingsQuery();

  const [deleteBkg] = useDeleteBookingMutation();
  const [updateBkg] = useUpdatBookingStatusMutation();

  const updateBookingStatus = async (bookingId, status) => {
    try {
      const res = await updateBkg({ bookingId, status }).unwrap();
      refetch();
      toast.success(res?.message || res?.data?.message || `Booking ${status}`);
    } catch (error) {
      toast.error(error?.data?.message || error?.message);
    }
  };

  const deletebooking = async (bookingId) => {
    if (window.confirm("Are you sure want to delete this Booking")) {
      try {
        const res = await deleteBkg(bookingId);
        refetch();
        toast.success(
          res?.message || res?.data?.message || "Booking Deleted successfully",
        );
      } catch (error) {
        toast.error(error?.data?.message || error?.message);
      }
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminDashboard />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex flex-col sm:flex-row justify-between items-center  gap-4">
          <h2 className="font-bold text-2xl text-gray-800">BOOKINGS</h2>
          <h2 className="font-bold text-2xl text-gray-800">TOTAL BOOKINGS : {data?.count}</h2>
        </div>
        <div className="mt-6 bg-white shadow rounded-xl p-4 overflow-x-auto">
          <Table>
            <TableCaption>A list of Bookings</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Full Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>title</TableHead>
                <TableHead>Departure City</TableHead>
                <TableHead>Departure Date</TableHead>
                <TableHead>Special Request</TableHead>
                <TableHead>Travel Details</TableHead>
                <TableHead>
                  <FaWhatsapp />
                </TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data?.bookings?.map((booking) => (
                <TableRow key={booking._id}>
                  {/* NAME */}
                  <TableCell>{booking?.fullName}</TableCell>

                  {/* EMAIL */}
                  <TableCell>{booking?.email}</TableCell>

                  {/* PHONE NUMBER */}
                  <TableCell>{booking?.phoneNumber}</TableCell>

                  {/* Price */}
                  <TableCell>{booking?.packageId?.price}</TableCell>

                  {/* title */}
                  <TableCell>{booking?.packageId?.title}</TableCell>

                  {/*  DEPARTURE CITY */}
                  <TableCell>{booking?.departureCity}</TableCell>

                  {/* DEPARTURE DATE */}
                  <TableCell>{booking?.departureDate}</TableCell>

                  {/* SPECIAL REQUEST */}
                  <TableCell>{booking?.specialRequest}</TableCell>

                  {/* TRAVEL DETAILS */}
                  <TableCell>
                    <div className="relative group max-w-[250px]">
                      <p className="truncate cursor-pointer">
                        {booking?.tripDetails}
                      </p>

                      <div className="absolute left-0 top-full mt-2 z-50 hidden group-hover:block w-96 p-4 bg-white border rounded-lg shadow-xl text-sm text-gray-700 whitespace-normal break-words">
                        {booking?.tripDetails}
                      </div>
                    </div>
                  </TableCell>

                  {/* WHATSAPP UPDATE */}
                  <TableCell>
                    {booking?.whatsappUpdates ? (
                      <CheckCircle className="text-green-500" size={20} />
                    ) : (
                      <XCircle className="text-red-500" size={20} />
                    )}
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {booking.status === "pending" && (
                          <>
                            <Clock className="text-yellow-500" size={18} />
                            <span className="text-yellow-600"></span>
                          </>
                        )}

                        {booking.status === "confirmed" && (
                          <>
                            <CheckCircle2
                              className="text-green-500"
                              size={18}
                            />
                            <span className="text-green-600"></span>
                          </>
                        )}

                        {booking.status === "cancelled" && (
                          <>
                            <XCircle className="text-red-500" size={18} />
                            <span className="text-red-600"></span>
                          </>
                        )}
                      </div>

                      <div className="flex justify-center gap-4">
                        {/* Edit */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="p-2 hover:bg-gray-100 rounded">
                              <MoreVertical size={18} />
                            </button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() =>
                                updateBookingStatus(booking._id, "confirmed")
                              }
                              className="text-green-600"
                            >
                              Confirm
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={() =>
                                updateBookingStatus(booking._id, "cancelled")
                              }
                              className="text-red-600"
                            >
                              Cancel
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Delete */}
                        <button
                          onClick={() => deletebooking(booking._id)}
                          className="text-red-500 hover:text-red-700 text-lg"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default BookingScreen;
