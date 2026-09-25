// Import jwtDecode to read the information stored inside a JWT token
import { jwtDecode } from 'jwt-decode';

// Import the TypeScript type that describes the logged-in user
import type { TUser } from '../redux/services/authSlice';


// Decode a JWT token and return its user information
const decodeToken = (token: string): TUser => {

  // Convert the encoded JWT into a TUser object
  return jwtDecode(token);
};


// Export the function so it can be used during authentication
export default decodeToken;