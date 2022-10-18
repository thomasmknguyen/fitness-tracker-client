import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import DatePicker from "./DatePicker";
import FoodSearchForm from "./FoodSearchForm";

function FoodPage() {
  const [searching, setSearching] = useState(false);
  const [meal, setMeal] = useState("Meal");
  const [foodQuery, setFoodQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [pageNumber, setPageNumber] = useState([1]);
  const [loading, setLoading] = useState(false);
  const [selecting, setSelecting] = useState(false);
  const [foodItem, setFoodItem] = useState([
    { servingSize: 0, foodNutrients: { value: 0 } },
  ]);
  const [servingSize, setServingSize] = useState(0);
  const [calories, setCalories] = useState(0);

  const getCurrentDate = () => {
    const current = new Date();
    const date = `${current.getFullYear()}-${
      current.getMonth() + 1
    }-${current.getDate()}`;
    return date;
  };

  const [date, setDate] = useState(getCurrentDate());

  const handleFoodSubmit = async (event) => {
    event.preventDefault();
    // if search field is empty or is the same as previous search, don't call api
    const previousQuery = searchResults?.foodSearchCriteria?.query;
    if (foodQuery.length === 0 || previousQuery === foodQuery) return;

    setLoading(true);
    setSelecting(false);
    setSearchResults([]);

    const params = {
      api_key: "AF88tCV1yTihPj5g6hqRg6VYzgESSGdwfqvQetQH",
      query: foodQuery,
      pageSize: 9,
      //pageNumber: 1,
      //dataType: ["Branded", "Foundation", "SR Legacy"],
    };

    const api_url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(
      params.api_key
    )}&query=${encodeURIComponent(params.query)}&pageSize=${encodeURIComponent(
      params.pageSize
    )}`;

    await fetch(api_url)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setSearchResults(json);
        setLoading(false);
      });
  };

  const handleClear = () => {
    setSearchResults([]);
    setFoodQuery("");
    setSelecting(false);
  };

  const handleSelectFood = (item) => {
    setFoodItem(item);
    setSelecting(true);
    setSearchResults([]);
  };

  const handleServingSizeChange = (event) => {
    setServingSize(event.target.value);

    for (let i = 0; i < foodItem.foodNutrients.length; i++) {
      if (foodItem.foodNutrients[i].nutrientId === 1008) {
        setCalories(
          Math.round(event.target.value * foodItem.foodNutrients[i].value) / 100
        );
        break;
      }
    }
  };

  const handleAddFood = async () => {};

  return (
    <>
      <Container className="mt-3 mb-3 w-50 d-flex justify-content-center text-center">
        <div>
          <DatePicker date={date} setDate={setDate} />
          {!searching && (
            <Button
              className="mt-2"
              variant="dark"
              onClick={() => setSearching(true)}
            >
              Add Food
            </Button>
          )}
          {searching && (
            <Dropdown>
              <Dropdown.Toggle
                className="mt-2"
                variant="dark"
                id="dropdown-basic"
              >
                {meal}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setMeal("Breakfast")}>
                  Breakfast
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setMeal("Lunch")}>
                  Lunch
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setMeal("Dinner")}>
                  Dinner
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
      </Container>
      {searching && (
        <Container className="mt-3 mb-3 w-25 d-flex justify-content-center text-center">
          <div className="w-100">
            <FoodSearchForm
              getFoodResults={handleFoodSubmit}
              foodQuery={foodQuery}
              setFoodQuery={setFoodQuery}
              loading={loading}
              setSearchResults={setSearchResults}
              handleClear={handleClear}
            />
          </div>
        </Container>
      )}
      {searchResults.length !== 0 && (
        <div>
          {searchResults.foods.map((foodItem) => (
            <Card key={foodItem.fdcId} className="text-center">
              <Card.Header>{foodItem.description}</Card.Header>
              <Card.Body>
                <Card.Text>
                  Id: {foodItem.fdcId}
                  <br />
                  {foodItem.brandOwner && (
                    <span>
                      Brand: {foodItem.brandOwner}
                      <br />
                    </span>
                  )}
                  {foodItem.packageWeight && (
                    <span>
                      Package Weight: {foodItem.packageWeight}
                      <br />
                    </span>
                  )}
                  <span>
                    {foodItem.servingSize
                      ? `Serving Size: ${
                          Math.round(foodItem.servingSize * 100) / 100
                        } ${foodItem.servingSizeUnit}`
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
                    {foodItem.foodNutrients
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
                            {foodItem.servingSize
                              ? Math.round(
                                  nutrient.value * foodItem.servingSize
                                ) / 100
                              : nutrient.value}{" "}
                            {nutrient.unitName}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
                <Button
                  variant="dark"
                  onClick={() => handleSelectFood(foodItem)}
                >
                  Select
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
      {selecting && (
        <Card key={foodItem.fdcId} className="text-center">
          <Card.Header>{foodItem.description}</Card.Header>
          <Card.Body>
            <Card.Text>
              Id: {foodItem.fdcId}
              <br />
              {foodItem.brandOwner && (
                <span>
                  Brand: {foodItem.brandOwner}
                  <br />
                </span>
              )}
              {foodItem.packageWeight && (
                <span>
                  Package Weight: {foodItem.packageWeight}
                  <br />
                </span>
              )}
              <span>
                {foodItem.servingSize
                  ? `Serving Size: ${
                      Math.round(foodItem.servingSize * 100) / 100
                    } ${foodItem.servingSizeUnit}`
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
                {foodItem.foodNutrients
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
                        {foodItem.servingSize
                          ? Math.round(nutrient.value * foodItem.servingSize) /
                            100
                          : nutrient.value}{" "}
                        {nutrient.unitName}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            <Form onSubmit={handleAddFood}>
              <Form.Group className="mb-3">
                <Form.Label>Your serving size (G):</Form.Label>
                <Form.Control
                  type="number"
                  value={servingSize}
                  onChange={handleServingSizeChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Calories:</Form.Label>
                <Form.Control type="number" value={calories} disabled />
              </Form.Group>
              <Button variant="dark" type="submit" onClick={handleAddFood}>
                Add Food
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}
    </>
  );
}

export default FoodPage;
