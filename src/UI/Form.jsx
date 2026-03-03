import "./scss/Form.scss";

function Form() {
  return (
    <div className="form">
      <label>
        Patient ID
        <input type="text" name="PatientID" />
      </label>
      <label>
        Patient First Name
        <input type="text" name="PatientFirstName" />
      </label>
      <label>
        Patient Last Name
        <input type="text" name="PatientLastName" />
      </label>  
      <label>
        Patient Address
        <input type="text" name="PatientAddress" />
      </label>
      <label>
        Patient Postcode
        <input type="text" name="PatientPostcode" />
      </label>
      <label>
        Patient Age
        <input name="PatientAge" />
      </label>
    </div>
  );
}

export default Form;
