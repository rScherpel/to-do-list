import React from "react";
import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  
  // White part movement effect
  useEffect(() => {
    const yourList = document.querySelector(".addBtn");
    const doneList = document.querySelector(".gobackBtn");
    const listBx = document.querySelector(".listBx");
    const body = document.querySelector("body");
    yourList.onclick = function () {
      listBx.classList.add("active");
      body.classList.add("active");
    };
    doneList.onclick = function () {
      listBx.classList.remove("active");
      body.classList.remove("active");
    };
  }, []);

  // To do list part
  const [data, setData] = useState(() => {
    const storedData = localStorage.getItem("data");
    return storedData ? JSON.parse(storedData) : [];
  });
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setData([...data, { title: newTitle, description: newDescription }]);
    setNewTitle();
    setNewDescription();
    localStorage.setItem("data", JSON.stringify([...data, { title: newTitle, description: newDescription }]));
  };
  return (
    <div className="container">
      <div className="bg-bx">
        <div className="box your-todo">
          <h2>Suas Tarefas</h2>
          <button className="addBtn">
            <img src="./images/add.svg" />
          </button>
        </div>
        <div className="box preview-bx">
          <h2>Preview</h2>
          <div>
            {data.map((item, index) => {
              const key = item.title + "-" + item.description;
              return (
                <div className="taskContainer" key={key}>
                  <p className="Title">{item.title}</p>
                  <p className="description">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="listBx">
        <div className="form make-todo">
          <div id="header-btn">
            <button className="gobackBtn">
              <img src="./images/arrow-left.svg" />
            </button>
          </div>
          <div id="header-title">
            <h2>Criar Tarefa</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={newTitle}
              onChange={(event) => setNewTitle(event.target.value)}
              placeholder="Titulo"
            />
            <input
              type="text"
              value={newDescription}
              onChange={(event) => setNewDescription(event.target.value)}
              placeholder="descrição"
            />
            {/* <input type="time" name="date" /> */}
            <button type="submit" id="sendTaskBtn">
              <img src="./images/send.svg" />
            </button>
          </form>
        </div>
        <div className="done-todo">
          <h2>Tarefas feitas</h2>
          <button></button>
        </div>
      </div>
    </div>
  );
}
