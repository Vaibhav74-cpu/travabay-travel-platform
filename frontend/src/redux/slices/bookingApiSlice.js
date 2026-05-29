import { BOOKING_URL } from "@/constant";
import { apiSlice } from "./apiSlice";

export const bookingApislice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //USER CREATE BOOKING
    createBooking: builder.mutation({
      query: (data) => ({
        url: `/api/booking`,
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["Booking"],
    }),

    //ADMIN GET ALL BOOKINGS OF USER
    getBookings: builder.query({
      query: () => ({
        url: `/api/booking`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Booking"],
    }),

    // ADMIN GET BOOKING DETAILS
    getBookingDetails: builder.query({
      query: (bookingId) => ({
        url: `/api/booking/${bookingId}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: (result, error, bookingId) => [
        { type: "Booking", id: bookingId },
      ],
    }),

    //ADMIN DELETE BOOKING
    deleteBooking: builder.mutation({
      query: (bookingId) => ({
        url: `/api/booking/${bookingId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Booking"],
    }),

    //ADMIN MARK BOOKING STATUS [CONFIRMED , CANCEL]
    updatBookingStatus: builder.mutation({
      query: ({ bookingId, status }) => ({
        url: `/api/booking/${bookingId}/status`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: (result, error, { bookingId }) => [
        "Booking",
        { type: "Booking", id: bookingId },
      ],
    }),
  }),
});
export const {
  useCreateBookingMutation,
  useGetBookingDetailsQuery,
  useGetBookingsQuery,
  useDeleteBookingMutation,
  useUpdatBookingStatusMutation,
} = bookingApislice;

// keepUnusedDataFor-> keep data for 5 seconds after page leave
// invalidatesTags-> check thr product in lack is outdated or not
// provideTags -> this lack contains this type of data
