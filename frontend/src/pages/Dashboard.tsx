// Ant Design components used to create the responsive dashboard layout
import { Button, Col, Row } from 'antd';

// TypeScript type describing a product
import type { IProduct } from '../types/product.types';

// Chart that displays monthly revenue
import MonthlyChart from '../components/charts/MonthlyChart';

// Loading component displayed while dashboard data is loading
import Loader from '../components/Loader';

// API hooks used to:
// - Get the total amount of stock
// - Get the actual list of products
import {
  useCountProductsQuery,
  useGetAllProductsQuery,
  useDeleteProductMutation,
} from '../redux/features/management/productApi';

// API hook used to get yearly sales data
import { useYearlySaleQuery } from '../redux/features/management/saleApi';

// Chart that displays daily sales and revenue
import DailyChart from '../components/charts/DailyChart';


const Dashboard = () => {

  // ================= PRODUCT STOCK =================

  // Get product stock information from the API
  // This is used for the Total Stock dashboard card
  const {
    data: products,
    isLoading,
  } = useCountProductsQuery(undefined);


  // ================= PRODUCT LIST =================

  // Get the actual products from the API
  // These products will be displayed as cards
  // at the bottom of the dashboard
  const {
    data: productList,
    isLoading: isProductsLoading,
  } = useGetAllProductsQuery({
    page: 1,
    limit: 8,
    search: '',
  });

  // 👇 PUT IT HERE

// Mutation used to delete a product
const [deleteProduct] = useDeleteProductMutation();

// Delete a product from the database
const handleDeleteProduct = async (productId: string) => {

  // Ask the user for confirmation before deleting
  const confirmDelete = window.confirm(
    'Are you sure you want to delete this product?'
  );

  // Stop if the user presses Cancel
  if (!confirmDelete) {
    return;
  }

  try {
    // Send the product ID to the delete API
    await deleteProduct(productId).unwrap();
  } catch (error) {
    console.error('Failed to delete product:', error);
  }
};

  // ================= YEARLY SALES =================

  // Get yearly sales information from the API
  // Rename the loading state to isLoading1 so it does not
  // conflict with the product loading state
  const {
    data: yearlyData,
    isLoading: isLoading1,
  } = useYearlySaleQuery(undefined);


  // ================= LOADING =================

  // Display the loader while any of the dashboard
  // API requests are still loading
  if (isLoading || isLoading1 || isProductsLoading) {
    return <Loader />;
  }


  // ================= DASHBOARD UI =================

  return (
    <>

      {/* ================= STATISTIC CARDS ================= */}

      {/* Row containing the three dashboard statistic cards */}
      <Row style={{ paddingRight: '1rem' }}>

        {/* ================= TOTAL STOCK ================= */}

        <Col
          xs={{ span: 24 }}
          lg={{ span: 8 }}
          style={{ padding: '.5rem' }}
        >
          <div className='number-card'>

            <h3>Total Stock</h3>

            {/* 
              Display the total quantity of products in stock.
              If there is no value, display 0 instead.
            */}
            <h1>
              {products?.data?.totalQuantity || 0}
            </h1>

          </div>
        </Col>


        {/* ================= TOTAL ITEMS SOLD ================= */}

        <Col
          xs={{ span: 24 }}
          lg={{ span: 8 }}
          style={{ padding: '.5rem' }}
        >
          <div className='number-card'>

            <h3>Total Item Sell</h3>

            <h1>
              {yearlyData?.data?.reduce(
                (
                  acc: number,
                  cur: { totalQuantity: number }
                ) => acc + cur.totalQuantity,

                // Start the total at 0
                0
              ) ?? 0}
            </h1>

          </div>
        </Col>


        {/* ================= TOTAL REVENUE ================= */}

        <Col
          xs={{ span: 24 }}
          lg={{ span: 8 }}
          style={{ padding: '.5rem' }}
        >
          <div className='number-card'>

            <h3>Total Revenue</h3>

            <h1>
              $
              {yearlyData?.data?.reduce(
                (
                  acc: number,
                  cur: { totalRevenue: number }
                ) => acc + cur.totalRevenue,

                // Start the total at 0
                0
              ) ?? 0}
            </h1>

          </div>
        </Col>

      </Row>


      {/* ================= DAILY CHART ================= */}

      {/* Container for the daily sales/revenue chart */}
      <div
        style={{
          border: '1px solid gray',
          margin: '1rem',
          padding: '1rem',
          borderRadius: '10px',
        }}
      >

        {/* Daily chart heading */}
        <h1
          style={{
            textAlign: 'center',
            marginBottom: '.5rem',
          }}
        >
          Daily Sale and Revenue
        </h1>

        {/* Display the daily sales and revenue chart */}
        <DailyChart />

      </div>


      {/* ================= MONTHLY CHART ================= */}

      {/* Container for the monthly revenue chart */}
      <div
        style={{
          border: '1px solid gray',
          margin: '1rem',
          padding: '1rem',
          borderRadius: '10px',
        }}
      >

        {/* Monthly chart heading */}
        <h1
          style={{
            textAlign: 'center',
            marginBottom: '.5rem',
          }}
        >
          Monthly Revenue
        </h1>

        {/* Display the monthly revenue chart */}
        <MonthlyChart />

      </div>


{/* ================= PRODUCTS SECTION ================= */}

{/* 
  This section displays actual products from the database.

  The products come from useGetAllProductsQuery()
  and are displayed as responsive cards.
*/}
<div
  style={{
    border: '1px solid gray',
    margin: '1rem',
    padding: '1rem',
    borderRadius: '10px',
  }}
>

  {/* Products section heading */}
  <h1
    style={{
      textAlign: 'center',
      marginBottom: '1rem',
    }}
  >
    Products
  </h1>

        {/* ================= NO PRODUCTS ================= */}

        {/* 
          If there are no products in the database,
          display a message instead of an empty section.
        */}
        {productList?.data?.length === 0 && (
          <p>
            No products available.
          </p>
        )}


        {/* ================= PRODUCT GRID ================= */}

        {/* 
          Ant Design Row creates the responsive grid.

          gutter adds spacing between each product card.
        */}
        <Row gutter={[16, 16]}>

          {/* 
            Loop through the products returned by the API.

            One card is created for each product.
          */}
          {productList?.data?.map((product: IProduct) => (

            // Responsive column containing one product
            <Col
              key={product._id}
              xs={24}
              sm={12}
              lg={8}
              xl={6}
            >

              {/* ================= PRODUCT CARD ================= */}

              <div
                style={{
                  border: '1px solid #ddd',
                  borderRadius: '10px',
                  padding: '1rem',
                  height: '100%',
                }}
              >

                {/* Product name */}
                <h2>
                  {product.name}
                </h2>


                {/* Product description */}

                {/* 
                  If the product does not have a description,
                  display "No description" instead.
                */}
                <p>
                  {product.description || 'No description'}
                </p>


                {/* Product price */}
                <h3>
                  ${product.price}
                </h3>


                {/* Current amount of the product in stock */}
                <p>
                  Stock: {product.stock}
                </p>


                {/* Product category */}

                {/* 
                  Only display the category if one exists
                  on the product.
                */}
                {product.category && (
                  <p>
                    <strong>Category:</strong>{' '}
                    {product.category.name}
                  </p>
                )}


                {/* Product brand */}

                {/* 
                  Brand is optional, so this is only
                  displayed when the product has a brand.
                */}
                {product.brand && (
                  <p>
                    <strong>Brand:</strong>{' '}
                    {product.brand.name}
                  </p>
                )}


                {/* Product seller */}

                {/* 
                  Display the seller/supplier associated
                  with the product if one exists.
                */}
                {product.seller && (
                  <p>
                    <strong>Seller:</strong>{' '}
                    {product.seller.name}
                  </p>
                )}

                {/* Button used to delete this product */}
                <Button
                  danger
                  onClick={() => handleDeleteProduct(product._id)}
                  style={{
                    marginTop: '1rem',
                  }}
                >
                  Delete
                </Button>

              </div>

            </Col>
          ))}

        </Row>

      </div>

    </>
  );
};


// Export the Dashboard so it can be used by the application's router
export default Dashboard;