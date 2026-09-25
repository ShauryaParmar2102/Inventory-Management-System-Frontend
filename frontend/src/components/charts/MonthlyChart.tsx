import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';

import { useMonthlySaleQuery } from '../../redux/features/management/saleApi';
import { months } from '../../utils/generateDate';
import { Flex } from 'antd';
import Loader from '../Loader';

// Component used to display monthly sales revenue in a bar chart
const MonthlyChart = () => {

    // Fetch monthly sales data from the backend
    // isLoading tells us whether the request is still loading
    const { data: monthlyData, isLoading } = useMonthlySaleQuery(undefined);

    // Display the loader while waiting for the sales data
    if (isLoading)
        return (
            <Flex>
                <Loader />
            </Flex>
        );

    // Convert the monthly sales data into a format Recharts can use
    const data = monthlyData?.data.map(
        (item: {
            month: number;
            year: number;
            totalRevenue: number;
        }) => ({

            // Convert the month number into a readable month and year
            // Subtract 1 because array indexes start at 0
            name: `${months[item.month - 1]}, ${item.year}`,

            // Store the total revenue for that month
            revenue: item.totalRevenue,
        })
    );

    // Display the monthly revenue bar chart
    return (

        // Automatically resize the chart to fit its container
        <ResponsiveContainer width='100%' height={300}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey='revenue' fill='#164863' />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default MonthlyChart; // Export the component so it can be used elsewhere