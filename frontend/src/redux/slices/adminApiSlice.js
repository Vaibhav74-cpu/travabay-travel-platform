import { ADMIN_URL } from "../../constant";
import { apiSlice } from "./apiSlice";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `/api/admin/login`,
        method: "POST",
        body: data,
        // credentials: "include",
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `/api/admin/logout`,
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = adminApiSlice;
