import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import DatePicker from "./DatePicker";
import FoodSearchForm from "./FoodSearchForm";
import FoodResult from "./FoodResult";
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
      pageSize: 15,
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
    if (event.target.value === "") {
      setServing(event.target.value);
      setCalories(0);
      setCarbs(0);
      setProtein(0);
      setFat(0);
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
    setLoading(true);
    /* await getDay(); */
    /* await getMeal(); */
    await addFood();
    setLoading(false);
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
      <Container
        className="mt-3 w-25 justify-content-center text-center"
        style={{ maxWidth: "200px" }}
      >
        <DatePicker date={date} setDate={setDate} />
        {!searching && (
          <Button
            className="mt-3"
            variant="dark"
            onClick={() => setSearching(true)}
          >
            Add Food
          </Button>
        )}
        {searching && (
          <Form.Select
            className="mt-3"
            aria-label="Meal"
            value={meal}
            onChange={(event) => setMeal(event.target.value)}
            required
          >
            <option>Select Meal</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
          </Form.Select>
        )}
      </Container>
      {searching && (
        <Container className="mt-2 mb-2 h-100">
          <FoodSearchForm
            handleFoodSubmit={handleFoodSubmit}
            foodQuery={foodQuery}
            setFoodQuery={setFoodQuery}
            loading={loading}
            handleClear={handleClear}
          />
        </Container>
      )}
      {searchResults.length !== 0 && (
        <div className="d-flex flex-row flex-wrap justify-content-center">
          {searchResults.foods.map((foodItem) => (
            <FoodResult
              key={foodItem.fdcId}
              foodItem={foodItem}
              handleSelectFood={handleSelectFood}
              resultType={"Select"}
            />
          ))}
        </div>
      )}
      {selecting && (
        <div className="d-flex flex-row justify-content-center">
          <FoodResult
            foodItem={selectedFood}
            handleAddFood={handleAddFood}
            handleServingSizeChange={handleServingSizeChange}
            serving={serving}
            calories={calories}
            loading={loading}
            resultType={"Add"}
          />
        </div>
      )}
    </>
  );
}

export default FoodPage;
