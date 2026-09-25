// Import the main RTK Query API configuration
import { baseApi } from './baseApi';

// Add authentication and user-related endpoints to the base API
const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // Login to an existing user account
    login: builder.mutation({
      query: (payload) => ({
        url: '/users/login',
        method: 'POST',
        body: payload,
      }),

      // Refresh related cached data after login
      invalidatesTags: ['product', 'sale', 'user'],
    }),

    // Register a new user account
    register: builder.mutation({
      query: (payload) => ({
        url: '/users/register',
        method: 'POST',
        body: payload,
      }),

      // Refresh related cached data after registration
      invalidatesTags: ['product', 'sale', 'user'],
    }),

    // Get the currently logged-in user's profile
    getSelfProfile: builder.query({
      query: () => ({
        url: '/users/self',
        method: 'GET',
      }),

      // Mark the returned data as user-related cached data
      providesTags: ['user'],
    }),

    // Change the logged-in user's password
    changePassword: builder.mutation({
      query: (payload) => ({
        url: '/users/change-password',
        method: 'POST',
        body: payload,
      }),

      // Refresh cached user data after changing the password
      invalidatesTags: ['user'],
    }),

    // Update the logged-in user's profile information
    updateProfile: builder.mutation({
      query: (payload) => ({
        url: '/users',
        method: 'PATCH',
        body: payload,
      }),

      // Refresh cached user data after updating the profile
      invalidatesTags: ['user'],
    }),
  }),
});

// Export automatically generated React hooks for each endpoint
export const {
  useLoginMutation,
  useRegisterMutation,
  useGetSelfProfileQuery,
  useChangePasswordMutation,
  useUpdateProfileMutation,
} = authApi;