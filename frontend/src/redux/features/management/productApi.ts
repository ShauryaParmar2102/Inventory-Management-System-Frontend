// Import the main RTK Query API configuration
// All product endpoints will be added to this API
import { baseApi } from '../baseApi';


// Inject all product-related endpoints into baseApi
const productApi = baseApi.injectEndpoints({
  // builder lets us create queries and mutations
  endpoints: (builder) => ({

    // ================= GET ALL PRODUCTS =================

    // Fetch a list of products from the backend
    getAllProducts: builder.query({
      // query contains filters/search/pagination information
      query: (query) => ({
        url: '/products',

        // GET because we are retrieving products
        method: 'GET',

        // Send query values as URL parameters
        // Example: ?page=1&limit=10&search=phone
        params: query,
      }),

      // Mark this cached data with the "product" tag
      providesTags: ['product'],
    }),


    // ================= COUNT / TOTAL PRODUCTS =================

    // Fetch total product/stock information
    // This is used by the Dashboard
    countProducts: builder.query({
      query: (query: any) => ({
        url: '/products/total',
        method: 'GET',

        // Send any provided query parameters
        params: query,
      }),

      // Associate this data with the product cache
      providesTags: ['product'],
    }),


    // ================= GET SINGLE PRODUCT =================

    // Fetch one specific product using its ID
    getSingleProduct: builder.query({
      // id identifies which product we want
      query: (id: any) => ({
        // Example:
        // /products/12345
        url: `/products/${id}`,

        method: 'GET',
      }),

      providesTags: ['product'],
    }),


    // ================= CREATE PRODUCT =================

    // Create a completely new product
    createNewProduct: builder.mutation({
      // payload contains the new product information
      query: (payload:any) => ({
        url: '/products',

        // POST because we are creating new data
        method: 'POST',

        // Send the product information to the backend
        body: payload,
      }),

      // Product data has changed, so invalidate the cached products
      // This allows product queries to fetch fresh data
      invalidatesTags: ['product'],
    }),


    // ================= ADD STOCK =================

    // Add more stock to an existing product
    addStock: builder.mutation({
      // Receive both the product ID and the stock information
      query: ({ id, payload }) => ({
        // Example:
        // /products/12345/add
        url: `/products/${id}/add`,

        // PATCH because we are modifying an existing product
        method: 'PATCH',

        // Send the new stock information
        body: payload,
      }),

      // Product stock changed, so refresh product data
      invalidatesTags: ['product'],
    }),


    // ================= DELETE PRODUCT =================

    // Delete one product using its ID
    deleteProduct: builder.mutation({
      query: (id: any) => ({
        // Send the product ID as part of the URL
        url: `/products/${id}`,

        // DELETE removes the product
        method: 'DELETE',
      }),

      // Refresh cached product data after deletion
      invalidatesTags: ['product'],
    }),


    // ================= UPDATE PRODUCT =================

    // Update information belonging to an existing product
    updateProduct: builder.mutation({
      // Receive the product ID and the new product information
      query: ({ id, payload }) => ({
        // Identify which product should be updated
        url: `/products/${id}`,

        // PATCH updates part of an existing product
        method: 'PATCH',

        // Send the updated information
        body: payload,
      }),

      // Product information changed, so invalidate the cache
      invalidatesTags: ['product'],
    }),


    // ================= BULK DELETE =================

    // Delete multiple products in one request
    bulkDelete: builder.mutation({
      // payload contains the information needed
      // to identify the products being deleted
      query: (payload: any) => ({
        url: '/products/bulk-delete',

        // This backend endpoint uses POST for the bulk-delete operation
        method: 'POST',

        // Send the selected product information/IDs
        body: payload,
      }),

      // Multiple products may have changed,
      // so refresh the product cache
      invalidatesTags: ['product'],
    }),
  }),
});


// RTK Query automatically generates React hooks
// from all the endpoints defined above
export const {
  // GET /products
  useGetAllProductsQuery,

  // GET /products/total
  useCountProductsQuery,

  // POST /products
  useCreateNewProductMutation,

  // PATCH /products/:id/add
  useAddStockMutation,

  // DELETE /products/:id
  useDeleteProductMutation,

  // GET /products/:id
  useGetSingleProductQuery,

  // PATCH /products/:id
  useUpdateProductMutation,

  // POST /products/bulk-delete
  useBulkDeleteMutation,
} = productApi;