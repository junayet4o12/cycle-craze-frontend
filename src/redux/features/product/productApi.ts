import { IProduct, TResponseRedux } from "@/types";
import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /products
    products: builder.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
      providesTags: ["Products"],
      transformResponse: (response: TResponseRedux<IProduct[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    // GET /products/:productId
    product: builder.query({
      query: (productId: string) => ({
        url: `/products/${productId}`,
        method: "GET",
      }),
      providesTags: (_result, _error, productId) => [{ type: "Products", id: productId }],
    }),

    // POST /products
    createProduct: builder.mutation({
      query: (product) => ({
        url: "/products",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Products"],
    }),

    // PATCH /products/:productId
    updateProduct: builder.mutation({
      query: ({ productId, updatedData }) => ({
        url: `/products/${productId}`,
        method: "PATCH",
        body: updatedData,
      }),
      invalidatesTags: (_result, _error, { productId }) => [
        "Products",
        { type: "Products", id: productId },
      ],
    }),

    // DELETE /products/:productId
    deleteProduct: builder.mutation({
      query: (productId: string) => ({
        url: `/products/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useProductsQuery,
  useProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
