import { baseApi } from '../baseApi';

// Describes a single brand
type Brand = {
  _id: string;
  name: string;
};

// Describes the data needed when creating a brand
type BrandPayload = {
  name: string;
};

// Describes the response returned when getting all brands
type GetBrandsResponse = {
  statusCode: number;
  message: string;
  data: Brand[];
};

// Describes the response returned after creating a brand
type BrandResponse = {
  statusCode: number;
  message: string;
  data?: Brand;
};

const brandApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // Get all brands
    getAllBrands: builder.query<GetBrandsResponse, void>({
      query: () => ({
        url: '/brands',
        method: 'GET',
      }),
      providesTags: ['brand'],
    }),

    // Create a new brand
    createBrand: builder.mutation<BrandResponse, BrandPayload>({
      query: (payload) => ({
        url: '/brands',
        method: 'POST',
        body: payload,
      }),

      // Refresh the brand list after creating a brand
      invalidatesTags: ['brand'],
    }),
  }),
});

// Export the automatically generated RTK Query hooks
export const {
  useGetAllBrandsQuery,
  useCreateBrandMutation,
} = brandApi;