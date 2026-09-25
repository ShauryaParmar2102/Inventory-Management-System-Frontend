// Import the RTK Query functions used to create the main API
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Import TypeScript-only RTK Query types
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

// Import the frontend environment configuration
import { config } from '../../utils/config';

// Import the logout action
import { logoutUser } from '../services/authSlice';

// Import the Redux store state type
import type { RootState } from '../store';


// Create the basic query used for all API requests
const baseQuery = fetchBaseQuery({

  // Backend API address from the .env configuration
  baseUrl: config.baseUrl,

  // Prepare the request headers before sending the request
  prepareHeaders: (headers, { getState }) => {

    // Get the JWT token from the Redux authentication state
    const token = (getState() as RootState).auth.token;

    // If the user is logged in, attach the JWT to the request
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    // Return the prepared headers
    return headers;
  },
});


// Custom base query that wraps around the normal fetchBaseQuery
const customBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {

  // Send the request to the backend
  const result = await baseQuery(args, api, extraOptions);

  // If the backend returns 401 Unauthorized,
  // send the user back to the login page
  if (result.error?.status === 401) {

    // Redirect to login
    window.location.href = '/login';

    // Clear the user's authentication data from Redux
    api.dispatch(logoutUser());
  }

  // Return the API result
  return result;
};


// Create the main RTK Query API
export const baseApi = createApi({

  // Name used for this API inside the Redux store
  reducerPath: 'baseApi',

  // Use our custom query function for API requests
  baseQuery: customBaseQuery,

  // Cache tags used by the different API files
  tagTypes: [
    'product',
    'sale',
    'user',
    'category',
    'brand',
    'seller',
    'purchases',
  ],

  // Individual endpoints are added by files such as
  // authApi, productApi, saleApi, sellerApi, etc.
  endpoints: () => ({}),
});