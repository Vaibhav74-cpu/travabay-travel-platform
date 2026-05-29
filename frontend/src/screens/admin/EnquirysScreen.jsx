import React from "react";
import AdminDashboard from "./AdminDashboard";
import {
  useDeleteEnquiryMutation,
  useGetEnquiriesQuery,
  useUpdateEnquieryStatusMutation,
} from "@/redux/slices/enquieryApiSlice";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle, Clock } from "lucide-react";
import { FaTrash } from "react-icons/fa";
import { toast } from "sonner";

function EnquirysScreen() {
  const { data, isLoading, isError, refetch } = useGetEnquiriesQuery();
  const [updateEnquiery] = useUpdateEnquieryStatusMutation();
  const [deleteEnq] = useDeleteEnquiryMutation();

  const deleteEnquiery = async (id) => {
    if (window.confirm("Are you sure want to delete this Enquiery")) {
      try {
        const res = await deleteEnq(id);
        refetch();
        toast.success(
          res?.message || res?.data?.message || "Enquiery Deleted successfully",
        );
      } catch (error) {
        toast.error(error?.data?.message || error?.message);
      }
    }
  };

  const enquieryMarkAsDone = async (id) => {
    try {
      const res = await updateEnquiery(id);
      refetch();
      toast.success(
        res?.message || res?.data?.message || "Enquiery Mark as Done",
      );
    } catch (error) {
      toast.error(error?.data?.message || error?.message);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminDashboard />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex flex-col sm:flex-row justify-between items-center  gap-4">
          <h2 className="font-bold text-2xl text-gray-800">ENQUIRIES</h2>
        </div>
        <div className="mt-6 bg-white shadow rounded-xl p-4 overflow-x-auto">
          <Table>
            <TableCaption>A list of Enquiries</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Travellers</TableHead>
                <TableHead>Travel Details</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.enquiries?.map((enquiry) => (
                <TableRow key={enquiry._id}>
                  {/* NAME */}
                  <TableCell>{enquiry?.name}</TableCell>

                  {/* EMAIL */}
                  <TableCell>{enquiry?.email}</TableCell>

                  {/* PHONE NUMBER */}
                  <TableCell>{enquiry?.phoneNumber}</TableCell>

                  {/*  DESTINATION */}
                  <TableCell>{enquiry?.destination}</TableCell>

                  {/* TRAVELLERS */}
                  <TableCell>{enquiry?.travellers}</TableCell>

                  {/* TRAVEL DETAILS */}
                  <TableCell>{enquiry?.travelDetails}</TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-4">
                      {/* Edit */}
                      <button
                        onClick={() => enquieryMarkAsDone(enquiry._id)}
                        className="text-blue-500 hover:text-blue-700 text-lg"
                      >
                        {enquiry.status === "pending" ? (
                          <Clock size={20} />
                        ) : (
                          <CheckCircle size={20} />
                        )}
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => deleteEnquiery(enquiry._id)}
                        className="text-red-500 hover:text-red-700 text-lg"
                      >
                        <FaTrash />
                      </button>
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

export default EnquirysScreen;
