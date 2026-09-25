// Import the main RTK Query API configuration
// Purchase endpoints will be added to this existing API
import { baseApi } from '../baseApi';

// Type that describes a purchase
import type { IPurchase } from '../../../types/purchase.types';


// Defines the values that can be sent when requesting purchases
// These are used for pagination and searching
type PurchaseQuery = {
  page?: number;
  limit?: number;
  search?: string;
};


// Defines the response returned when getting all purchases
type GetPurchasesResponse = {
  statusCode: number;
  message: string;

  // Array containing all of the purchases returned by the backend
  data: IPurchase[];

  // Pagination information returned by the backend
  meta: {
    total: number;
    page?: number;
    limit?: number;
  };
};


// Defines the data that can be sent when creating a purchase
type CreatePurchasePayload = Record<string, unknown>;


// Defines the response returned after creating a purchase
type CreatePurchaseResponse = {
  statusCode: number;
  message: string;
  data?: IPurchase;
};


// Defines the response returned after deleting a purchase
type DeletePurchaseResponse = {
  statusCode: number;
  message: string;
};


// Add purchase-related endpoints to baseApi
const purchaseApi = baseApi.injectEndpoints({
  // builder is used to create queries and mutations
  endpoints: (builder) => ({

    // ================= GET ALL PURCHASES =================

    // Fetch the list of purchases from the backend
    getAllPurchases: builder.query<
      GetPurchasesResponse,
      PurchaseQuery
    >({
      // query contains things such as pagination or search parameters
      query: (query) => ({
        // Purchase endpoint on the backend
        url: '/purchases',

        // GET because we are retrieving purchase data
        method: 'GET',

        // Send query values as URL parameters
        // For example: ?page=1&limit=10&search=...
        params: query,
      }),

      // Store this query under the "purchases" cache tag
      providesTags: ['purchases'],
    }),


    // ================= CREATE PURCHASE =================

    // Create a new purchase
    createPurchase: builder.mutation<
      CreatePurchaseResponse,
      CreatePurchasePayload
    >({
      // payload contains the purchase information
      query: (payload) => ({
        // Send the request to the purchases endpoint
        url: '/purchases',

        // POST because we are creating a new purchase
        method: 'POST',

        // Send the purchase information to the backend
        body: payload,
      }),

      // The purchase data has changed,
      // so invalidate the existing purchases cache
      invalidatesTags: ['purchases'],
    }),


    // ================= DELETE PURCHASE =================

    // Delete a specific purchase using its ID
    deletePurchase: builder.mutation<
      DeletePurchaseResponse,
      string
    >({
      // id identifies the purchase that should be deleted
      query: (id) => ({
        // Example:
        // /purchases/12345
        url: '/purchases/' + id,

        // DELETE removes the purchase
        method: 'DELETE',
      }),

      // Purchase data has changed,
      // so refresh queries using the purchases tag
      invalidatesTags: ['purchases'],
    }),
  }),
});


// RTK Query automatically generates React hooks
// based on the endpoints above
export const {
  // GET /purchases
  useGetAllPurchasesQuery,

  // POST /purchases
  useCreatePurchaseMutation,

  // DELETE /purchases/:id
  useDeletePurchaseMutation,
} = purchaseApi;