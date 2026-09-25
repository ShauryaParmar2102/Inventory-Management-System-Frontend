// Stores the full month names so month numbers can be converted into readable names
export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];


// Generates a readable date label using the supplied day, week, month, and year
const generateDate = ({
  day,
  week,
  month,
  year
}: {
  day?: number;
  week?: number;
  month?: number;
  year: number;
}) => {

  // By default, only display the year
  let date = String(year);


  // If a month is provided, display the month and year
  // month - 1 is used because arrays start at index 0
  if (month) {
    date = `${months[month - 1]}, ${year}`;
  }


  // If a week is provided, display the week and year
  if (week) {
    date = `${week}th week of ${year}`;
  }


  // If both day and month are provided,
  // display the complete day, month and year
  if (day && month) {
    date = `${day} ${months[month - 1]}, ${year}`;
  }


  // Return the final formatted date
  return date;
};


// Export the function so other files can use it
export default generateDate;