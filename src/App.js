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
          <form>
            <input type="text" name="title" placeholder="Título" />
            <input type="text" name="description" placeholder="Descrição" />
            <button>
              <img src="./images/send.svg" />
            </button>
          </form>
        </div>
        <div className="done-todo">
          <h2>Tarefas feitas</h2>
        </div>
      </div>
    </div>
  );
}
