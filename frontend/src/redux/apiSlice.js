import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
    // headers: { "Content-type": "Application/json"},
  }),
  endpoints: (builder) => ({
    getAll: builder.query({
      query: () => "get",
      providesTags: ['create', 'update', 'delete', 'count', 'weight']
    }),

    createPackage: builder.mutation({
      query: (newPackage) => ({
        url: "package",
        method: "POST",
        body: newPackage,
      }),
      invalidatesTags: ['create'],
    }),

    updatePackage: builder.mutation({
      query: (newPackage) => ({
        url: `package/${newPackage.id}`,
        method: "PUT",
        body: newPackage,
      }),
      invalidatesTags: ['update']
    }),

    deletePackage: builder.mutation({
      query: (id) => ({
        url: `package/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['delete']
    }),

    countPackage: builder.mutation({
      query: (newCount) => ({
        url: `package/count/${newCount.id}`,
        method: 'PUT',
        body: newCount
      }),
      invalidatesTags: ['count']
    }),

    weightPackage: builder.mutation({
      query: (newWeight) => ({
        url: `package/weight/${newWeight.id}`,
        method: 'PUT',
        body: newWeight
      }),
      invalidatesTags: ['weight']
    })
  }),
});

export const {
  useGetAllQuery,
  useCreatePackageMutation,
  useDeletePackageMutation,
  useUpdatePackageMutation,
  useCountPackageMutation,
  useWeightPackageMutation
} = api;
export default api;
