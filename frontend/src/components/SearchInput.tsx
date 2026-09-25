// Ant Design input component used for the search box
import { Input } from 'antd';

// React hooks used for storing the search value
// and running the debounce logic
import { useEffect, useState } from 'react';

// Search icon displayed inside the input
import { SearchOutlined } from '@ant-design/icons';


// Defines the props that the SearchInput component receives
interface SearchInputProps {
  // Allows this component to update the query state
  // in the parent management page
  setQuery: React.Dispatch<
    React.SetStateAction<{
      page: number;
      limit: number;
      search: string;
    }>
  >;

  // Optional placeholder text displayed inside the search box
  placeholder?: string;
}


// Reusable search input component
const SearchInput = ({
  setQuery,
  placeholder = 'Search…',
}: SearchInputProps) => {

  // Stores what the user is currently typing into the search box
  const [searchTerm, setSearchTerm] = useState('');


  // Runs whenever searchTerm changes
  useEffect(() => {

    // Wait 500 milliseconds before updating the query
    // This prevents an API request from being made after every keystroke
    const debounceId = setTimeout(() => {

      // Keep the existing query values such as page and limit,
      // but replace the search value with the latest search term
      setQuery((prev) => ({
        ...prev,
        search: searchTerm,
      }));

    }, 500);


    // Cleanup function
    // If the user types again before 500ms has passed,
    // cancel the previous timeout and start a new one
    return () => {
      clearTimeout(debounceId);
    };

  }, [searchTerm]);


  // Structure/UI of the search component
  return (
    <div>

      {/* Search input */}
      <Input
        // Makes the Ant Design input larger
        size='large'

        // Prevents the search box from becoming too narrow
        style={{ minWidth: '300px' }}

        // Text displayed when the input is empty
        placeholder={placeholder}

        // Update searchTerm whenever the user types
        onChange={(e) => setSearchTerm(e.target.value)}

        // Display the search icon at the beginning of the input
        prefix={<SearchOutlined />}
      />

    </div>
  );
};


// Export the component so it can be reused
// by the purchase, sale and seller management pages
export default SearchInput;