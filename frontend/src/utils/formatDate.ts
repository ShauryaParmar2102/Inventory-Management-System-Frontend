// Stores the month names used when formatting a date
const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

// Takes a date/time string and converts it into a readable date
const formatDate = (time: string) => {
  // Convert the supplied string into a JavaScript Date object
  const date = new Date(time);

  // Return the date in a format such as: "25 Sept, 2026"
  return `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`;
};

// Export the function so it can be used throughout the application
export default formatDate;