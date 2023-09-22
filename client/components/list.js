import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import {
  addNewTask,
  removeTask,
  editTask,
  editTitle,
  updateTitle,
  setIsEditingTitle,
} from "../reducers/categorySlice";
import { useSelector, useDispatch } from "react-redux";
import { api } from "../utils/api";

const List = () => {
  const categories = useSelector((state) => state.categories.categories);
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    // e.preventDefault();
    // dispatch(editTask(e.target.value))
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const formcontainer = document.querySelector("#form-container");
    // Create a new form element
    const form = document.createElement("form");

    const taskNameInput = document.createElement("input");
    taskNameInput.setAttribute("type", "text");
    taskNameInput.setAttribute("name", "Task_Name"); // Avoid spaces in name attribute
    taskNameInput.setAttribute("placeholder", "Task Name");

    const assigneeInput = document.createElement("input");
    assigneeInput.setAttribute("type", "text");
    assigneeInput.setAttribute("name", "Assignee");
    assigneeInput.setAttribute("placeholder", "Assignee");

    const dueDateInput = document.createElement("input");
    dueDateInput.setAttribute("type", "text");
    dueDateInput.setAttribute("name", "Due_Date");
    dueDateInput.setAttribute("placeholder", "Due Date");

    const submitButton = document.createElement("button");
    submitButton.setAttribute("type", "submit");
    submitButton.innerHTML = "+ Add Task";

    form.append(taskNameInput);
    form.append(assigneeInput);
    form.append(dueDateInput);
    form.appendChild(submitButton);

    // Append the form to the .list-container
    formcontainer.append(form);
  };

  return (
    <>
      <div>My List</div>
      {Object.entries(categories).map((categoryid) => {
        return (
          <>
            {/* <div></div> */}
            <div className="list-container">
              <div className="headline">
                <div> {categoryid[1].name}</div>
                <div> Assignee </div>
                <div> Due Date </div>
              </div>
              <br />
            </div>

            {categoryid[1].items.map((obj, index) => {
              return (
                <>
                  <div className="list-container" key={index}>
                    <div id="form-container">
                      <form className="listform">
                        <div className="list-subcontainer">
                          {/* <div> {categoryid[1].name}</div> */}
                          <input
                            name="Task_Name"
                            type="text"
                            placeholder={obj.Task_Name}
                            defaultValue={obj.Task_Name}
                            onChange={handleInputChange}
                          ></input>
                        </div>
                        <div className="list-subcontainer">
                          {/* <div> Assignee </div> */}
                          <input
                            name="Assignee"
                            type="text"
                            placeholder={obj.Assignee}
                            defaultValue={obj.Assignee}
                            onChange={handleInputChange}
                          ></input>
                        </div>
                        <div className="list-subcontainer">
                          {/* <div> Due Date </div> */}
                          <input
                            name="Due_Date"
                            type="text"
                            placeholder={obj.Due_Date}
                            defaultValue={obj.Due_Date}
                            onChange={handleInputChange}
                          ></input>
                        </div>
                        <button type="submit" onClick={onSubmit}>
                          {" "}
                          + Add Task{" "}
                        </button>
                      </form>
                    </div>
                  </div>
                </>
              );
            })}
          </>
        );
      })}
    </>
  );
};

export default List;
