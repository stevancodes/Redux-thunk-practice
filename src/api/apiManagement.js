import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://637638f081a568fc25f90df1.mockapi.io/Posts";

export const apiManagement = createApi({
  reducerPath: "apiManagement",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", `aplication/json`);
    },
  }),
  endpoints: (builder) => ({
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),
    savePost: builder.mutation({
      query: (body) => ({
        method: "POST",
        body: body,
      }),
    }),
    getPosts: builder.mutation({
      query: () => ({
        method: "GET",
      }),
    }),
  }),
});

export const { useDeletePostMutation, useGetPostsMutation, useSavePostMutation } = apiManagement;
