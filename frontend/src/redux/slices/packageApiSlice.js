import { PACKAGE_URL } from "@/constant";
import { apiSlice } from "./apiSlice";

export const packagesApislice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //ADMIN CREATE NEW PACKAGE
    createPackage: builder.mutation({
      query: (formData) => ({
        url: `/api/packages/add`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Package"],
    }),

    //PUBLIC - USER AND ADMIN GET ALL PACKAGES
    getPackages: builder.query({
      query: ({ keyword } = {}) => ({
        url: `/api/packages`,
        params: {
          // pageNumber,
          keyword,
        },
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Package"],
    }),

    //PUBLIC - USER GET PACKAGES MY CITIES
    getPackagesByCity: builder.query({
      query: (city) => ({
        url: `/api/packages/city/${city}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Package"],
    }),

    //PUBLIC -  USER AND ADMIN  GET PACKAGE DETAILS
    getPackageById: builder.query({
      query: (packageId) => ({
        url: `/api/packages/${packageId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    //ADMIN UPDATE PACKAGE DETAILS
    updatePackage: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/api/packages/${id}`,
        method: "PUT",
        body: formData,
      }),

      invalidatesTags: ["Package"],
    }),

    //ADMIN DELETE PACKAGE
    deletePackage: builder.mutation({
      query: (packageId) => ({
        url: `/api/packages/${packageId}`,
        method: "DELETE",
      }),
    }),
  }),
});
export const {
  useGetPackageByIdQuery,
  useGetPackagesQuery,
  useCreatePackageMutation,
  useUpdatePackageMutation,
  useDeletePackageMutation,
  useGetPackagesByCityQuery,
} = packagesApislice;

// keepUnusedDataFor-> keep data for 5 seconds after page leave
// invalidatesTags-> check thr product in lack is outdated or not
// provideTags -> this lack contains this type of data
