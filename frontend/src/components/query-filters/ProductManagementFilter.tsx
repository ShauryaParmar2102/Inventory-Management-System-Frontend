import {Col, Flex, Row, Slider} from 'antd';
import React from 'react';
import {useGetAllCategoriesQuery} from '../../redux/features/management/categoryApi';
import {useGetAllBrandsQuery} from '../../redux/features/management/brandApi';

// Define the props that the filter component receives
interface ProductManagementFilterProps {
    query: {name: string; category: string; brand: string; limit: number};   // Store the current product filter values

    // Function used to update the filter values
    setQuery: React.Dispatch<
    React.SetStateAction<{name: string; category: string; brand: string; limit: number}>
    >;
}

// Component used to filter the product list
const ProductManagementFilter = ({query, setQuery}: ProductManagementFilterProps) => {
    const {data: categories} = useGetAllCategoriesQuery(undefined);  // Get all categories from the backend
    const {data: brands} = useGetAllBrandsQuery(undefined); // Get all brands from the backend


    // Structure/UI for the product filters
     return (
    <Flex
      style={{
        border: '1px solid grey',
        padding: '1rem',
        marginBottom: '.5rem',
        borderRadius: '1rem',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.4) inset',
      }}
    >

        {/* Responsive row containing all product filters */}
      <Row gutter={2} style={{width: '100%'}}>

         {/* Price range filter */}
        <Col xs={{span: 24}} md={{span: 8}}>
          <label style={{fontWeight: 700}}>Price Range</label>
          <Slider
            range // Allow the user to select a minimum and maximum price
            step={100} // Move the slider in steps of 100
            max={20000}  // Set the maximum slider value
            defaultValue={[1000, 5000]} // Set the starting price range

            // Update the minimum and maximum prices
            onChange={(value) => {
              setQuery((prev) => ({
                ...prev,
                minPrice: value[0],
                maxPrice: value[1],
              }));
            }}
          />
        </Col>

             {/* Product name search */}
        <Col xs={{span: 24}} md={{span: 8}}>
          <label style={{fontWeight: 700}}>Search by product name</label>
          <input
            type='text'
            value={query.name} // Display the current product name search
            className={`input-field`}
            placeholder='Search by Product Name'

            // Update the product name filter
            onChange={(e) => setQuery((prev) => ({...prev, name: e.target.value}))}
          />
        </Col>

        {/* Category filter */}
        <Col xs={{span: 24}} md={{span: 4}}>
          <label style={{fontWeight: 700}}>Filter by Category</label>
          <select
            name='category'
            className={`input-field`}

             // Set the current category
            defaultValue={query.category} 

            // Update the selected category
            onChange={(e) => setQuery((prev) => ({...prev, category: e.target.value}))}

             // Update the category when the field loses focus
            onBlur={(e) => setQuery((prev) => ({...prev, category: e.target.value}))}
          >
            <option value=''>Filter by Category</option>

             {/* Create an option for each category */}
            {categories?.data?.map((category: {_id: string; name: string}) => (
              <option value={category._id} key={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </Col>

        {/* Brand filter */}
        <Col xs={{span: 24}} md={{span: 4}}>
          <label style={{fontWeight: 700}}>Filter by Brand</label>
          <select
            name='Brand'
            className={`input-field`}
            defaultValue={query.brand} // Set the current brand
            onChange={(e) => setQuery((prev) => ({...prev, brand: e.target.value}))} // Update the selected brand
            onBlur={(e) => setQuery((prev) => ({...prev, brand: e.target.value}))} // Update the brand when the field loses focus
          >
            <option value=''>Filter by Brand</option>

            {/* Create an option for each brand */}
            {brands?.data?.map((brand: {_id: string; name: string}) => (
              <option value={brand._id} key={brand._id}>
                {brand.name}
              </option>
            ))}
          </select>
        </Col>
      </Row>
    </Flex>
  );
}

// Export the component so it can be used elsewhere
export default ProductManagementFilter;