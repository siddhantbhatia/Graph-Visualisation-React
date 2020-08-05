import React, { useState } from "react";
import BarChart from "react-bar-chart";

import "./App.css";

function App() {
  const [data, setData] = useState([
    { text: "Man", value: 500 },
    { text: "Woman", value: 300 },
  ]);

  const [date, setDate] = useState("");
  const [count, setCount] = useState(NaN);

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
          width={500}
          height={500}
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
