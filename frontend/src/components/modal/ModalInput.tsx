import { Col, Row } from 'antd'; // Import Ant Design components used to organise the input into columns

// Define the properties that the ModalInput component receives
interface Props {
    name: string;  // Name used to identify the input field
    label: string;  // Text displayed as the input's label
    type?: string;  // Optional input type such as text or number
    handleChange: any;   // Function that runs whenever the input value changes
    defaultValue?: any; // Optional value that is already stored in the input
}

// Reusable input component used inside different modals
const ModalInput = ({ name, label, handleChange, defaultValue = '', type = 'text' }: Props) => {

    // Structure of the input field
      return (
    <Row>

        {/* Column containing the input label */}
      <Col span={6}>
        <label htmlFor={name} className='label'>
          {label}
        </label>
      </Col>

      {/* Column containing the actual input */}
      <Col span={18}>
        <input
          id={name} // Connect the input to its label
          type={type} // Set the input type, such as text or number
          name={name} // Give the input a name so handleChange knows which field changed
          value={defaultValue} // Display the current/default value
          placeholder={label}  // Display the label as placeholder text
          onChange={handleChange} // Run handleChange whenever the user changes the input
          className={`input-field`} // Apply the input-field CSS styling
        />
      </Col>
    </Row>
  );
};

// Export the component so other modal components can use it
export default ModalInput;