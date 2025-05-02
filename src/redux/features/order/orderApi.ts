import { baseApi } from "../../api/baseApi";
import { IOrder, TQueryParams, TResponseRedux } from "@/types";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    orders: builder.query({
      query: (args: TQueryParams[] | undefined) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name as string, item.value as string);
          });
        }
        return {
          url: "/orders",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Orders"],
      transformResponse: (response: TResponseRedux<IOrder[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),
    myOrders: builder.query({
      query: (args: TQueryParams[] | undefined) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name as string, item.value as string);
          });
        }
        return {
          url: "/orders/my-orders",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Orders"],
      transformResponse: (response: TResponseRedux<IOrder[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),

    order: builder.query({
      query: (orderId: string) => ({
        url: `/orders/${orderId}`,
        method: "GET",
      }),
      providesTags: (_result, _error, orderId) => [{ type: "Orders", id: orderId }],
      transformResponse: (response: TResponseRedux<IOrder>) => ({
        data: response.data,
      }),
    }),
    orderByTranId: builder.query({
      query: (tranId: string) => ({
        url: `/orders/success/${tranId}`,
        method: "GET",
      }),
      providesTags: (_result, _error, orderId) => [{ type: "Orders", id: orderId }],
      transformResponse: (response: TResponseRedux<IOrder>) => ({
        data: response.data,
      }),
    }),

    checkout: builder.mutation({
      query: (orderData) => ({
        url: "/orders/checkout",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["Orders"],
    }),

    updateOrder: builder.mutation({
      query: ({ orderId, updatedData }) => ({
        url: `/orders/${orderId}`,
        method: "PATCH",
        body: updatedData,
      }),
      invalidatesTags: (_result, _error, { orderId }) => [
        "Orders",
        { type: "Orders", id: orderId },
      ],
    }),

    updateOrderStatus: builder.mutation({
      query: ({ orderId, status }) => ({
        url: `/orders/status/${orderId}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (_result, _error, { orderId }) => [
        "Orders",
        { type: "Orders", id: orderId },
      ],
    }),

    deleteOrder: builder.mutation({
      query: (orderId: string) => ({
        url: `/orders/${orderId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useOrdersQuery,
  useMyOrdersQuery,
  useOrderQuery,
  useUpdateOrderMutation,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
  useCheckoutMutation,
  useOrderByTranIdQuery
} = orderApi;
