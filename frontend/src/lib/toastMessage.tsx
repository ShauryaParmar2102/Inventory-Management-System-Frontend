import Swal from 'sweetalert2';
import type { SweetAlertOptions } from 'sweetalert2';

// Reusable function for displaying SweetAlert messages
const toastMessage = (props: SweetAlertOptions) => {

  // Display the alert using the provided options
  Swal.fire(props);
};

// Export the function so it can be used throughout the app
export default toastMessage;