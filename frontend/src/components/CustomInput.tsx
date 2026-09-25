import { Col, Row } from 'antd';

// Define the props that CustomInput receives
interface Props {
  name: string; // Name used to identify the input    
  errors?: any;  // Store any validation errors
  label: string;  // Text displayed as the input label
  type?: string;   // Optional input type, such as text, email or number
  register: any; // React Hook Form function used to register the input
  required?: boolean; // Decide whether the input is required
  defaultValue?: any; // Optional starting value for the input
}

// Reusable input component used in forms
const CustomInput = ({
  name,
  errors = {},
  required = false,
  label,
  register,
  type = 'text',
}: Props) => {

     // Structure/UI for the input field
  return (
    <Row>

        {/* Column containing the input label */}
      <Col xs={{ span: 23 }} lg={{ span: 6 }}>
        <label htmlFor={name} className='label'>
          {label}
        </label>
      </Col>

      {/* Column containing the input */}
      <Col xs={{ span: 23 }} lg={{ span: 18 }}>
        <input
          id={name}  // Connect the input to its label
          type={type} // Set the input type
          placeholder={label} // Display placeholder text

          // Register the input with React Hook Form
          {...register(name, { required: required })}

          // Add error styling if the input has an error
          className={`input-field ${errors[name] ? 'input-field-error' : ''}`}
        />
      </Col>
    </Row>
  );
};

export default CustomInput; // Export the component so it can be reused in other forms