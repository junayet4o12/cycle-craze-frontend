import { baseApi } from "@/redux/api/baseApi";
import { Last12MonthsAnalyticsData, ProductSalesList, SalesData, TResponseRedux } from "@/types";

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

        // 2. Get Last 12 Months Analytics Data Endpoint
        getLast12MonthsAnalyticsData: builder.query({
            query: () => ({
                url: "/analytics/over-year-analytics",
                method: "GET",
            }),
            transformResponse: (response: TResponseRedux<Last12MonthsAnalyticsData>) => ({
                data: response.data,
            }),
        }),

        // 3. Get Top 10 Products Endpoint
        getTopSellingProducts: builder.query({
            query: (args: { name: string, value: string } | undefined) => {
                const params = new URLSearchParams();
                if (args) {
                    params.append(args.name as string, args.value as string);
                }
                return {
                    url: "/analytics/top-selling-products",
                    method: "GET",
                    params: params
                }
            },
            transformResponse: (response: TResponseRedux<ProductSalesList>) => ({
                data: response.data,
            }),
        }),
    }),
});

export const {
    useAnalyzeOrdersQuery,
    useGetLast12MonthsAnalyticsDataQuery,
    useGetTopSellingProductsQuery
} = analyticsApi;
