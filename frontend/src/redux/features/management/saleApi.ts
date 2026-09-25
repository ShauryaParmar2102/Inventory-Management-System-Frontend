// Import the main RTK Query API configuration
import { baseApi } from '../baseApi';


// Add all sale-related endpoints to the existing baseApi
const saleApi = baseApi.injectEndpoints({
  // builder is used to create queries and mutations
  endpoints: (builder) => ({

    // ================= GET ALL SALES =================

    // Fetch the list of sales from the backend
    getAllSale: builder.query({
      // query can contain search, pagination, filters, etc.
      query: (query) => ({
        url: '/sales',

        // GET because we are retrieving sales
        method: 'GET',

        // Send the query values as URL parameters
        params: query,
      }),

      // Mark this cached data with the "sale" tag
      providesTags: ['sale'],
    }),


    // ================= CREATE SALE =================

    // Create a new sale
    createSale: builder.mutation({
      // payload contains the sale information
      query: (payload) => ({
        url: '/sales',

        // POST because we are creating a new sale
        method: 'POST',

        // Send the sale information to the backend
        body: payload,
      }),

      // Creating a sale changes both:
      // 1. Sales data
      // 2. Product data/stock
      //
      // Therefore both cache tags are invalidated
      invalidatesTags: ['sale', 'product'],
    }),


    // ================= DELETE SALE =================

    // Delete a particular sale using its ID
    deleteSale: builder.mutation({
      query: (id) => ({
        // Example: /sales/12345
        url: `/sales/${id}`,

        method: 'DELETE',
      }),

      // Refresh cached sales data after deletion
      invalidatesTags: ['sale'],
    }),


    // ================= UPDATE SALE =================

    // Update an existing sale
    updateSale: builder.mutation({
      // Receive both the sale ID and updated information
      query: ({ id, payload }) => ({
        // Identify the sale being updated
        url: `/sales/${id}`,

        // PATCH updates an existing record
        method: 'PATCH',

        // Send the updated information
        body: payload,
      }),

      // Refresh cached sales data after the update
      invalidatesTags: ['sale'],
    }),


    // ================= YEARLY SALES =================

    // Get sales grouped/reported by year
    yearlySale: builder.query({
      query: () => ({
        url: '/sales/years',
        method: 'GET',
      }),

      // Associate the report with the sales cache
      providesTags: ['sale'],
    }),


    // ================= MONTHLY SALES =================

    // Get sales grouped/reported by month
    monthlySale: builder.query({
      query: () => ({
        url: '/sales/months',
        method: 'GET',
      }),

      providesTags: ['sale'],
    }),


    // ================= WEEKLY SALES =================

    // Get sales grouped/reported by week
    weeklySale: builder.query({
      query: () => ({
        url: '/sales/weeks',
        method: 'GET',
      }),

      providesTags: ['sale'],
    }),


    // ================= DAILY SALES =================

    // Get sales grouped/reported by day
    dailySale: builder.query({
      query: () => ({
        url: '/sales/days',
        method: 'GET',
      }),

      providesTags: ['sale'],
    }),
  }),
});


// RTK Query automatically generates hooks for each endpoint
export const {
  // GET /sales
  useGetAllSaleQuery,

  // POST /sales
  useCreateSaleMutation,

  // DELETE /sales/:id
  useDeleteSaleMutation,

  // PATCH /sales/:id
  useUpdateSaleMutation,

  // GET /sales/years
  useYearlySaleQuery,

  // GET /sales/months
  useMonthlySaleQuery,

  // GET /sales/weeks
  useWeeklySaleQuery,

  // GET /sales/days
  useDailySaleQuery,
} = saleApi;