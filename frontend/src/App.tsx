// RouterProvider displays the pages configured in our React Router
import { RouterProvider } from 'react-router-dom';

// Import the application's routes
import { router } from './routes/routes';

// ConfigProvider allows us to configure Ant Design components globally
import { ConfigProvider } from 'antd';


// Main application component
const App = () => {
  return (
    <>
      {/* Apply global Ant Design theme settings */}
      <ConfigProvider
        theme={{
          token: {
            // Set Nunito as the font used by Ant Design components
            fontFamily: 'Nunito',
          },
        }}
      >
        {/* Load the application's routing system */}
        <RouterProvider router={router} />
      </ConfigProvider>
    </>
  );
};


// Export App so it can be rendered from main.tsx
export default App;