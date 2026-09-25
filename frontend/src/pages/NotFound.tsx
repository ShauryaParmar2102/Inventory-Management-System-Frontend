// Ant Design components used for the layout and button
import { Button, Flex } from 'antd';

// React Router hook used to navigate between pages
import { useNavigate } from 'react-router-dom';


const NotFound = () => {
  // Gives us the navigate function for changing pages
  const navigate = useNavigate();


  // Runs when the user clicks the Go Back button
  const handleClick = () => {
    // -1 tells React Router to go back one page
    // in the browser's history
    navigate(-1);
  };


  return (
    // Center the 404 message vertically and horizontally
    // and make the container fill the screen
    <Flex
      justify='center'
      align='center'
      style={{ height: '100vh' }}
    >
      {/* Container holding the error message and button */}
      <Flex
        vertical
        gap={10}
        align='center'
        style={{
          border: '1px solid #000',
          padding: '3rem',
          borderRadius: '.8rem',
        }}
      >
        {/* 404 error heading */}
        <h1>404! Not Found...</h1>

        {/* Explain that the requested page could not be found */}
        <h3>Your requested page does not exists...!!!</h3>

        {/* Go back to the previous page */}
        <Button
          type='primary'
          onClick={handleClick}
        >
          Go Back
        </Button>
      </Flex>
    </Flex>
  );
};


// Export the page so it can be used in the application's router
export default NotFound;