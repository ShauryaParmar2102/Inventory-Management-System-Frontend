// Ant Design components used to create the responsive page layout
import { Col, Row } from 'antd';

// Reusable table component used to display each sales history report
import HistoryTable from '../components/tables/HistoryTable';

// API hooks used to fetch sales reports for different time periods
import {
  useDailySaleQuery,
  useMonthlySaleQuery,
  useWeeklySaleQuery,
  useYearlySaleQuery,
} from '../redux/features/management/saleApi';


const SaleHistoryPage = () => {
  // Get yearly sales data from the API
  // Rename isFetching so we know it belongs to the yearly request
  const {
    data: yearlyData,
    isFetching: isYearlyDataFetching,
  } = useYearlySaleQuery(undefined);


  // Get monthly sales data from the API
  const {
    data: monthlyData,
    isFetching: isMonthlyDataFetching,
  } = useMonthlySaleQuery(undefined);


  // Get daily sales data from the API
  const {
    data: dailySale,
    isFetching: isDailySaleFetching,
  } = useDailySaleQuery(undefined);


  // Get weekly sales data from the API
  const {
    data: weeklySale,
    isFetching: isWeeklySaleFetching,
  } = useWeeklySaleQuery(undefined);


  return (
    // Main responsive container for all four sales reports
    <Row
      style={{
        // Limit the height so the sales section fits within the page
        maxHeight: 'calc(100vh - 5rem)',

        // Allow scrolling if the tables take up more space
        overflow: 'auto',

        // Add a little space on the right
        paddingRight: '.5rem',
      }}
    >

      {/* ================= YEARLY SALES ================= */}
      <Col
        // Full width on small screens
        xs={{ span: 24 }}

        // Half width on large screens
        lg={{ span: 12 }}

        style={{ padding: '.2rem' }}
      >
        <div className='sales'>
          {/* Section heading */}
          <h1
            style={{
              fontSize: '2rem',
              textAlign: 'center',
            }}
          >
            Yearly Sale
          </h1>

          {/* 
            Display yearly sales inside the reusable HistoryTable.

            isFetching allows the table to know whether
            the yearly data is still being loaded/refetched.
          */}
          <HistoryTable
            data={yearlyData}
            isFetching={isYearlyDataFetching}
          />
        </div>
      </Col>


      {/* ================= MONTHLY SALES ================= */}
      <Col
        xs={{ span: 24 }}
        lg={{ span: 12 }}
        style={{ padding: '.2rem' }}
      >
        <div className='sales'>
          {/* Section heading */}
          <h1
            style={{
              fontSize: '2rem',
              textAlign: 'center',
            }}
          >
            Monthly Sale
          </h1>

          {/* Display the monthly sales report */}
          <HistoryTable
            data={monthlyData}
            isFetching={isMonthlyDataFetching}
          />
        </div>
      </Col>


      {/* ================= WEEKLY SALES ================= */}
      <Col
        xs={{ span: 24 }}
        lg={{ span: 12 }}
        style={{ padding: '.2rem' }}
      >
        <div className='sales'>
          {/* Section heading */}
          <h1
            style={{
              fontSize: '2rem',
              textAlign: 'center',
            }}
          >
            Weekly Sale
          </h1>

          {/* Display the weekly sales report */}
          <HistoryTable
            data={weeklySale}
            isFetching={isWeeklySaleFetching}
          />
        </div>
      </Col>


      {/* ================= DAILY SALES ================= */}
      <Col
        xs={{ span: 24 }}
        lg={{ span: 12 }}
        style={{ padding: '.2rem' }}
      >
        <div className='sales'>
          {/* Section heading */}
          <h1
            style={{
              fontSize: '2rem',
              textAlign: 'center',
            }}
          >
            Daily Sale
          </h1>

          {/* Display the daily sales report */}
          <HistoryTable
            data={dailySale}
            isFetching={isDailySaleFetching}
          />
        </div>
      </Col>
    </Row>
  );
};


// Export the page so it can be used by the application's router
export default SaleHistoryPage;