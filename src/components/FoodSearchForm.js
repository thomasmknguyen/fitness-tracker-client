import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function FoodSearchForm(props) {
  return (
    <Form
      className="d-flex justify-content-center"
      onSubmit={props.handleFoodSubmit}
    >
      <Form.Control
        className="w-25 m-1"
        type="text"
        placeholder="Enter food"
        value={props.foodQuery}
        onChange={(event) => props.setFoodQuery(event.target.value)}
      />
      <Button
        className="m-1"
        type="submit"
        variant="dark"
        disabled={props.loading}
      >
        {!props.loading ? "Search" : "Loading..."}
      </Button>
      <Button className="m-1" variant="dark" onClick={props.handleClear}>
        Clear
      </Button>
    </Form>
  );
}

export default FoodSearchForm;
