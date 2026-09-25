// Icon used for the delete button
import { DeleteFilled } from '@ant-design/icons';

// Types used for the table and pagination
import type { PaginationProps, TableColumnsType } from 'antd';

// Ant Design UI components
import { Button, Flex, Modal, Pagination, Table } from 'antd';

// React hook used for storing state
import { useState } from 'react';

// API hooks used to get sellers and delete a seller
import {
  useDeleteSellerMutation,
  useGetAllSellerQuery,
} from '../../redux/features/management/sellerApi';

// Type used for seller data
import type { ISeller } from '../../types/product.types';

// Reusable function for displaying success/error messages
import toastMessage from '../../lib/toastMessage';

// Reusable search input component
import SearchInput from '../../components/SearchInput';


// Define the structure of each row in the seller table
interface SellerTableData {
  key: string;
  name: string;
  email: string;
  contactNo: string;
}


// Page used to manage sellers
const SellerManagementPage = () => {

  // Stores the current pagination and search settings
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
    search: '',
  });

  // Fetch sellers from the API using the current query
  const { data, isFetching } = useGetAllSellerQuery(query);


  // Runs when the user selects another pagination page
  const onChange: PaginationProps['onChange'] = (page) => {

    // Keep the existing query values and update only the page number
    setQuery((prev) => ({
      ...prev,
      page,
    }));
  };


  // Convert the seller data returned by the API
  // into the structure needed by the Ant Design table
  const tableData: SellerTableData[] | undefined = data?.data?.map(
    (seller: ISeller) => ({
      // Unique key for each table row
      key: seller._id,

      // Seller information displayed in the table
      name: seller.name,
      email: seller.email,
      contactNo: seller.contactNo,
    })
  );


  // Define the columns displayed in the seller table
  const columns: TableColumnsType<SellerTableData> = [
    {
      // Seller name column
      title: 'Seller Name',
      key: 'name',
      dataIndex: 'name',
    },
    {
      // Seller email column
      title: 'Email',
      key: 'email',
      dataIndex: 'email',
      align: 'center',
    },
    {
      // Seller contact number column
      title: 'Contact Number',
      key: 'contactNo',
      dataIndex: 'contactNo',
      align: 'center',
    },
    {
      // Column containing the delete button
      title: 'Action',
      key: 'action',
      align: 'center',

      // item represents the current seller/table row
      render: (item: SellerTableData) => (
        <div style={{ display: 'flex' }}>
          {/* Pass the seller's ID to the delete modal */}
          <DeleteModal id={item.key} />
        </div>
      ),

      // Keep the action column narrow
      width: '1%',
    },
  ];


  return (
    <>
      {/* Search section above the seller table */}
      <Flex justify='end' style={{ margin: '5px' }}>
        <SearchInput
          // Allows SearchInput to update the query state
          setQuery={setQuery}
          placeholder='Search Seller...'
        />
      </Flex>


      {/* Table used to display the sellers */}
      <Table
        // Makes the table more compact
        size='small'

        // Shows the loading state while sellers are being fetched
        loading={isFetching}

        // Defines which columns are displayed
        columns={columns}

        // Provides the seller records to the table
        dataSource={tableData}

        // Disable built-in pagination because
        // we use our own Pagination component below
        pagination={false}
      />


      {/* Pagination displayed underneath the table */}
      <Flex justify='center' style={{ marginTop: '1rem' }}>
        <Pagination
          // Current page number
          current={query.page}

          // Runs onChange when another page is selected
          onChange={onChange}

          // Number of sellers displayed on each page
          defaultPageSize={query.limit}

          // Total number of sellers returned by the API
          total={data?.meta?.total}
        />
      </Flex>
    </>
  );
};


/**
 * Delete Modal
 *
 * Displays a confirmation window before deleting a seller.
 */
const DeleteModal = ({ id }: { id: string }) => {

  // Controls whether the delete confirmation modal is visible
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mutation function used to delete a seller through the API
  const [deleteSeller] = useDeleteSellerMutation();


  // Delete a seller using their ID
  const handleDelete = async (id: string) => {
    try {

      // Send the seller ID to the delete API
      const res = await deleteSeller(id).unwrap();

      // Check whether the deletion was successful
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

      // Close the modal if something goes wrong
      handleCancel();

      // Display the error returned by the API
      toastMessage({
        icon: 'error',
        text: error.data.message,
      });
    }
  };


  // Open the delete confirmation modal
  const showModal = () => {
    setIsModalOpen(true);
  };


  // Close the delete confirmation modal
  const handleCancel = () => {
    setIsModalOpen(false);
  };


  return (
    <>
      {/* Delete button displayed in the Action column */}
      <Button
        onClick={showModal}
        type='primary'
        className='table-btn-small'
        style={{ backgroundColor: 'red' }}
      >
        <DeleteFilled />
      </Button>


      {/* Confirmation modal shown before deleting */}
      <Modal
        title='Delete Seller'
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
          {/* Warning message */}
          <h2>Are you sure you want to delete this seller?</h2>
          <h4>You won't be able to revert it.</h4>


          {/* Cancel and delete buttons */}
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


            {/* Confirm the deletion */}
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


// Export the page so it can be used elsewhere in the application
export default SellerManagementPage;