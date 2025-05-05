import { TQueryParams, TResponseRedux, ISubscribe } from "@/types";
import { baseApi } from "../../api/baseApi";

const subscribeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /subscribe
    subscribes: builder.query({
      query: (args: TQueryParams[] | undefined) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name as string, item.value as string);
          });
        }
        return {
          url: "/subscribes",
          method: "GET",
          params,
        };
      },
      providesTags: ["Subscribes"],
      transformResponse: (response: TResponseRedux<ISubscribe[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    // GET /subscribe/:email
    subscribe: builder.query({
      query: (email: string) => ({
        url: `/subscribes/${email}`,
        method: "GET",
      }),
      providesTags: ["Subscribes"],
      transformResponse: (response: TResponseRedux<ISubscribe>) => ({
        data: response.data,
      }),
    }),

    // POST /subscribe
    createSubscribe: builder.mutation({
      query: (data: { email: string }) => ({
        url: "/subscribes",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Subscribes"],
    }),

    // PATCH /subscribe/status/:email
    updateSubscribeStatus: builder.mutation({
      query: ({ email, status }: { email: string; status: boolean }) => ({
        url: `/subscribes/status/${email}`,
        method: "PATCH",
        body: { isBlock: status },
      }),
      invalidatesTags: ["Subscribes"],
    }),

    // DELETE /subscribe/:email
    deleteSubscribe: builder.mutation({
      query: (email: string) => ({
        url: `/subscribes/${email}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Subscribes"],
    }),
  }),
});

export const {
  useSubscribesQuery,
  useSubscribeQuery,
  useCreateSubscribeMutation,
  useUpdateSubscribeStatusMutation,
  useDeleteSubscribeMutation,
} = subscribeApi;
