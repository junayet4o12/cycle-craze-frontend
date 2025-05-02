import { baseApi } from "@/redux/api/baseApi";
import { SalesData, TResponseRedux } from "@/types";

const analyticsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        totalRevenue: builder.query({
            query: () => ({
                url: "/analytics/revenue",
                method: "GET",
            }),
            transformResponse: (response: TResponseRedux<SalesData>) => ({
                data: response.data,
            }),
        }),
    }),

})

export const { useTotalRevenueQuery } = analyticsApi