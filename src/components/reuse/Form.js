import React, { useState } from "react";

const Form = ({ setParentVal }) => {
  const [values, setValues] = useState({ name: "" });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setParentVal(values);
    setValues({});
  };

  return (
    <form>
      <label htmlFor=''>Username: </label>
      <input
        type='text'
        name=''
        value={values.name}
        onChange={handleInputChange}
        placeholder=''
      />
      <button onSubmit={handleSubmit} type='submit'>
        Submit
      </button>
    </form>
  );
};

export default Form;
