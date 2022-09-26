import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Navbar from "./Navbar";

function App() {
  const [travelto, setTravelto] = useState("");
  const [travelfrom, setTravelfrom] = useState(0);
  const [traveldate, setTraveldate] = useState("");

  const [busList, setBusList] = useState([]);

  const getBuses = () => {
    Axios.get("http://127.0.0.1:3001/buses", {
      travelfrom: travelfrom,
      travelto: travelto,
      traveldate: traveldate,
    }).then((response) => {
      setBusList(response.data);
    });
  };

  return (
    <div className="App">
      <Navbar />
      <hr></hr>
      <div className="information">
        <label>From:</label>
        <input
          type="text"
          onChange={(event) => {
            setTravelfrom(event.target.value);
          }}
        />
      </div>
      <div className="information">
        <label>To:</label>
        <input
          type="text"
          onChange={(event) => {
            setTravelto(event.target.value);
          }}
        />
      </div>
      <div className="information">
        <label>Date:</label>
        <input
          type="date"
          onChange={(event) => {
            setTraveldate(event.target.value);
          }}
        />
      </div>
      <div className="information">
      
        <button onClick={getBuses}>Show buses</button>

        {busList.map((val, key) => {
          return (
            <div className="bus">
              <div>
                <h3>Name: {val.name}</h3>
                <h3>Departure: {val.departure}</h3>
                <h3>Arrival: {val.arrival}</h3>
                <h3>Available seats: {val.available}</h3>
                <h3>Price: {val.price}</h3>
              </div>
            </div>
          );
        })}

      </div>
      <div className="buses">
      </div>
    </div>
  );
}

export default App;