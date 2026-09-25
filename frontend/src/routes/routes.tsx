// createBrowserRouter creates the routing system for the React application
import { createBrowserRouter } from 'react-router-dom';

// ProtectRoute prevents users from accessing protected pages
// unless they are authenticated/logged in
import ProtectRoute from '../components/layout/ProtectRoute';

// Sidebar is the main layout used around the protected pages
import Sidebar from '../components/layout/Sidebar';

// Import the pages that can be displayed by the router
import CreateProduct from '../pages/CreateProduct';
import Dashboard from '../pages/Dashboard';
import NotFound from '../pages/NotFound';
import ProfilePage from '../pages/ProfilePage';
import SaleHistoryPage from '../pages/SaleHistoryPage';

// Authentication pages
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';

// Management pages
import ProductManagePage from '../pages/managements/ProductManagePage';
import PurchaseManagementPage from '../pages/managements/PurchaseManagementPage';
import SaleManagementPage from '../pages/managements/SaleManagementPage';
import SellerManagementPage from '../pages/managements/SellerManagementPage';

// Profile/account pages
import ChangePasswordPage from '../pages/ChangePasswordPage';
import EditProfilePage from '../pages/EditProfilePage';


// ================= MAIN ROUTER =================

// Create all of the frontend routes for the application
export const router = createBrowserRouter([

  // ================= SIDEBAR LAYOUT =================

  // The "/" route uses Sidebar as its main layout
  {
    path: '/',
    element: <Sidebar />,

    // These pages are displayed inside the Sidebar layout
    // using React Router's <Outlet />
    children: [

      // ================= DASHBOARD =================

      // Main dashboard
      // URL: /
      {
        path: '/',
        element: (
          // ProtectRoute makes sure the user is logged in
          <ProtectRoute>
            <Dashboard />
          </ProtectRoute>
        ),
      },


      // ================= CREATE PRODUCT =================

      // Page used to create a new product
      // URL: /create-product
      {
        path: 'create-product',
        element: (
          <ProtectRoute>
            <CreateProduct />
          </ProtectRoute>
        ),
      },


      // ================= PROFILE =================

      // Display the logged-in user's profile
      // URL: /profile
      {
        path: 'profile',
        element: (
          <ProtectRoute>
            <ProfilePage />
          </ProtectRoute>
        ),
      },


      // ================= PRODUCT MANAGEMENT =================

      // Manage products
      // URL: /products
      {
        path: 'products',
        element: (
          <ProtectRoute>
            <ProductManagePage />
          </ProtectRoute>
        ),
      },


      // ================= SALE MANAGEMENT =================

      // Manage sales
      // URL: /sales
      {
        path: 'sales',
        element: (
          <ProtectRoute>
            <SaleManagementPage />
          </ProtectRoute>
        ),
      },


      // ================= SELLER MANAGEMENT =================

      // Manage sellers/suppliers
      // URL: /sellers
      {
        path: 'sellers',
        element: (
          <ProtectRoute>
            <SellerManagementPage />
          </ProtectRoute>
        ),
      },


      // ================= PURCHASE MANAGEMENT =================

      // Manage purchases
      // URL: /purchases
      {
        path: 'purchases',
        element: (
          <ProtectRoute>
            <PurchaseManagementPage />
          </ProtectRoute>
        ),
      },


      // ================= SALE HISTORY =================

      // Display daily, weekly, monthly and yearly sale history
      // URL: /sales-history
      {
        path: 'sales-history',
        element: (
          <ProtectRoute>
            <SaleHistoryPage />
          </ProtectRoute>
        ),
      },


      // ================= EDIT PROFILE =================

      // Allows the logged-in user to edit their profile
      // URL: /edit-profile
      {
        path: 'edit-profile',
        element: (
          <ProtectRoute>
            <EditProfilePage />
          </ProtectRoute>
        ),
      },


      // ================= CHANGE PASSWORD =================

      // Allows the logged-in user to change their password
      // URL: /change-password
      {
        path: 'change-password',
        element: (
          <ProtectRoute>
            <ChangePasswordPage />
          </ProtectRoute>
        ),
      },
    ],
  },


  // ================= PUBLIC AUTH ROUTES =================

  // Login page
  // This is outside ProtectRoute because users need
  // to access it before they are logged in
  {
    path: '/login',
    element: <LoginPage />,
  },

  // Registration page
  // Also public so a new user can create an account
  {
    path: '/register',
    element: <RegisterPage />,
  },


  // ================= NOT FOUND =================

  // "*" catches any URL that does not match one of the routes above
  //
  // Example:
  // /something-that-does-not-exist
  //
  // This will display the NotFound page
  {
    path: '*',
    element: <NotFound />,
  },
]);