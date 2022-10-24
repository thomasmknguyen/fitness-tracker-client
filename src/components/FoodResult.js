import React from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function FoodResult(props) {
  return (
    <Card className="m-1 text-center" style={{ width: "30%" }}>
      <Card.Header>{props.foodItem.description}</Card.Header>
      <Card.Body>
        <Card.Text>
          Id: {props.foodItem.fdcId}
          <br />
          {props.foodItem.brandOwner && (
            <span>
              Brand: {props.foodItem.brandOwner}
              <br />
            </span>
          )}
          {props.foodItem.packageWeight && (
            <span>
              Package Weight: {props.foodItem.packageWeight}
              <br />
            </span>
          )}
          <span>
            {props.foodItem.servingSize
              ? `Serving Size: ${
                  Math.round(props.foodItem.servingSize * 100) / 100
                } ${props.foodItem.servingSizeUnit}`
              : "Serving Size: 100 g"}
          </span>
        </Card.Text>

        <Table>
          <thead>
            <tr>
              <th>Macronutrient</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {props.foodItem.foodNutrients
              .filter(
                (nutrient) =>
                  nutrient.nutrientId === 1003 ||
                  nutrient.nutrientId === 1004 ||
                  nutrient.nutrientId === 1005 ||
                  nutrient.nutrientId === 1008
              )
              .map((nutrient) => (
                <tr key={nutrient.nutrientId}>
                  <td>{nutrient.nutrientName}</td>
                  <td>
                    {props.foodItem.servingSize
                      ? Math.round(
                          nutrient.value * props.foodItem.servingSize
                        ) / 100
                      : nutrient.value}{" "}
                    {nutrient.unitName}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        {props.resultType === "Select" && (
          <Button
            variant="dark"
            onClick={() => props.handleSelectFood(props.foodItem)}
          >
            Select
          </Button>
        )}
      </Card.Body>
      {props.resultType === "Add" && (
        <Form onSubmit={props.handleAddFood}>
          <Form.Group className="mb-3">
            <Form.Label>Your serving size (G):</Form.Label>
            <Form.Control
              type="number"
              value={props.serving}
              onChange={props.handleServingSizeChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Calories:</Form.Label>
            <Form.Control type="number" value={props.calories} disabled />
          </Form.Group>
          <Button variant="dark" type="submit" disabled={props.addDisabled}>
            Add Food
          </Button>
        </Form>
      )}
    </Card>
  );
}

export default FoodResult;
