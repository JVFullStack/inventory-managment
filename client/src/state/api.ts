import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type Product = {
  productId: string;
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
};

export type NewProduct = {
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
};

export type SalesSummary = {
  salesSummaryId: string;
  totalValue: number;
  changePercentage?: number;
  date: Date;
};

export type PurchaseSummary = {
  changePercentage?: number;
  date: Date;
  purchaseSummaryId: string;
  totalPurchased: number;
};

export type ExpenseSummary = {
  date: Date;
  expenseSummaryId: string;
  totalExpenses: number;
};

export type ExpenseByCategorySummary = {
  amount: string;
  date: string;
  expenseSummaryId: string;
  expenseByCategoryId: string;
  category: string;
};

export type DashboardMetrics = {
  popularProducts: Product[];
  salesSummary: SalesSummary[];
  purchaseSummary: PurchaseSummary[];
  expenseSummary: ExpenseSummary[];
  expenseByCategorySummary: ExpenseByCategorySummary[];
};

export type User = {
  userId: string;
  name: string;
  email: string;
};

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE }),
  reducerPath: "api",
  tagTypes: ["DashboardMetrics", "Products", "Users", "Expenses"],
  endpoints: (build) => ({
    getDashboardMetrics: build.query<DashboardMetrics, void>({
      query: () => "/dashboard",
      providesTags: ["DashboardMetrics"],
    }),
    getProducts: build.query<Product[], string | void>({
      query: (search) => ({
        url: "/products",
        params: search ? { search } : {},
      }),
      providesTags: ["Products"],
    }),
    createProduct: build.mutation<Product, NewProduct>({
      query: (newProduct) => ({
        url: "/products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),
    getUsers: build.query<User[], void>({
      query: () => "/users",
      providesTags: ["Users"],
    }),
    getExpensesByCategory: build.query<ExpenseByCategorySummary[], void>({
      query: () => "/expenses",
      providesTags: ["Expenses"],
    }),
  }),
});

export const {
  useGetDashboardMetricsQuery,
  useGetProductsQuery,
  useCreateProductMutation,
  useGetUsersQuery,
  useGetExpensesByCategoryQuery,
} = api;
