import { ENQUIRY_URL } from "@/constant";
import { apiSlice } from "./apiSlice";

export const enquieryApislice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //USER CREATE ENQUIRY
    sendEnquiery: builder.mutation({
      query: (data) => ({
        url: `/api/enquiry`,
        method: "POST",
        body: { ...data },
      }),
    }),

    //ADMIN GET ALL ENQUIRIES OF USER
    getEnquiries: builder.query({
      query: () => ({
        url: `/api/enquiry`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Enquiries"],
    }),

    //ADMIN DELETE ENQUIRY AFTER INTERACTION DONE
    deleteEnquiry: builder.mutation({
      query: (enquiryId) => ({
        url: `/api/enquiry/${enquiryId}`,
        method: "DELETE",
      }),
    }),

    //ADMIN MARK ENQUIRY STATUS TO DONE
    updateEnquieryStatus: builder.mutation({
      query: (enquiryId) => ({
        url: `/api/enquiry/${enquiryId}/done`,
        method: "PUT",
      }),
    }),
  }),
});
export const {
  useSendEnquieryMutation,
  useGetEnquiriesQuery,
  useDeleteEnquiryMutation,
  useUpdateEnquieryStatusMutation,
} = enquieryApislice;
