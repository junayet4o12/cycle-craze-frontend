import { baseApi } from "@/redux/api/baseApi";
import { SalesData, TResponseRedux } from "@/types";

const analyticsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // 1. Analyze Orders Endpoint
        analyzeOrders: builder.query({
            query: () => ({
                url: "/analytics/analyze-orders",
                method: "GET",
            }),
            transformResponse: (response: TResponseRedux<SalesData>) => ({
                data: response.data,
            }),
        }),

        // 2. Get Last 12 Month Users Data Endpoint
        getLast12MonthUsersData: builder.query({
            query: () => ({
                url: "/analytics/over-year-users",
                method: "GET",
            }),
            transformResponse: (response: TResponseRedux<SalesData>) => ({
                data: response.data,
            }),
        }),

        // 3. Get Top 10 Products Endpoint
        getTopTenProducts: builder.query({
            query: () => ({
                url: "/analytics/top-ten-products",
                method: "GET",
            }),
            transformResponse: (response: TResponseRedux<SalesData>) => ({
                data: response.data,
            }),
        }),
    }),
});

export const {
    useAnalyzeOrdersQuery,
    useGetLast12MonthUsersDataQuery,
    useGetTopTenProductsQuery
} = analyticsApi;
