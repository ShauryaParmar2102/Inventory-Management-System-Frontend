// Icon used for the delete button
import { DeleteFilled } from '@ant-design/icons';

// Types used for the pagination and table
import type { PaginationProps, TableColumnsType } from 'antd';

// Ant Design UI components
import { Button, Flex, Modal, Pagination, Table } from 'antd';

// React hook for storing/changing component state
import { useState } from 'react';

// API hooks used to get and delete purchases
import {
  useDeletePurchaseMutation,
  useGetAllPurchasesQuery,
} from '../../redux/features/management/purchaseApi';

// Type that describes a purchase
import type { IPurchase } from '../../types/purchase.types';

// Utility function used to format dates
import formatDate from '../../utils/formatDate';

// Reusable function for displaying success/error messages
import toastMessage from '../../lib/toastMessage';

// Reusable search input component
import SearchInput from '../../components/SearchInput';


const PurchaseManagementPage = () => {
  // Stores the current pagination and search settings
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
    search: '',
  });

  // Gets purchases from the API using the current query settings
  // isFetching is true while purchase data is being loaded
  const { data, isFetching } = useGetAllPurchasesQuery(query);

  // Runs when the user changes pages
  const onChange: PaginationProps['onChange'] = (page) => {
    // Keep the existing query values but update the page number
    setQuery((prev) => ({ ...prev, page: page }));
  };

  // Converts the purchase data returned by the API
  // into the format needed by the Ant Design table
  const tableData = data?.data?.map((purchase: IPurchase) => ({
    // Unique key used by the table
    key: purchase._id,

    // Information displayed in each table column
    sellerName: purchase.sellerName,
    productName: purchase.productName,
    price: purchase.unitPrice,
    quantity: purchase.quantity,
    totalPrice: purchase.totalPrice,

    // Calculates how much money is still owed
    due: purchase.totalPrice - purchase.paid,

    // Converts the stored date into a readable format
    date: formatDate(purchase.createdAt),
  }));


  // Defines the columns displayed in the purchase table
  const columns: TableColumnsType<any> = [
    {
      title: 'Seller Name',
      key: 'sellerName',
      dataIndex: 'sellerName',
    },
    {
      title: 'Product Name',
      key: 'productName',
      dataIndex: 'productName',
    },
    {
      title: 'Price(per unit)',
      key: 'price',
      dataIndex: 'price',
      align: 'center',
    },
    {
      title: 'Quantity',
      key: 'quantity',
      dataIndex: 'quantity',
      align: 'center',
    },
    {
      title: 'Total Price',
      key: 'totalPrice',
      dataIndex: 'totalPrice',
      align: 'center',
    },
    {
      title: 'Due',
      key: 'due',
      dataIndex: 'due',
      align: 'center',
    },
    {
      title: 'Date',
      key: 'date',
      dataIndex: 'date',
      align: 'center',
    },

    // Action column contains buttons for each purchase
    {
      title: 'Action',
      key: 'x',
      align: 'center',

      // item represents the current row in the table
      render: (item) => {
        return (
          <div style={{ display: 'flex' }}>
            {/* Pass the purchase ID to the delete modal */}
            <DeleteModal id={item.key} />
          </div>
        );
      },

      // Keeps the action column small
      width: '1%',
    },
  ];


  return (
    <>
      {/* Search area above the table */}
      <Flex justify='end' style={{ margin: '5px' }}>
        <SearchInput
          // Allows SearchInput to change the query
          setQuery={setQuery}
          placeholder='Search Purchase...'
        />
      </Flex>

      {/* Displays all purchase records */}
      <Table
        size='small'

        // Displays the table loading state while fetching
        loading={isFetching}

        // Defines which columns the table has
        columns={columns}

        // Provides the purchase records to the table
        dataSource={tableData}

        // Disable Ant Design's built-in table pagination
        // because we are using our own Pagination below
        pagination={false}
      />

      {/* Centers the pagination underneath the table */}
      <Flex justify='center' style={{ marginTop: '1rem' }}>
        <Pagination
          // Current page number
          current={query.page}

          // Run onChange when the user selects another page
          onChange={onChange}

          // Number of purchases displayed per page
          defaultPageSize={query.limit}

          // Total number of purchases from the API
          total={data?.meta?.total}
        />
      </Flex>
    </>
  );
};


/**
 * Delete Modal
 *
 * Displays a confirmation window before deleting a purchase.
 */
const DeleteModal = ({ id }: { id: string }) => {
  // Controls whether the delete modal is open or closed
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Gives us the mutation function used to delete a purchase
  const [deletePurchase] = useDeletePurchaseMutation();


  // Deletes a purchase using its ID
  const handleDelete = async (id: string) => {
    try {
      // Send the purchase ID to the delete API endpoint
      // unwrap() gives us the actual response or throws an error
      const res = await deletePurchase(id).unwrap();

      // Check whether the deletion was successful
      if (res.statusCode === 200) {
        // Display a success message
        toastMessage({
          icon: 'success',
          text: res.message,
        });

        // Close the modal
        handleCancel();
      }
    } catch (error: any) {
      // Close the modal if something goes wrong
      handleCancel();

      // Display the error returned by the API
      toastMessage({
        icon: 'error',
        text: error.data.message,
      });
    }
  };


  // Opens the delete confirmation modal
  const showModal = () => {
    setIsModalOpen(true);
  };


  // Closes the delete confirmation modal
  const handleCancel = () => {
    setIsModalOpen(false);
  };


  return (
    <>
      {/* Delete button displayed in the table's Action column */}
      <Button
        onClick={showModal}
        type='primary'
        className='table-btn-small'
        style={{ backgroundColor: 'red' }}
      >
        <DeleteFilled />
      </Button>

      {/* Confirmation modal */}
      <Modal
        title='Delete Product'

        // Determines whether the modal is visible
        open={isModalOpen}

        // Close the modal if the user cancels
        onCancel={handleCancel}

        // Removes Ant Design's default modal footer
        footer={null}
      >
        <div
          style={{
            textAlign: 'center',
            padding: '2rem',
          }}
        >
          {/* Warning before deletion */}
          <h2>Are you want to delete this product?</h2>
          <h4>You won't be able to revert it.</h4>

          {/* Confirmation buttons */}
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              marginTop: '1rem',
            }}
          >
            {/* Close the modal without deleting */}
            <Button
              onClick={handleCancel}
              type='primary'
              style={{
                backgroundColor: 'lightseagreen',
              }}
            >
              Cancel
            </Button>

            {/* Delete the purchase */}
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


// Export the page so it can be used by the router/App
export default PurchaseManagementPage;