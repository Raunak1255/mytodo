import React, { useEffect, useState } from "react";
import ToDo from "./components/ToDo";
import axios from "axios";
import { baseURL } from "./utils/constant";
import Popup from "./components/Popup";

const App = () => {
  const [toDos, setToDos] = useState([]);
  const [input, setInput] = useState("");
  const [updateUI, setUpdateUI] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({});

  useEffect(() => {
    axios
      .get("https://raunaktodoapi.onrender.com/api/get", { timeout: 5000 })
      .then((res) => setToDos(res.data))
      .catch((err) => {
        console.error("Error fetching data:", err);
        if (err.response) {
          console.error("Response error:", err.response.data);
        } else if (err.request) {
          console.error("Request error:", err.request);
        } else {
          console.error("Error:", err.message);
        }
      });
  }, [updateUI]);

  const saveToDo = () => {
    axios
      .post("https://raunaktodoapi.onrender.com/api/save", { toDo: input }, { timeout: 5000 })
      .then((res) => {
        console.log(res.data);
        setUpdateUI((prevState) => !prevState);
        setInput("");
      })
      .catch((err) => {
        console.error("Error saving data:", err);
        if (err.response) {
          console.error("Response error:", err.response.data);
        } else if (err.request) {
          console.error("Request error:", err.request);
        } else {
          console.error("Error:", err.message);
        }
      });
  };

  const deleteToDo = (id) => {
    axios
      .delete(`https://raunaktodoapi.onrender.com/api/delete/${id}`, { timeout: 5000 })
      .then((res) => {
        console.log(res.data);
        setUpdateUI((prevState) => !prevState);
      })
      .catch((err) => {
        console.error("Error deleting data:", err);
        if (err.response) {
          console.error("Response error:", err.response.data);
        } else if (err.request) {
          console.error("Request error:", err.request);
        } else {
          console.error("Error:", err.message);
        }
      });
  };

  const editToDo = (id, updatedToDo) => {
    axios
      .put(`https://raunaktodoapi.onrender.com/api/edit/${id}`, { toDo: updatedToDo }, { timeout: 5000 })
      .then((res) => {
        console.log(res.data);
        setUpdateUI((prevState) => !prevState);
      })
      .catch((err) => {
        console.error("Error editing data:", err);
        if (err.response) {
          console.error("Response error:", err.response.data);
        } else if (err.request) {
          console.error("Request error:", err.request);
        } else {
          console.error("Error:", err.message);
        }
      });
  };

  return (
    <main>
      <div className="container">
        <h1 className="title">ToDo App</h1>

        <div className="input_holder">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Add a ToDo..."
          />
          <button onClick={saveToDo}>Add</button>
        </div>

        <div className="list">
          {toDos.map((el) => (
            <ToDo
              key={el._id}
              text={el.toDo}
              id={el._id}
              setUpdateUI={setUpdateUI}
              setShowPopup={setShowPopup}
              setPopupContent={setPopupContent}
              deleteToDo={deleteToDo}
              editToDo={editToDo}
            />
          ))}
        </div>
      </div>
      {showPopup && (
        <Popup
          setShowPopup={setShowPopup}
          popupContent={popupContent}
          setUpdateUI={setUpdateUI}
        />
      )}
    </main>
  );
};

export default App;
