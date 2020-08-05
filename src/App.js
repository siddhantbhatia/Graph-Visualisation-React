import React, { useState, useEffect } from "react";
import BarChart from "react-bar-chart";

import "./App.css";

function App() {
  const [data, setData] = useState([]);

  const [date, setDate] = useState("");
  const [count, setCount] = useState(NaN);

  useEffect(() => {
    fetch("http://localhost:3001/getData")
      .then((response) => response.json())
      .then((responseJson) => {
        // convert data from api to data required by graph object
        var tempData = responseJson.map((object) => {
          return {
            text: object.date,
            value: object.count,
          };
        });

        console.log(tempData);
        setData(tempData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); // to avoid tracking changes and thus avoid getting into infinite render

  // measurement for the graph window
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };

  const handleBarClick = (element, id) => {
    console.log(`The bin ${element.text} with id ${id} was clicked`);
  };

  const handleDateInput = (e) => {
    setDate(e.target.value);
  };

  const handleCountInput = (e) => {
    setCount(parseInt(e.target.value, 10));
  };

  const handleDataSubmit = (e) => {
    if (isNaN(count)) {
      alert("Invalid Count format! It should be a positive integer");
      e.preventDefault();
      return;
    }
    let newData = [...data];
    newData.push({
      text: date,
      value: count,
    });

    console.log(newData);

    setData(newData);
    e.preventDefault();
  };

  return (
    <div className="App">
      <h1>React Graph Visualiser</h1>
      <div style={{ width: "50%" }}>
        <BarChart
          ylabel="Quantity"
          width={600}
          height={600}
          margin={margin}
          data={data}
          onBarClick={handleBarClick}
        />
      </div>
      <form onSubmit={handleDataSubmit}>
        <label>
          Date <input type="text" onChange={handleDateInput}></input>
        </label>
        <label>
          Count <input type="text" onChange={handleCountInput}></input>
        </label>
        <input type="Submit" value="Add Data"></input>
      </form>
    </div>
  );
}

export default App;
