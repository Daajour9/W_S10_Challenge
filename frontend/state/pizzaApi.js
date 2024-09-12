import{createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const pizzaApi = createApi({
    reducerPath: 'pizzaApi',
    baseQuery: fetchBaseQuery({baseUrl:'http://localhost:9009/api/pizza/'}),
    endpoints: builder =>({
        getPizza: builder.query({
    query: ()=>   'history'

        }),
        createPizza: builder.mutation({
            query: pizza => ({
                url:`http://localhost:9009/api/pizza/order`,
                method:'Post',
                body: {pizza},
            }),

        }),
    }),
})
export const {
useGetPizzaQuery, useCreatePizzaMutation, 
} = pizzaApi