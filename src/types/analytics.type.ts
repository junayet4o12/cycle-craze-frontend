export type SalesData = {
    currentTotal: number;
    lastMonthTotal: number;
    percentageChange: number;
    salesOverTime: {
        totalRevenue: number;
        month: string;
    }[];
    topProducts: {
        totalQuantitySold: number;
        totalRevenue: number;
        productId: string;
        name: string;
    }[];
};