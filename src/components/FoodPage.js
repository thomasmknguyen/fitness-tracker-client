import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";

function FoodPage() {
  const [isSearching, setIsSearching] = useState(false);
  const [meal, setMeal] = useState("Meal");
  const [foodQuery, setFoodQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getFoodResults = async (event) => {
    event.preventDefault();
    // if search field is empty or is the same as previous search, don't call api
    const previousQuery = searchResults?.foodSearchCriteria?.query;
    if (foodQuery.length === 0 || previousQuery === foodQuery) return;

    setIsLoading(true);
    setSearchResults([]);

    const params = {
      api_key: "AF88tCV1yTihPj5g6hqRg6VYzgESSGdwfqvQetQH",
      query: foodQuery,
      pageSize: 9,
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
        setIsLoading(false);
      });
  };

  const handleFoodQueryChange = (event) => {
    setFoodQuery(event.target.value);
  };

  return (
    <>
      <div>
        {!isSearching && (
          <Button variant="dark" onClick={() => setIsSearching(true)}>
            Add Food
          </Button>
        )}
        {isSearching && (
          <Dropdown>
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
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
      {isSearching && (
        <div>
          <Form onSubmit={getFoodResults}>
            <Form.Control
              type="text"
              placeholder="Enter food"
              value={foodQuery}
              onChange={handleFoodQueryChange}
            />
            <Button type="submit" variant="dark" disabled={isLoading}>
              {!isLoading ? "Search" : "Loading..."}
            </Button>
            <Button variant="dark" onClick={() => setSearchResults([])}>
              Clear
            </Button>
          </Form>
        </div>
      )}
      {searchResults.length > 0 && (
        <div>
          {searchResults.foods.map((item) => (
            <Card key={item.fdcId} className="text-center">
              <Card.Header>{item.description}</Card.Header>
              <Card.Body>
                <Card.Text>
                  Id: {item.fdcId}
                  <br />
                  {item.brandOwner && (
                    <span>
                      Brand: {item.brandOwner}
                      <br />
                    </span>
                  )}
                  {item.packageWeight && (
                    <span>
                      Package Weight: {item.packageWeight}
                      <br />
                    </span>
                  )}
                  {item.servingSize && (
                    <span>
                      Serving Size:{" "}
                      {item.servingSize + " " + item.servingSizeUnit}
                      <br />
                    </span>
                  )}
                </Card.Text>
                {item.foodNutrients && (
                  <Table>
                    <thead>
                      <tr>
                        <th>Macronutrient</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.foodNutrients
                        .filter(
                          (nutrient) =>
                            nutrient.nutrientId === 1003 ||
                            nutrient.nutrientId === 1004 ||
                            nutrient.nutrientId === 1005 ||
                            nutrient.nutrientId === 1008
                        )
                        .map((nutrient) => (
                          <tr>
                            <td>{nutrient.nutrientName}</td>
                            <td>
                              {nutrient.value} {nutrient.unitName}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                )}
                <Button variant="dark">Select</Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}

export default FoodPage;
