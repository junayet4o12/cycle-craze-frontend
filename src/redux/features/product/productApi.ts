import { IProduct, TResponseRedux } from "@/types";
import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        products: builder.query({
            query: () => ({
                url: '/products',
                method: 'GET'
            }),
            providesTags: ['Products'],
            transformResponse: (response: TResponseRedux<IProduct[]>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                }
            },
        }),
        createProduct: builder.mutation({
            query: (product) => ({
                url: '/products',
                method: 'POST',
                body: product
            }),
            invalidatesTags: ['Products'],
        }),
    })
})

export const { useCreateProductMutation, useProductsQuery } = productApi;