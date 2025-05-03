export type TRevenueData = {
  total: number;
  lastMonthTotal: number;
  percentageChange: number;
};

export type TOverYearData = {
  totalRevenue: number;
  totalOrders: number;
  month: string; // e.g., "2025-04"
};

export type TOrdersData = {
  total: number;
  lastMonthTotal: number;
  percentageChange: number;
  overYearData: TOverYearData[];
};

export type TUsersData = {
  total: number;
  lastMonthTotal: number;
  percentageChange: number;
};

// ✅ Updated final analytics type
export type SalesData = {
  revenueData: TRevenueData;
  ordersData: TOrdersData;
  usersData: TUsersData;
};