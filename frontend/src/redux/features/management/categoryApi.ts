// Import the main RTK Query API configuration
import { baseApi } from '../baseApi';


// Describes a single category
type Category = {
  _id: string;
  name: string;
};


// Describes the response returned when getting all categories
type GetCategoriesResponse = {
  statusCode: number;
  message: string;
  data: Category[];
};


// Describes the data needed to create a category
type CreateCategoryPayload = {
  name: string;
};


// Describes the response returned after creating a category
type CreateCategoryResponse = {
  statusCode: number;
  message: string;
  data?: Category;
};


// Add the category endpoints to the existing baseApi
const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // ================= GET ALL CATEGORIES =================

    // Get all categories from the backend
    getAllCategories: builder.query<GetCategoriesResponse, void>({
      query: () => ({
        // Backend category endpoint
        url: '/categories',

        // GET because we are retrieving data
        method: 'GET',
      }),

      // Store the returned data under the category cache tag
      providesTags: ['category'],
    }),


    // ================= CREATE CATEGORY =================

    // Create a new category
    createCategory: builder.mutation<
      CreateCategoryResponse,
      CreateCategoryPayload
    >({
      // payload contains the new category information
      query: (payload) => ({
        // Backend category endpoint
        url: '/categories',

        // POST because we are creating data
        method: 'POST',

        // Send the category information to the backend
        body: payload,
      }),

      // Refresh category data after creating a category
      invalidatesTags: ['category'],
    }),
  }),
});


// RTK Query automatically generates React hooks
// from the endpoints above
export const {
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
} = categoryApi;