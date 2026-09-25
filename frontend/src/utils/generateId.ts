// Generates a unique date-based ID using the supplied year, month, week, and day
const generateId = ({
  day,
  week,
  month,
  year,
}: {
  day?: number;
  week?: number;
  month?: number;
  year: number;
}) => {

  // Start the ID with the year
  let id = String(year);


  // If a month exists, add it to the ID
  if (month) {
    id += month;
  }


  // If a week exists, add it to the ID
  if (week) {
    id += week;
  }


  // If a day exists, add it to the ID
  if (day) {
    id += day;
  }


  // Return the completed ID
  return id;
};


// Export the function so it can be used in other files
export default generateId;