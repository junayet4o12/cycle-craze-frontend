import { IProduct, TQueryParams, TResponseRedux } from "@/types";
import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /products
    products: builder.query({
      query: (args: TQueryParams[] | undefined) => {
        const params = new URLSearchParams();


        if (args) {
          args.forEach((item) => {
            params.append(item.name as string, item.value as string);
          })
        }
        return {
          url: "/products",
          method: "GET",
          params: params
        }
      },
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
      query: ({ productId, args }: { productId: string; args?: TQueryParams[] | undefined; }) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name as string, item.value as string);
          })
        }
        return {
          url: `/products/${productId}`,
          method: "GET",
          params: params
        }
      },
      providesTags: ["Products"],
      transformResponse: (response: TResponseRedux<IProduct>) => {

        return {
          data: response.data,
        };
      },
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
