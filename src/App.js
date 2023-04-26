import React from "react";
import { useEffect, useState } from "react";
import "./styles.css";
import moment from "moment-timezone";
import "moment/locale/pt-br";
import Accordion from "./components/accordion";

export default function App() {
  
  //Clock
  moment.tz.setDefault("America/Sao_Paulo");
  moment.locale("pt-br");
  const now = moment();
  const [formattedTime] = useState(now.format("dddd, DD [de] MMM"));

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

  const [trash, setTrash] = useState([]);

  useEffect(() => {
    const storedTrash = JSON.parse(localStorage.getItem("trash"));
    console.log("Trash from localStorage:", storedTrash);
    if (storedTrash) {
      setTrash(storedTrash);
    }
  }, []);

  const handleRemove = (index) => {
    const newData = [...data];
    const removed = newData.splice(index, 1);
    setData(newData);
    setTrash([...trash, removed[0]]);
    localStorage.setItem("data", JSON.stringify(newData));
    localStorage.setItem("trash", JSON.stringify([...trash, removed[0]]));
    console.log(
      "Trash in localStorage:",
      JSON.parse(localStorage.getItem("trash"))
    );
  };

  const handleRestore = (index) => {
    const newTrash = [...trash];
    const removed = newTrash.splice(index, 1);
    setTrash(newTrash);
    setData([...data, removed[0]]);
    localStorage.setItem("trash", JSON.stringify(newTrash));
    localStorage.setItem("data", JSON.stringify([...data, removed[0]]));
  };

  const handleRemoveFromLocalStorage = (id) => {
    const storedData = JSON.parse(localStorage.getItem("data")) || [];
    const storedTrash = JSON.parse(localStorage.getItem("trash")) || [];

    const newData = storedData.filter((item) => item.id !== id);
    const newTrash = storedTrash.filter((item) => item.id !== id);

    localStorage.setItem("data", JSON.stringify(newData));
    localStorage.setItem("trash", JSON.stringify(newTrash));
  };

  const handleUniqueRemove = (id) => {
    handleRemoveFromLocalStorage(id);
  };

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
              {data.map((item, index) => {
                const key =
                  item.title + "-" + item.time + "-" + item.description;
                return (
                  <div className="taskContainer" key={key}>
                    <button
                      id="none-checked"
                      onClick={() => handleRemove(index)}
                    >
                      <img src="./images/Vector.svg" />
                    </button>
                    <div className="texts">
                      <Accordion
                        title={`${item.title} ${item.time}`}
                        content={item.description}
                        className="accordion-item"
                      />
                    </div>
                    <form className="unique-remove">
                      <button
                        type="submit"
                        onClick={() => handleUniqueRemove(item.id)}
                      >
                        <img src="./images/trash.svg" />
                      </button>
                    </form>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="box hint-bx">
            <h2>Dica</h2>
            <p>
              Divida seu "projeto” em todas as tarefas que serão necessárias, de
              preferencia pequenas tarefas.
              <br />
              <br />
              Tarefas grandes causam maior estresse mental.
            </p>
            <div className="image-container">
              <img src="./images/help_image.svg" />
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
                maxlength="15"
              />
              <input
                type="text"
                value={newDescription}
                onChange={(event) => setNewDescription(event.target.value)}
                placeholder="descrição"
                maxlength="30"
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
            <div className="done-header">
              <h2>Tarefas feitas</h2>
            </div>
            <div>
              {trash.map((item, index) => {
                const key =
                  item.title + "-" + item.time + "-" + item.description;
                return (
                  <div className="taskContainer" key={key}>
                    <button
                      id="none-checked"
                      onClick={() => handleRestore(index)}
                    >
                      <img src="./images/Vector-checked.svg" />
                    </button>
                    <div className="texts">
                      <Accordion
                        title={`${item.title} ${item.time}`}
                        content={item.description}
                        className="accordion-item"
                      />
                    </div>
                    <form className="unique-remove">
                      <button
                        type="submit"
                        onClick={() => handleUniqueRemove(item.id)}
                      >
                        <img src="./images/trash.svg" />
                      </button>
                    </form>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
