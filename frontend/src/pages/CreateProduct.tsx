// Ant Design components used for buttons and responsive layout
import { Button, Col, Flex, Row } from 'antd';

import { useForm } from 'react-hook-form';
import type { FieldValues } from 'react-hook-form';

// Reusable input component
import CustomInput from '../components/CustomInput';

// Reusable SweetAlert message function
import toastMessage from '../lib/toastMessage';

// API hook used to get all available brands
import { useGetAllBrandsQuery } from '../redux/features/management/brandApi';

// API hook used to get all available categories
import { useGetAllCategoriesQuery } from '../redux/features/management/categoryApi';

// API mutation used to create a new product
import { useCreateNewProductMutation } from '../redux/features/management/productApi';

// API hook used to get all sellers
import { useGetAllSellerQuery } from '../redux/features/management/sellerApi';

// Type used for items displayed inside the dropdowns
import type { ICategory } from '../types/product.types';

// Components that allow sellers, categories, and brands to be created
import CreateSeller from '../components/product/CreateSeller';
import CreateCategory from '../components/product/CreateCategory';
import CreateBrand from '../components/product/CreateBrand';

// Loading spinner displayed while the product is being created
import { SpinnerIcon } from '@phosphor-icons/react';


const CreateProduct = () => {
  // Mutation function used to create a new product
  // isCreatingProduct tells us whether the request is currently running
  const [createNewProduct, { isLoading: isCreatingProduct }] =
    useCreateNewProductMutation();

  // Get categories from the API for the category dropdown
  const { data: categories } = useGetAllCategoriesQuery(undefined);

  // Get sellers from the API for the seller dropdown
  const { data: sellers } = useGetAllSellerQuery(undefined);

  // Get brands from the API for the brand dropdown
  const { data: brands } = useGetAllBrandsQuery(undefined);


  // Set up React Hook Form
  const {
    // Processes the form when it is submitted
    handleSubmit,

    // Connects each input to React Hook Form
    register,

    // Contains validation errors
    formState: { errors },

    // Used to clear/reset the form
    reset,
  } = useForm();


  // Runs when the product form is submitted
  const onSubmit = async (data: FieldValues) => {
    // Copy all of the form data into a payload object
    const payload = { ...data };

    // HTML number inputs still provide string values,
    // so convert price and stock into actual numbers
    payload.price = Number(data.price);
    payload.stock = Number(data.stock);

    // Size is optional.
    // If no size was selected, remove it from the payload.
    if (payload.size === '') {
      delete payload.size;
    }

    try {
      // Send the new product to the API
      // unwrap() returns the actual response or throws an error
      const res = await createNewProduct(payload).unwrap();

      // 201 means the product was successfully created
      if (res.statusCode === 201) {
        // Show a success message
        toastMessage({
          icon: 'success',
          text: res.message,
        });

        // Clear the form after successful creation
        reset();
      }
    } catch (error: any) {
      // Display the error returned by the API
      toastMessage({
        icon: 'error',
        text: error.data.message,
      });
    }
  };


  return (
    <>
      {/* Main responsive layout for the page */}
      <Row
        gutter={30}
        style={{
          // Fill most of the available screen height
          height: 'calc(100vh - 6rem)',

          // Allow scrolling if the content becomes too tall
          overflow: 'auto',
        }}
      >

        {/* Left side - Add Product form */}
        <Col
          xs={{ span: 24 }}
          lg={{ span: 14 }}
          style={{
            display: 'flex',
          }}
        >
          {/* Container around the product form */}
          <Flex
            vertical
            style={{
              width: '100%',
              padding: '1rem 2rem',
              border: '1px solid #164863',
              borderRadius: '.6rem',
            }}
          >
            {/* Page heading */}
            <h1
              style={{
                marginBottom: '.8rem',
                fontWeight: '900',
                textAlign: 'center',
                textTransform: 'uppercase',
              }}
            >
              Add New Product
            </h1>


            {/* handleSubmit validates the form before calling onSubmit */}
            <form onSubmit={handleSubmit(onSubmit)}>

              {/* Product name */}
              <CustomInput
                name='name'
                errors={errors}
                label='Name'
                register={register}
                required={true}
              />


              {/* Product price */}
              <CustomInput
                errors={errors}
                label='Price'
                type='number'
                name='price'
                register={register}
                required={true}
              />


              {/* Starting amount of product stock */}
              <CustomInput
                errors={errors}
                label='Stock'
                type='number'
                name='stock'
                register={register}
                required={true}
              />


              {/* Seller selection */}
              <Row>
                {/* Seller label */}
                <Col xs={{ span: 23 }} lg={{ span: 6 }}>
                  <label htmlFor='Size' className='label'>
                    Seller
                  </label>
                </Col>

                {/* Seller dropdown */}
                <Col xs={{ span: 23 }} lg={{ span: 18 }}>
                  <select
                    // Register seller as a required form field
                    {...register('seller', { required: true })}

                    // Add error styling when no seller has been selected
                    className={`input-field ${
                      errors['seller'] ? 'input-field-error' : ''
                    }`}
                  >
                    {/* Default empty option */}
                    <option value=''>Select Seller*</option>

                    {/* Create an option for every seller returned by the API */}
                    {sellers?.data.map((item: ICategory) => (
                      <option value={item._id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </Col>
              </Row>


              {/* Category selection */}
              <Row>
                {/* Category label */}
                <Col xs={{ span: 23 }} lg={{ span: 6 }}>
                  <label htmlFor='Size' className='label'>
                    Category
                  </label>
                </Col>

                {/* Category dropdown */}
                <Col xs={{ span: 23 }} lg={{ span: 18 }}>
                  <select
                    // Category must be selected
                    {...register('category', { required: true })}

                    // Add error styling when category validation fails
                    className={`input-field ${
                      errors['category'] ? 'input-field-error' : ''
                    }`}
                  >
                    <option value=''>Select Category*</option>

                    {/* Display categories returned from the API */}
                    {categories?.data.map((item: ICategory) => (
                      <option value={item._id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </Col>
              </Row>


              {/* Brand selection */}
              <Row>
                {/* Brand label */}
                <Col xs={{ span: 23 }} lg={{ span: 6 }}>
                  <label htmlFor='Size' className='label'>
                    Brand
                  </label>
                </Col>

                {/* Brand dropdown */}
                <Col xs={{ span: 23 }} lg={{ span: 18 }}>
                  <select
                    // Brand is registered but isn't required
                    {...register('brand')}

                    className={`input-field ${
                      errors['brand'] ? 'input-field-error' : ''
                    }`}
                  >
                    {/* User can leave the brand empty */}
                    <option value=''>Select brand</option>

                    {/* Display brands returned by the API */}
                    {brands?.data.map((item: ICategory) => (
                      <option value={item._id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </Col>
              </Row>


              {/* Optional product description */}
              <CustomInput
                label='Description'
                name='description'
                register={register}
              />


              {/* Product size selection */}
              <Row>
                {/* Size label */}
                <Col xs={{ span: 23 }} lg={{ span: 6 }}>
                  <label htmlFor='Size' className='label'>
                    Size
                  </label>
                </Col>

                {/* Size dropdown */}
                <Col xs={{ span: 23 }} lg={{ span: 18 }}>
                  <select
                    className='input-field'

                    // Connect the size field to React Hook Form
                    {...register('size')}
                  >
                    {/* Empty value means no size was selected */}
                    <option value=''>Select Product Size</option>

                    {/* Available product sizes */}
                    <option value='SMALL'>Small</option>
                    <option value='MEDIUM'>Medium</option>
                    <option value='LARGE'>Large</option>
                  </select>
                </Col>
              </Row>


              {/* Center the submit button */}
              <Flex justify='center'>
                <Button
                  // Submit the form
                  htmlType='submit'
                  type='primary'

                  // Prevent another submission while the API request is running
                  disabled={isCreatingProduct}

                  style={{
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                  }}
                >
                  {/* Show a spinner while the product is being created */}
                  {isCreatingProduct && (
                    <SpinnerIcon
                      className='spin'
                      weight='bold'
                    />
                  )}

                  Add Product
                </Button>
              </Flex>
            </form>
          </Flex>
        </Col>


        {/* Right side - quick forms for creating related data */}
        <Col
          xs={{ span: 24 }}
          lg={{ span: 10 }}
        >
          <Flex
            vertical
            style={{
              width: '100%',
              height: '100%',
              padding: '1rem 2rem',
              border: '1px solid #164863',
              borderRadius: '.6rem',
              justifyContent: 'space-around',
            }}
          >
            {/* Allows a new seller to be created */}
            <CreateSeller />

            {/* Allows a new category to be created */}
            <CreateCategory />

            {/* Allows a new brand to be created */}
            <CreateBrand />
          </Flex>
        </Col>
      </Row>
    </>
  );
};


// Export the page so it can be used by the application's router
export default CreateProduct;