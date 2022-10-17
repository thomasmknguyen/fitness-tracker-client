import React, { useState } from "react";
import Form from "react-bootstrap/Form";

function DatePicker() {
  const getCurrentDate = () => {
    const current = new Date();
    const date = `${current.getFullYear()}-${
      current.getMonth() + 1
    }-${current.getDate()}`;
    return date;
  };

  const [today, setToday] = useState(getCurrentDate());

  const handleChange = (event) => {
    setToday(event.target.value);
  };

  return <Form.Control type="date" value={today} onChange={handleChange} />;
}

export default DatePicker;
