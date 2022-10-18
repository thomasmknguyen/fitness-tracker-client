import React, { useState } from "react";
import Form from "react-bootstrap/Form";

function DatePicker(props) {
  const handleChange = (event) => {
    props.setDate(event.target.value);
  };

  return (
    <Form.Control type="date" value={props.date} onChange={handleChange} />
  );
}

export default DatePicker;
