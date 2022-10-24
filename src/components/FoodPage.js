import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import FoodSearchForm from "./FoodSearchForm";
import FoodResult from "./FoodResult";
import Axios from "axios";

function FoodPage() {
  const [searching, setSearching] = useState(false);
  const [mealName, setMealName] = useState("Select Meal");
  const [foodQuery, setFoodQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [pageNumber, setPageNumber] = useState([1]);
  const [searchDisabled, setSearchDisabled] = useState(false);
  const [addDisabled, setAddDisabled] = useState(true);
  const [selecting, setSelecting] = useState(false);

  const [userId, setUserId] = useState(1);
  const [dayId, setDayId] = useState(0);
  const [breakfastId, setBreakfastId] = useState(0);
  const [lunchId, setLunchId] = useState(0);
  const [dinnerId, setDinnerId] = useState(0);

  const [breakfast, setBreakfast] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [dinner, setDinner] = useState([]);

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

  useEffect(() => {
    // get day id and meal ids
    Axios.post("http://localhost:4000/api/get/ids", {
      userId: userId,
      date: date,
    })
      .then((response) => {
        setDayId(response.data.dayId);
        setBreakfastId(response.data.breakfastId);
        setLunchId(response.data.lunchId);
        setDinnerId(response.data.dinnerId);
        // get daily foods
        Axios.post("http://localhost:4000/api/get/food", {
          breakfastId: response.data.breakfastId,
          lunchId: response.data.lunchId,
          dinnerId: response.data.dinnerId,
        })
          .then((response) => {
            console.log(response.data);
            setBreakfast(response.data.breakfast);
            setLunch(response.data.lunch);
            setDinner(response.data.dinner);
          })
          .catch((error) => {
            //TODO
            console.log(error);
          });
      })
      .catch((error) => {
        // TODO
      });
  }, [userId, date]);

  const handleDateChange = async (event) => {
    setDate(event.target.value);
  };

  // TODO
  const handleFoodSearch = async (event) => {
    event.preventDefault();
    // if search field is empty or is the same as previous search, don't call api
    const previousQuery = searchResults?.foodSearchCriteria?.query;
    if (foodQuery.length === 0 || previousQuery === foodQuery) return;

    setSearchDisabled(true);
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
        setSearchDisabled(false);
      });
  };

  const handleClear = () => {
    setSearchResults([]);
    setFoodQuery("");
    setMealName("Select Meal");
    setSelecting(false);
    setServing(0);
    setCalories(0);
    setCarbs(0);
    setProtein(0);
    setFat(0);
  };

  const handleSelectFood = async (item) => {
    setSelectedFood(item);
    setFoodName(item.description);
    setSelecting(true);
    setSearchResults([]);
  };

  const handleMealChange = (event) => {
    // enable add button if meal is selected
    if (
      event.target.value === "Breakfast" ||
      event.target.value === "Lunch" ||
      event.target.value === "Dinner"
    ) {
      setAddDisabled(false);
    } else {
      setAddDisabled(true);
    }
    setMealName(event.target.value);
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
    setAddDisabled(true);

    // if dayId does not exist, add day
    let tempDayId = dayId;
    if (dayId === 0) {
      await Axios.post("http://localhost:4000/api/add/day", {
        userId: userId,
        date: date,
      })
        .then((response) => {
          tempDayId = response.data.dayId;
          setDayId(response.data.dayId);
        })
        .catch((error) => {
          // TODO
          console.log(error);
        });
    }

    // get mealId
    let tempMealId;
    switch (mealName) {
      case "Breakfast":
        tempMealId = breakfastId;
        break;
      case "Lunch":
        tempMealId = lunchId;
        break;
      case "Dinner":
        tempMealId = dinnerId;
        break;
      default:
        tempMealId = 0;
        break;
    }
    // if mealId does not exist, add meal
    if (tempMealId === 0) {
      await Axios.post("http://localhost:4000/api/add/meal", {
        dayId: tempDayId,
        mealName: mealName,
      })
        .then((response) => {
          tempMealId = response.data.mealId;
          switch (mealName) {
            case "Breakfast":
              setBreakfastId(response.data.mealId);
              break;
            case "Lunch":
              setLunchId(response.data.mealId);
              break;
            case "Dinner":
              setDinnerId(response.data.mealId);
              break;
          }
        })
        .catch((error) => {
          // TODO
          console.log(error);
        });
    }

    await Axios.post("http://localhost:4000/api/add/food", {
      userId: userId,
      foodName: foodName,
      serving: serving,
      calories: calories,
      carbs: carbs,
      protein: protein,
      fat: fat,
      mealId: tempMealId,
    })
      .then((response) => {
        switch (mealName) {
          case "Breakfast":
            setBreakfast((current) => [
              ...current,
              {
                foodName: foodName,
                serving: serving,
                calories: calories,
                carbs: carbs,
                protein: protein,
                fat: fat,
              },
            ]);
            break;
          case "Lunch":
            setLunch((current) => [
              ...current,
              {
                foodName: foodName,
                serving: serving,
                calories: calories,
                carbs: carbs,
                protein: protein,
                fat: fat,
              },
            ]);
            break;
          case "Dinner":
            setDinner((current) => [
              ...current,
              {
                foodName: foodName,
                serving: serving,
                calories: calories,
                carbs: carbs,
                protein: protein,
                fat: fat,
              },
            ]);
            break;
        }
      })
      .catch((error) => {
        // TODO
        console.log(error);
      });

    setFoodQuery("");
    setMealName("Select Meal");
    setSelecting(false);
    setSearching(false);
    setServing(0);
    setCalories(0);
    setCarbs(0);
    setProtein(0);
    setFat(0);
  };

  return (
    <>
      <Container
        className="mt-3 w-25 justify-content-center text-center"
        style={{ maxWidth: "200px" }}
      >
        <Form.Control type="date" value={date} onChange={handleDateChange} />
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
            value={mealName}
            onChange={handleMealChange}
            required
          >
            <option>Select Meal</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
          </Form.Select>
        )}
      </Container>
      {!searching && breakfast.length !== 0 && (
        <div>
          <h4>Breakfast</h4>
          <Table>
            <thead>
              <tr>
                <th>Food</th>
                <th>Serving</th>
                <th>Calories</th>
                <th>Carbs</th>
                <th>Protein</th>
                <th>Fat</th>
              </tr>
            </thead>
            <tbody>
              {breakfast.map((foodItem) => (
                <tr>
                  <td>{foodItem.foodName}</td>
                  <td>{foodItem.serving}</td>
                  <td>{foodItem.calories}</td>
                  <td>{foodItem.carbs}</td>
                  <td>{foodItem.protein}</td>
                  <td>{foodItem.fat}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
      {!searching && lunch.length !== 0 && (
        <div>
          <h4>Lunch</h4>
          <Table>
            <thead>
              <tr>
                <th>Food</th>
                <th>Serving</th>
                <th>Calories</th>
                <th>Carbs</th>
                <th>Protein</th>
                <th>Fat</th>
              </tr>
            </thead>
            <tbody>
              {lunch.map((foodItem) => (
                <tr>
                  <td>{foodItem.foodName}</td>
                  <td>{foodItem.serving}</td>
                  <td>{foodItem.calories}</td>
                  <td>{foodItem.carbs}</td>
                  <td>{foodItem.protein}</td>
                  <td>{foodItem.fat}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
      {!searching && dinner.length !== 0 && (
        <div>
          <h4>Dinner</h4>
          <Table>
            <thead>
              <tr>
                <th>Food</th>
                <th>Serving</th>
                <th>Calories</th>
                <th>Carbs</th>
                <th>Protein</th>
                <th>Fat</th>
              </tr>
            </thead>
            <tbody>
              {dinner.map((foodItem) => (
                <tr>
                  <td>{foodItem.foodName}</td>
                  <td>{foodItem.serving}</td>
                  <td>{foodItem.calories}</td>
                  <td>{foodItem.carbs}</td>
                  <td>{foodItem.protein}</td>
                  <td>{foodItem.fat}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
      {searching && (
        <div className="mt-2 mb-2 text-center">
          <FoodSearchForm
            handleFoodSearch={handleFoodSearch}
            foodQuery={foodQuery}
            setFoodQuery={setFoodQuery}
            searchDisabled={searchDisabled}
            handleClear={handleClear}
          />
        </div>
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
            addDisabled={addDisabled}
            resultType={"Add"}
          />
        </div>
      )}
    </>
  );
}

export default FoodPage;
