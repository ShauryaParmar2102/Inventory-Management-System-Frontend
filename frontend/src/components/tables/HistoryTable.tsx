// Import the actual Table component
import { Table } from 'antd';

// Import the TypeScript type for the table columns
import type { TableColumnsType } from 'antd';

// Import the helper used to generate/format the date
import generateDate from '../../utils/generateDate';

// Define the structure of each history record
interface IData {
  _id: string;
  day?: number;
  month?: number;
  week?: number;

  // Year is required because every history record needs a year
  year: number;

  totalQuantity: number;
  totalRevenue: number;
}

// Define the structure of the table rows
interface ITableData {
  key: string;
  date: string;
  totalQuantity: number;
  totalRevenue: number;
}

// Define the columns displayed in the table
const columns: TableColumnsType<ITableData> = [
  {
    // Column for the date or year
    title: 'Date/Year',
    key: 'date',
    dataIndex: 'date',
  },
  {
    // Column for the total quantity sold
    title: 'Total Sell (Quantity)',
    key: 'totalQuantity',
    dataIndex: 'totalQuantity',
    align: 'center',
  },
  {
    // Column for the total revenue
    title: 'Total Revenue',
    key: 'totalRevenue',
    dataIndex: 'totalRevenue',
    align: 'right',
  },
];

// Define the props received by HistoryTable
interface HistoryTableProps {
  data?: {
    data: IData[];
  };
  isFetching: boolean;
}

// Component used to display sales history
const HistoryTable = ({ data, isFetching }: HistoryTableProps) => {

  // Convert the API data into rows for the table
  const tableData = data?.data?.map((row: IData) => ({
    // Give each table row a unique key
    key: row._id,

    // Generate the date displayed in the table
    date: generateDate({
      year: row.year,
      week: row.week,
      month: row.month,
      day: row.day,
    }),

    // Store the total quantity sold
    totalQuantity: row.totalQuantity,

    // Store the total revenue
    totalRevenue: row.totalRevenue,
  }));

  // Display the history table
  return (
    <Table
      size='small'
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      pagination={false}
    />
  );
};

// Export the component so it can be used elsewhere
export default HistoryTable;