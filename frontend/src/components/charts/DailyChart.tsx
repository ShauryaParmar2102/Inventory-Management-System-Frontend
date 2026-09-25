import {Flex } from 'antd';
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import {useDailySaleQuery} from '../../redux/features/management/saleApi';

import Loader from '../Loader';
import { months } from '../../utils/generateDate';
export default function DailyChart() {

    // Fetch the daily sales data from the API
    // dailyData contains the response and isLoading tells us if it is still loading
    const { data: dailyData, isLoading } = useDailySaleQuery(undefined);

    // Show the Loader component while the daily sales data is being fetched
    if (isLoading) {
        return (
            <Flex>
                <Loader />
            </Flex>
        );
    }

        // Convert the daily sales API data into a format that can be used by the chart
    const data = dailyData?.data.map(

        // Define the expected properties for each daily sales item
        (item: {
            day: number;
            month: number;
            year: number;
            totalRevenue: number;
            totalQuantity: number;
        }) => ({

            // Create a readable date such as "23 September, 2026"
            // Subtract 1 because array indexes start at 0 but months start at 1
            name: `${item.day} ${months[item.month - 1]}, ${item.year}`,
            revenue: item.totalRevenue, // Store the total revenue made on this day
            quantity: item.totalQuantity, // Store the total quantity of products sold on this day
        })
    );

    // Return the completed daily sales chart
    return (
         // Makes the chart automatically resize to fit its parent container
        <ResponsiveContainer width='100%' height={300}>
            <AreaChart
                width={500}
                height={400}
                data={data} // Use the formatted daily sales data created above
                margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray={'3 3'} />
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip />
                <Area type='monotone' dataKey='revenue' stroke='#8884d8' fill='#164863' />
                <Area type='monotone' dataKey='quantity' stroke='#8884d8' fill='#164863' />
            </AreaChart>
        </ResponsiveContainer>
    );
}