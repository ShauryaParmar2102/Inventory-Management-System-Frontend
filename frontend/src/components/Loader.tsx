// Ant Design components used to centre and display the loading spinner
import { Flex, Spin } from 'antd';

// Reusable loading component
const Loader = () => {
  return (
    // Centre the loading spinner on the page
    <Flex
      justify='center'
      align='center'
      style={{
        minHeight: '50vh',
      }}
    >
      {/* Display a large loading spinner */}
      <Spin size='large' />
    </Flex>
  );
};

// Export Loader so it can be used on other pages
export default Loader;