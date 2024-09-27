import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const pizzaApi = createApi({
    reducerPath: 'pizzaApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9009/api/pizza/' }),
    tagTypes: ["Orders"],
    endpoints: builder => ({
        getPizza: builder.query({
            query: () => 'history',
            providesTags: ["Orders"],
        }),
        createPizza: builder.mutation({
            query: (body) => ({
                url: 'order',
                method: 'POST',
                body,
            }),
            invalidatesTags: ["Orders"],
        }),
    }),
})
export const {
    useGetPizzaQuery, useCreatePizzaMutation,
} = pizzaApi