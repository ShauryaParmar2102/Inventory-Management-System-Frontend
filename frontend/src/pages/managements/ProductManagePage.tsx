// Import icons used for product actions
import { DeleteFilled, EditFilled } from '@ant-design/icons';

// Import Ant Design types
import type { PaginationProps, TableColumnsType } from 'antd';

// Import Ant Design UI components
import {
  Button,
  Col,
  Flex,
  Modal,
  Pagination,
  Row,
  Table,
  Tag,
} from 'antd';

// React state
import { useState } from 'react';

// React Hook Form
import { useForm } from 'react-hook-form';
import type { FieldValues } from 'react-hook-form';

// Product API hooks
import {
  useAddStockMutation,
  useDeleteProductMutation,
  useGetAllProductsQuery,
  useUpdateProductMutation,
} from '../../redux/features/management/productApi';

// Product types
import type { ICategory, IProduct } from '../../types/product.types';

// Product filtering component
import ProductManagementFilter from '../../components/query-filters/ProductManagementFilter';

// Reusable input component
import CustomInput from '../../components/CustomInput';

// Toast notification helper
import toastMessage from '../../lib/toastMessage';

// Category API
import { useGetAllCategoriesQuery } from '../../redux/features/management/categoryApi';

// Seller API
import { useGetAllSellerQuery } from '../../redux/features/management/sellerApi';

// Brand API
import { useGetAllBrandsQuery } from '../../redux/features/management/brandApi';

// Sale API
import { useCreateSaleMutation } from '../../redux/features/management/saleApi';

// Loading spinner
import { SpinnerIcon } from '@phosphor-icons/react';

/**
 * Main Product Management Page
 *
 * Displays products in a table and provides controls
 * for filtering, selling, adding stock, updating and deleting.
 */
const ProductManagePage = () => {
  // Store the currently selected pagination page
  const [current, setCurrent] = useState(1);

  // Store the filters used when requesting products
  const [query, setQuery] = useState({
    name: '',
    category: '',
    brand: '',
    limit: 10,
  });

  // Fetch products from the API using the current filters
  const { data: products, isFetching } =
    useGetAllProductsQuery(query);

  // Update the selected pagination page
  const onChange: PaginationProps['onChange'] = (page) => {
    setCurrent(page);
  };

  // Convert API product data into rows that Ant Design Table can use
  const tableData = products?.data?.map((product: IProduct) => ({
    // Ant Design uses key to identify each table row
    key: product._id,

    name: product.name,

    // Keep the full category object for other operations
    category: product.category,

    // Display the category name in the table
    categoryName: product.category.name,

    price: product.price,
    stock: product.stock,

    // Keep seller information for stock/update operations
    seller: product?.seller,

    // Display fallback text if the seller no longer exists
    sellerName: product?.seller?.name || 'DELETED SELLER',

    brand: product.brand,
    size: product.size,
    description: product.description,
  }));

  // Define the columns displayed in the product table
  const columns: TableColumnsType<any> = [
    {
      title: 'Product Name',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: 'Category',
      key: 'categoryName',
      dataIndex: 'categoryName',
      align: 'center',
    },
    {
      title: 'price',
      key: 'price',
      dataIndex: 'price',
      align: 'center',
    },
    {
      title: 'stock',
      key: 'stock',
      dataIndex: 'stock',
      align: 'center',
    },
    {
      title: 'Purchase From',
      key: 'sellerName',
      dataIndex: 'sellerName',
      align: 'center',

      // Display seller status using a coloured tag
      render: (sellerName: string) => {
        // Red tag means the original seller was deleted
        if (sellerName === 'DELETED SELLER') {
          return <Tag color='red'>{sellerName}</Tag>;
        }

        // Existing sellers are displayed in green
        return <Tag color='green'>{sellerName}</Tag>;
      },
    },
    {
      title: 'Action',
      key: 'x',
      align: 'center',

      // Display the available actions for each product
      render: (item) => {
        return (
          <div style={{ display: 'flex' }}>
            {/* Sell this product */}
            <SellProductModal product={item} />

            {/* Add more stock */}
            <AddStockModal product={item} />

            {/* Edit product information */}
            <UpdateProductModal product={item} />

            {/* Delete the product */}
            <DeleteProductModal id={item.key} />
          </div>
        );
      },

      width: 300,
    },
  ];

  return (
    <>
      {/* Controls used to filter the product list */}
      <ProductManagementFilter
        query={query}
        setQuery={setQuery}
      />

      {/* Display the products returned by the API */}
          <Table
        size='small'
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        pagination={false}
        scroll={{ x: 'max-content' }}
      />

      {/* Pagination controls */}
      <Flex justify='center' style={{ marginTop: '1rem' }}>
        <Pagination
          current={current}
          onChange={onChange}
          defaultPageSize={query.limit}
          total={products?.meta?.total}
        />
      </Flex>
    </>
  );
};

/**
 * Sell Product Modal
 *
 * Opens a form where a sale can be created for a product.
 */
const SellProductModal = ({
  product,
}: {
  product: IProduct & { key: string };
}) => {
  // Control whether the modal is visible
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Set up the sale form
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  // Mutation used to create a new sale
  const [saleProduct, { isLoading }] =
    useCreateSaleMutation();

  // Handle the sale form submission
  const onSubmit = async (data: FieldValues) => {
    // Build the sale object expected by the backend
    const payload = {
      // ID of the product being sold
      product: product.key,

      // Store product information with the sale
      productName: product.name,
      productPrice: product.price,

      // Convert the form quantity from a string to a number
      quantity: Number(data.quantity),

      // Customer information
      buyerName: data.buyerName,

      // Date of the sale
      date: data.date,
    };

    try {
      // Send the sale to the API
      const res = await saleProduct(payload).unwrap();

      // 201 means the sale was successfully created
      if (res.statusCode === 201) {
        // Show success message
        toastMessage({
          icon: 'success',
          text: res.message,
        });

        // Clear the form
        reset();

        // Close the modal
        handleCancel();
      }
    } catch (error: any) {
      // Close the modal if the request fails
      handleCancel();

      // Display the API error
      toastMessage({
        icon: 'error',
        text: error.data.message,
      });
    }
  };

  // Open the sell modal
  const showModal = () => {
    setIsModalOpen(true);
  };

  // Close the sell modal
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Open the sell product modal */}
      <Button
        onClick={showModal}
        type='primary'
        className='table-btn'
        style={{ backgroundColor: 'royalblue' }}
      >
        Sell
      </Button>

      {/* Sale form modal */}
      <Modal
        title='Sell Product'
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        {/* Submit the sale through React Hook Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ marginTop: '1rem' }}
        >
          {/* Customer name */}
          <CustomInput
            name='buyerName'
            label='Buyer Name'
            errors={errors}
            required={true}
            register={register}
            type='text'
          />

          {/* Date the product was sold */}
          <CustomInput
            name='date'
            label='Selling date'
            errors={errors}
            required={true}
            register={register}
            type='date'
          />

          {/* Number of products being sold */}
          <CustomInput
            name='quantity'
            label='Quantity'
            errors={errors}
            required={true}
            register={register}
            type='number'
          />

          {/* Submit sale */}
          <Flex
            justify='center'
            style={{ marginTop: '1rem' }}
          >
            <Button
              htmlType='submit'
              type='primary'
              disabled={isLoading}
            >
              {/* Display spinner while the API request is running */}
              {isLoading && (
                <SpinnerIcon
                  className='spin'
                  weight='bold'
                />
              )}

              Sell Product
            </Button>
          </Flex>
        </form>
      </Modal>
    </>
  );
};

/**
 * Add Stock Modal
 *
 * Allows more units to be added to an existing product.
 */
const AddStockModal = ({
  product,
}: {
  product: IProduct & { key: string };
}) => {
  // Control whether the add stock modal is open
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Set up the stock form
  const {
    handleSubmit,
    register,
    reset,
  } = useForm();

  // Mutation used to add stock through the API
  const [addToStock, { isLoading }] =
    useAddStockMutation();

  // Handle stock form submission
  const onSubmit = async (data: FieldValues) => {
    // Build the stock update payload
    const payload = {
      // Convert the input value to a number
      stock: Number(data.stock),

      // Keep the seller associated with the product
      seller: product.seller,
    };

    try {
      // Send the product ID and stock data to the API
      const res = await addToStock({
        id: product.key,
        payload,
      }).unwrap();

      // Check if stock was successfully updated
      if (res.statusCode === 200) {
        // Display success message
        toastMessage({
          icon: 'success',
          text: res.message,
        });

        // Clear the form
        reset();

        // Close the modal
        handleCancel();
      }
    } catch (error: any) {
      // Close the modal if the request fails
      handleCancel();

      // Display the API error
      toastMessage({
        icon: 'error',
        text: error.data.message,
      });
    }
  };

  // Open the add stock modal
  const showModal = () => {
    setIsModalOpen(true);
  };

  // Close the add stock modal
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Open the add stock modal */}
      <Button
        onClick={showModal}
        type='primary'
        className='table-btn'
        style={{ backgroundColor: 'blue' }}
      >
        Add Stock
      </Button>

      {/* Add stock form */}
      <Modal
        title='Add Product to Stock'
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ margin: '2rem' }}
        >
          {/* Number of units to add */}
          <CustomInput
            name='stock'
            label='Add Stock'
            register={register}
            type='number'
          />

          {/* Submit stock update */}
          <Flex
            justify='center'
            style={{ marginTop: '1rem' }}
          >
            <Button
              htmlType='submit'
              type='primary'
              disabled={isLoading}
            >
              {/* Show spinner while stock is being updated */}
              {isLoading && (
                <SpinnerIcon
                  className='spin'
                  weight='bold'
                />
              )}

              Submit
            </Button>
          </Flex>
        </form>
      </Modal>
    </>
  );
};

/**
 * Update Product Modal
 *
 * Displays the existing product information and allows
 * the user to change it.
 */
const UpdateProductModal = ({
  product,
}: {
  product: IProduct & { key: string };
}) => {
  // Mutation used to update a product
  const [updateProduct] = useUpdateProductMutation();

  // Load categories for the category dropdown
  const { data: categories } =
    useGetAllCategoriesQuery(undefined);

  // Load sellers for the seller dropdown
  const {
    data: sellers,
    isLoading: isSellerLoading,
  } = useGetAllSellerQuery(undefined);

  // Load brands for the brand dropdown
  const { data: brands } =
    useGetAllBrandsQuery(undefined);

  // Set up the update form
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    // Pre-fill the form with the existing product information
    defaultValues: {
      name: product.name,
      price: product.price,
      seller: product?.seller?._id,
      category: product.category._id,
      brand: product.brand?._id,
      description: product.description,
      size: product.size,
    },
  });

  // Control whether the update modal is visible
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle the update form submission
  const onSubmit = async (data: FieldValues) => {
    try {
      // Send the product ID and updated values to the API
      const res = await updateProduct({
        id: product.key,
        payload: data,
      }).unwrap();

      // Check if the update was successful
      if (res.statusCode === 200) {
        // Display success message
        toastMessage({
          icon: 'success',
          text: res.message,
        });

        // Reset the form
        reset();

        // Close the modal
        handleCancel();
      }
    } catch (error: any) {
      // Close modal if update fails
      handleCancel();

      // Display API error
      toastMessage({
        icon: 'error',
        text: error.data.message,
      });
    }
  };

  // Open the update modal
  const showModal = () => {
    setIsModalOpen(true);
  };

  // Close the update modal
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Open the update product modal */}
      <Button
        onClick={showModal}
        type='primary'
        className='table-btn-small'
        style={{ backgroundColor: 'green' }}
      >
        <EditFilled />
      </Button>

      {/* Product update form */}
      <Modal
        title='Update Product Info'
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
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

          {/* Seller selection */}
          <Row>
            <Col xs={{ span: 23 }} lg={{ span: 6 }}>
              <label
                htmlFor='Size'
                className='label'
              >
                Seller
              </label>
            </Col>

            <Col xs={{ span: 23 }} lg={{ span: 18 }}>
              <select
                // Prevent selection while sellers are loading
                disabled={isSellerLoading}

                // Connect seller field to React Hook Form
                {...register('seller', {
                  required: true,
                })}

                className={`input-field ${
                  errors['seller']
                    ? 'input-field-error'
                    : ''
                }`}
              >
                <option value=''>
                  Select Seller*
                </option>

                {/* Create an option for every seller */}
                {sellers?.data.map(
                  (item: ICategory) => (
                    <option
                      value={item._id}
                      key={item._id}
                    >
                      {item.name}
                    </option>
                  )
                )}
              </select>
            </Col>
          </Row>

          {/* Category selection */}
          <Row>
            <Col xs={{ span: 23 }} lg={{ span: 6 }}>
              <label
                htmlFor='Size'
                className='label'
              >
                Category
              </label>
            </Col>

            <Col xs={{ span: 23 }} lg={{ span: 18 }}>
              <select
                // Connect category to React Hook Form
                {...register('category', {
                  required: true,
                })}

                className={`input-field ${
                  errors['category']
                    ? 'input-field-error'
                    : ''
                }`}
              >
                <option value=''>
                  Select Category*
                </option>

                {/* Create an option for every category */}
                {categories?.data.map(
                  (item: ICategory) => (
                    <option
                      value={item._id}
                      key={item._id}
                    >
                      {item.name}
                    </option>
                  )
                )}
              </select>
            </Col>
          </Row>

          {/* Brand selection */}
          <Row>
            <Col xs={{ span: 23 }} lg={{ span: 6 }}>
              <label
                htmlFor='Size'
                className='label'
              >
                Brand
              </label>
            </Col>

            <Col xs={{ span: 23 }} lg={{ span: 18 }}>
              <select
                // Brand is optional
                {...register('brand')}

                className={`input-field ${
                  errors['brand']
                    ? 'input-field-error'
                    : ''
                }`}
              >
                <option value=''>
                  Select brand
                </option>

                {/* Create an option for every brand */}
                {brands?.data.map(
                  (item: ICategory) => (
                    <option
                      value={item._id}
                      key={item._id}
                    >
                      {item.name}
                    </option>
                  )
                )}
              </select>
            </Col>
          </Row>

          {/* Product description */}
          <CustomInput
            label='Description'
            name='description'
            register={register}
          />

          {/* Product size */}
          <Row>
            <Col xs={{ span: 23 }} lg={{ span: 6 }}>
              <label
                htmlFor='Size'
                className='label'
              >
                Size
              </label>
            </Col>

            <Col xs={{ span: 23 }} lg={{ span: 18 }}>
              {/* Connect size selection to the form */}
              <select
                className='input-field'
                {...register('size')}
              >
                <option value=''>
                  Select Product Size
                </option>

                <option value='SMALL'>
                  Small
                </option>

                <option value='MEDIUM'>
                  Medium
                </option>

                <option value='LARGE'>
                  Large
                </option>
              </select>
            </Col>
          </Row>

          {/* Submit the product update */}
          <Flex justify='center'>
            <Button
              htmlType='submit'
              type='primary'
              style={{
                textTransform: 'uppercase',
                fontWeight: 'bold',
              }}
            >
              Update
            </Button>
          </Flex>
        </form>
      </Modal>
    </>
  );
};

/**
 * Delete Product Modal
 *
 * Asks the user for confirmation before permanently
 * deleting a product.
 */
const DeleteProductModal = ({
  id,
}: {
  id: string;
}) => {
  // Control whether the confirmation modal is open
  const [isModalOpen, setIsModalOpen] =
    useState(false);

  // Mutation used to delete the product
  const [deleteProduct] =
    useDeleteProductMutation();

  // Open the confirmation modal
  const showModal = () => {
    setIsModalOpen(true);
  };

  // Close the confirmation modal
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Delete the selected product
  const handleDelete = async (id: string) => {
    try {
      // Send the product ID to the delete API
      const res = await deleteProduct(id).unwrap();

      // Check if deletion was successful
      if (res.statusCode === 200) {
        // Display success message
        toastMessage({
          icon: 'success',
          text: res.message,
        });

        // Close confirmation modal
        handleCancel();
      }
    } catch (error: any) {
      // Close modal if deletion fails
      handleCancel();

      // Display API error
      toastMessage({
        icon: 'error',
        text: error.data.message,
      });
    }
  };

  return (
    <>
      {/* Open the delete confirmation modal */}
      <Button
        onClick={showModal}
        type='primary'
        className='table-btn-small'
        style={{ backgroundColor: 'red' }}
      >
        <DeleteFilled />
      </Button>

      {/* Delete confirmation dialog */}
      <Modal
        title='Delete Product'
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <div
          style={{
            textAlign: 'center',
            padding: '2rem',
          }}
        >
          {/* Warn the user before deleting */}
          <h2>
            Are you want to delete this product?
          </h2>

          <h4>
            You won't be able to revert it.
          </h4>

          {/* Confirmation buttons */}
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              marginTop: '1rem',
            }}
          >
            {/* Cancel deletion */}
            <Button
              onClick={handleCancel}
              type='primary'
              style={{
                backgroundColor: 'lightseagreen',
              }}
            >
              Cancel
            </Button>

            {/* Confirm deletion */}
            <Button
              onClick={() => handleDelete(id)}
              type='primary'
              style={{
                backgroundColor: 'red',
              }}
            >
              Yes! Delete
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

// Export the product management page
export default ProductManagePage;