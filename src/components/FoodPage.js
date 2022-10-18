import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import DatePicker from "./DatePicker";
import FoodSearchForm from "./FoodSearchForm";
import Axios from "axios";

function FoodPage() {
  const [searching, setSearching] = useState(false);
  const [meal, setMeal] = useState("Meal");
  const [foodQuery, setFoodQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [pageNumber, setPageNumber] = useState([1]);
  const [loading, setLoading] = useState(false);
  const [selecting, setSelecting] = useState(false);

  const [userId, setUserId] = useState(1);
  const [dayId, setDayId] = useState(1);
  const [mealId, setMealId] = useState(1);

  const [selectedFood, setSelectedFood] = useState([
    { servingSize: 0, foodNutrients: { value: 0 } },
  ]);
  const [foodName, setFoodName] = useState("");
  const [serving, setServing] = useState(0);
  const [calories, setCalories] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [protein, setProtein] = useState(0);
  const [fat, setFat] = useState(0);

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
    setSelectedFood(item);
    setFoodName(item.description);
    setSelecting(true);
    setSearchResults([]);
  };

  const handleServingSizeChange = (event) => {
    if (event.target.value === undefined) {
      return;
    }
    setServing(parseInt(event.target.value));

    for (let i = 0; i < selectedFood.foodNutrients.length; i++) {
      if (selectedFood.foodNutrients[i].nutrientId === 1008) {
        setCalories(
          Math.round(event.target.value * selectedFood.foodNutrients[i].value) /
            100
        );
      }
      if (selectedFood.foodNutrients[i].nutrientId === 1005) {
        setCarbs(
          Math.round(event.target.value * selectedFood.foodNutrients[i].value) /
            100
        );
      }
      if (selectedFood.foodNutrients[i].nutrientId === 1003) {
        setProtein(
          Math.round(event.target.value * selectedFood.foodNutrients[i].value) /
            100
        );
      }
      if (selectedFood.foodNutrients[i].nutrientId === 1004) {
        setFat(
          Math.round(event.target.value * selectedFood.foodNutrients[i].value) /
            100
        );
      }
    }
  };

  const handleAddFood = async (event) => {
    event.preventDefault();
    /* await getDay(); */
    /* await getMeal(); */
    await addFood();
    console.log("handle add food done");
  };

  const getDay = async (event) => {
    await Axios.post("http://localhost:4000/api/get/day", {
      userId: userId,
      date: date,
    })
      .then((response) => {
        if (response.data.error === true) {
          console.log(response.data.message);
        } else {
          // got day id
          setDayId(response.data.dayId.dayId);
          console.log("got day");
        }
      })
      .catch((error) => {
        //if (error.code === "ERR_NETWORK")
        console.log(error);
      });
  };

  const getMeal = async (event) => {
    await Axios.post("http://localhost:4000/api/get/meal", {
      dayId: dayId,
      meal: meal,
    })
      .then((response) => {
        if (response.data.error === true) {
          console.log(response.data.message);
        } else {
          // got meal id
          setMealId(response.data.mealId.mealId);
          console.log("got meal!");
        }
      })
      .catch((error) => {
        //if (error.code === "ERR_NETWORK")
        console.log(error);
      });
  };

  const addFood = async (event) => {
    await Axios.post("http://localhost:4000/api/add/food", {
      userId: userId,
      foodName: foodName,
      serving: serving,
      calories: calories,
      carbs: carbs,
      protein: protein,
      fat: fat,
      mealId: mealId,
    })
      .then((response) => {
        if (response.data.error === true) {
          console.log(response.data.message);
        } else {
          // food add successful
          console.log("food done!");
        }
      })
      .catch((error) => {
        //if (error.code === "ERR_NETWORK")
        console.log(error);
      });
  };

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
                aria-required
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
              handleFoodSubmit={handleFoodSubmit}
              foodQuery={foodQuery}
              setFoodQuery={setFoodQuery}
              loading={loading}
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
        <Card key={selectedFood.fdcId} className="text-center">
          <Card.Header>{selectedFood.description}</Card.Header>
          <Card.Body>
            <Card.Text>
              Id: {selectedFood.fdcId}
              <br />
              {selectedFood.brandOwner && (
                <span>
                  Brand: {selectedFood.brandOwner}
                  <br />
                </span>
              )}
              {selectedFood.packageWeight && (
                <span>
                  Package Weight: {selectedFood.packageWeight}
                  <br />
                </span>
              )}
              <span>
                {selectedFood.servingSize
                  ? `Serving Size: ${
                      Math.round(selectedFood.servingSize * 100) / 100
                    } ${selectedFood.servingSizeUnit}`
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
                {selectedFood.foodNutrients
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
                        {selectedFood.servingSize
                          ? Math.round(
                              nutrient.value * selectedFood.servingSize
                            ) / 100
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
                  value={serving}
                  onChange={handleServingSizeChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Calories:</Form.Label>
                <Form.Control type="number" value={calories} disabled />
              </Form.Group>
              <Button variant="dark" type="submit">
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
