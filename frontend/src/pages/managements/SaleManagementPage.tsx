// Icon used for the delete button
import { DeleteFilled } from '@ant-design/icons';

// Types used by the Ant Design pagination and table
import type { PaginationProps, TableColumnsType } from 'antd';

// Ant Design UI components
import { Button, Flex, Modal, Pagination, Table } from 'antd';

// React hook used to store component state
import { useState } from 'react';

// Reusable search input component
import SearchInput from '../../components/SearchInput';

// Reusable function for displaying success/error messages
import toastMessage from '../../lib/toastMessage';

// API hooks used to get and delete sales
import {
  useDeleteSaleMutation,
  useGetAllSaleQuery,
} from '../../redux/features/management/saleApi';

// Type that describes the sale data displayed in the table
import type { ITableSale } from '../../types/sale.type';

// Utility function used to make dates easier to read
import formatDate from '../../utils/formatDate';


const SaleManagementPage = () => {
  // Stores the current page, number of results per page,
  // and the current search value
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
    search: '',
  });

  // Gets the sales from the API using the current query
  // isFetching is true while the data is loading
  const { data, isFetching } = useGetAllSaleQuery(query);


  // Runs when the user changes the pagination page
  const onChange: PaginationProps['onChange'] = (page) => {
    // Keep the existing query values and only change the page
    setQuery((prev) => ({ ...prev, page: page }));
  };


  // Converts the sales returned from the API
  // into data that can be displayed in the table
  const tableData = data?.data?.map((sale: ITableSale) => ({
    // Unique ID used as the table row key
    key: sale._id,

    // Information about the sale
    productName: sale.productName,
    productPrice: sale.productPrice,
    buyerName: sale.buyerName,
    quantity: sale.quantity,
    totalPrice: sale.totalPrice,

    // Format the selling date before displaying it
    date: formatDate(sale.date),
  }));


  // Defines all of the columns shown in the sales table
  const columns: TableColumnsType<any> = [
    {
      // Column heading
      title: 'Product Name',

      // Unique identifier for the column
      key: 'productName',

      // Gets productName from tableData
      dataIndex: 'productName',
    },
    {
      title: 'Product Price',
      key: 'productPrice',
      dataIndex: 'productPrice',

      // Centers the value inside the column
      align: 'center',
    },
    {
      title: 'Buyer Name',
      key: 'buyerName',
      dataIndex: 'buyerName',
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
      title: 'Selling Date',
      key: 'date',
      dataIndex: 'date',
      align: 'center',
    },

    // Action column for buttons that affect a sale
    {
      title: 'Action',
      key: 'x',
      align: 'center',

      // item represents the current sale/table row
      render: (item) => {
        return (
          <div style={{ display: 'flex' }}>
            {/* Pass the sale ID to the delete modal */}
            <DeleteModal id={item.key} />
          </div>
        );
      },

      // Keeps the action column narrow
      width: '1%',
    },
  ];


  // Future date filter functionality from the original page
  // This can be implemented later if needed

  // const onDateChange: DatePickerProps['onChange'] = (_date, dateString) => {
  //   setDate(dateString as string);
  // };


  return (
    <>
      {/* Search controls displayed above the table */}
      <Flex
        justify='end'
        style={{
          margin: '5px',
          gap: 4,
        }}
      >
        {/*
          Future date picker for filtering sales by selling date

          <DatePicker
            onChange={onDateChange}
            placeholder='Search by Selling date...'
            style={{ minWidth: '250px' }}
          />
        */}

        {/* Search sales using text */}
        <SearchInput
          // Allows SearchInput to update the query state
          setQuery={setQuery}
          placeholder='Search Sold Products...'
        />
      </Flex>


      {/* Table that displays all of the sales */}
      <Table
        // Makes the table slightly more compact
        size='small'

        // Shows the loading state while sales are being fetched
        loading={isFetching}

        // Defines the columns displayed in the table
        columns={columns}

        // Provides the sale records to display
        dataSource={tableData}

        // Disable the table's built-in pagination because
        // we are using our own Pagination component below
        pagination={false}
      />


      {/* Pagination displayed underneath the table */}
      <Flex
        justify='center'
        style={{
          marginTop: '1rem',
        }}
      >
        <Pagination
          // Current page number
          current={query.page}

          // Changes the page when the user clicks pagination
          onChange={onChange}

          // Number of sale records displayed on each page
          defaultPageSize={query.limit}

          // Total number of sales returned by the API
          total={data?.meta?.total}
        />
      </Flex>
    </>
  );
};


/**
 * Delete Modal
 *
 * Displays a confirmation window before deleting a sale.
 */
const DeleteModal = ({ id }: { id: string }) => {
  // Controls whether the delete confirmation modal is visible
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Gives us the mutation function used to delete a sale
  const [deleteSale] = useDeleteSaleMutation();


  // Sends the sale ID to the API to delete the sale
  const handleDelete = async (id: string) => {
    try {
      // Call the delete sale API
      // unwrap() returns the response or throws an error
      const res = await deleteSale(id).unwrap();

      // Check if the sale was deleted successfully
      if (res.statusCode === 200) {
        // Display a success message
        toastMessage({
          icon: 'success',
          text: res.message,
        });

        // Close the confirmation modal
        handleCancel();
      }
    } catch (error: any) {
      // Close the modal if the request fails
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
      {/* Delete button displayed in the Action column */}
      <Button
        // Open the confirmation modal when clicked
        onClick={showModal}
        type='primary'
        className='table-btn-small'
        style={{
          backgroundColor: 'red',
        }}
      >
        {/* Trash/delete icon */}
        <DeleteFilled />
      </Button>


      {/* Confirmation window shown before deleting the sale */}
      <Modal
        title='Delete Product'

        // Determines whether the modal is currently visible
        open={isModalOpen}

        // Close the modal if the user cancels/closes it
        onCancel={handleCancel}

        // Remove Ant Design's default modal footer
        footer={null}
      >
        <div
          style={{
            textAlign: 'center',
            padding: '2rem',
          }}
        >
          {/* Warning shown to the user */}
          <h2>Are you want to delete this product?</h2>
          <h4>You won't be able to revert it.</h4>


          {/* Buttons for cancelling or confirming deletion */}
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              marginTop: '1rem',
            }}
          >
            {/* Close the modal without deleting anything */}
            <Button
              onClick={handleCancel}
              type='primary'
              style={{
                backgroundColor: 'lightseagreen',
              }}
            >
              Cancel
            </Button>


            {/* Confirm the deletion and send the sale ID */}
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


// Export the page so it can be imported by the application's router
export default SaleManagementPage;