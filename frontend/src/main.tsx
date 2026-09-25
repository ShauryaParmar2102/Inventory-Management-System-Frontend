// Import React so we can use React features such as StrictMode
import React from 'react';

// Import ReactDOM so the React application can be rendered in the browser
import ReactDOM from 'react-dom/client';

// Provider gives the entire application access to the Redux store
import { Provider } from 'react-redux';

// PersistGate waits for saved Redux data to be restored before displaying the app
import { PersistGate } from 'redux-persist/integration/react';

// Import the main App component
import App from './App.tsx';

// Import the Redux store and persistor
import { persistor, store } from './redux/store.ts';

// Import the global CSS styles
import './index.css';

// Import Toaster for displaying toast notifications
import { Toaster } from 'sonner';


// Find the HTML element with the id "root" and render the React application inside it
ReactDOM.createRoot(document.getElementById('root')!).render(

  // StrictMode helps detect potential problems during development
  <React.StrictMode>

    {/* Give all components access to the Redux store */}
    <Provider store={store}>

      {/* Restore persisted Redux data, such as saved authentication state */}
      <PersistGate loading={null} persistor={persistor}>

        {/* Render the main application */}
        <App />

        {/* Global toast notification component */}
        <Toaster
          // Keep each notification visible for 2 seconds
          duration={2000}

          // Apply default styling to toast notifications
          toastOptions={{
            style: {
              background: 'rgba(22, 72, 99, 0.7)',
              color: '#fff',
              fontWeight: 900,
              padding: '1rem',
            },
          }}
        />

      </PersistGate>
    </Provider>
  </React.StrictMode>
);