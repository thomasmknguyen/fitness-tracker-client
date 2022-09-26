import React, { useState } from "react";
import fetch from "node-fetch";
import Axios from "axios";

function Get() {
  const [data, setData] = useState([]);
  /* const [firstName, setFirst] = useState("Thomas");
  const [lastName, setLast] = useState("Nguyen"); */
  const getData = async () => {
    const params = {
      api_key: "AF88tCV1yTihPj5g6hqRg6VYzgESSGdwfqvQetQH",
      query: "cheddar cheese",
      pageSize: 25,
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
        setData(json);
      });
  };

  const clearData = () => {
    setData([]);
  };

  /* const queryToDatabase = async () => {
    await Axios.post("http://localhost:3000/api/insert", {
      userId: 1,
      firstName: firstName,
      lastName: lastName,
    }).then(() => {
      console.log("successful query");
    });
  }; */

  return (
    <div>
      <button onClick={getData}>Fetch API Data</button>
      <button onClick={clearData}>Clear Data</button>
      <button /* onClick={queryToDatabase} */>Query to Database</button>
      {data.length !== 0 && (
        <ul>
          {data.foods.map((item) => (
            <li key={item.fdcId}>
              {`${item.description},
                ${item.brandName},
                ${item.ingredients}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Get;
