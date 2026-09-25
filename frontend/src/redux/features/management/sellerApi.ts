// Import the main RTK Query API configuration
import { baseApi } from '../baseApi';

// Import the seller type
import type { ISeller } from '../../../types/product.types';


// Describes the query parameters that can be sent
// when requesting sellers
type SellerQuery = {
  page?: number;
  limit?: number;
  search?: string;
};


// Describes the response returned when getting sellers
type GetSellersResponse = {
  statusCode: number;
  message: string;

  // Array containing all sellers returned by the API
  data: ISeller[];

  // Pagination information
  meta: {
    total: number;
    page?: number;
    limit?: number;
  };
};


// Describes the information needed to create a seller
type CreateSellerPayload = {
  name: string;
  email: string;
  contactNo: string;
};


// Describes the response returned after creating a seller
type CreateSellerResponse = {
  statusCode: number;
  message: string;
  data?: ISeller;
};


// Describes the response returned after deleting a seller
type DeleteSellerResponse = {
  statusCode: number;
  message: string;
};


// Add seller-related endpoints to the existing baseApi
const sellerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // ================= GET ALL SELLERS =================

    // Fetch all sellers from the backend
    getAllSeller: builder.query<GetSellersResponse, SellerQuery | void>({
      query: (query) => ({
        // Backend seller endpoint
        url: '/sellers',

        // GET because we are retrieving seller data
        method: 'GET',

        // Send pagination/search values as URL parameters
        params: query || {},
      }),

      // Store this data under the seller cache tag
      providesTags: ['seller'],
    }),


    // ================= CREATE SELLER =================

    // Create a new seller
    createSeller: builder.mutation<
      CreateSellerResponse,
      CreateSellerPayload
    >({
      // payload contains the new seller information
      query: (payload) => ({
        // Send request to the sellers endpoint
        url: '/sellers',

        // POST because we are creating a new seller
        method: 'POST',

        // Send the seller information to the backend
        body: payload,
      }),

      // Refresh seller data after creating a seller
      invalidatesTags: ['seller'],
    }),


    // ================= DELETE SELLER =================

    // Delete a seller using its ID
    deleteSeller: builder.mutation<DeleteSellerResponse, string>({
      // id identifies which seller should be deleted
      query: (id) => ({
        // Example: /sellers/12345
        url: '/sellers/' + id,

        // DELETE removes the seller
        method: 'DELETE',
      }),

      // Refresh seller data after deleting a seller
      invalidatesTags: ['seller'],
    }),
  }),
});


// RTK Query automatically generates React hooks
// for the endpoints created above
export const {
  // GET /sellers
  useGetAllSellerQuery,

  // POST /sellers
  useCreateSellerMutation,

  // DELETE /sellers/:id
  useDeleteSellerMutation,
} = sellerApi;