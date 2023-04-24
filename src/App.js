import React from "react";
import { useEffect, useState } from "react";
import "./styles.css";
import moment from "moment-timezone";
import "moment/locale/pt-br";
import Accordion from "./components/accordion";
import TaskCreator from "./components/taskCreator";

export default function App() {
  moment.tz.setDefault("America/Sao_Paulo");
  moment.locale("pt-br");
  const now = moment();
  const [formattedTime, setFormattedTime] = useState(
    now.format("dddd, DD [de] MMM")
  );

  useEffect(() => {
    // White part movement effect
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
    //to-do to done effect
    const cardMovement = document.querySelector(".sendTaskBtn");
    cardMovement.onclick = function () {
      listBx.classList.add("active");
    };
  }, []);

  // To do list part
  const [data, setData] = useState(() => {
    const storedData = localStorage.getItem("data");
    return storedData ? JSON.parse(storedData) : [];
  });
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newTime, setNewTime] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setData([
      ...data,
      { title: newTitle, time: newTime || "", description: newDescription },
    ]);
    setNewTitle("");
    setNewDescription("");
    setNewTime("");
    localStorage.setItem(
      "data",
      JSON.stringify([
        ...data,
        { title: newTitle, time: newTime || "", description: newDescription },
      ])
    );
  };

  //Preview Logic

  return (
    <div className="App">
      <h1 id="clock">{formattedTime}</h1>
      <div className="container">
        <div className="bg-bx">
          <div className="box your-todo">
            <div id="your-todo-header">
              <h2>Suas Tarefas</h2>
              <button className="addBtn">
                <img src="./images/add.svg" />
              </button>
            </div>
            <div>
              {data.map((item) => {
                const key =
                  item.title + "-" + item.time + "-" + item.description;
                return (
                  <div className="taskContainer" key={key}>
                    <button id="none-checked">
                      <img src="./images/Vector.svg" />
                    </button>
                    <div className="texts">
                      <Accordion
                        title={`${item.title} ${item.time}`}
                        content={item.description}
                        className="accordion-item"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="box preview-bx">
            <h2>Preview</h2>
          </div>
              {/* <TaskCreator/> */}
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
                maxlength="15"
              />
              <input
                type="text"
                value={newDescription}
                onChange={(event) => setNewDescription(event.target.value)}
                placeholder="descrição"
              />
              <input
                type="time"
                value={newTime}
                onChange={(event) => setNewTime(event.target.value)}
              />
              <button type="submit" className="sendTaskBtn">
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
    </div>
  );
}
