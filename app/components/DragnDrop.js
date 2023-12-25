import React, { useState, useEffect } from "react";
import * as Icon from "react-feather";
import TaskContainer from "./TaskContainer";
import Loading from "./Loading";

const types = ["To-Do", "Doing", "Done"];

function DragnDrop({ userId }) {
  const [isDragging, setIsDragging] = useState(false);
  const [listItems, setListItems] = useState([]);
  const [isReady, setIsReady] = useState(true);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    fetch(`/api/items/${userId}`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        console.log("hi");
        setListItems(res.message);
        setIsReady(false);
      })
      .catch((error) => {
        console.error("Error fetching user's Task:", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const id = listItems.length ? listItems[listItems.length - 1].id + 1 : 1;

      const response = await fetch(`/api/items/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, userId, name: newItem, status: "To-Do" }),
      });

      if (response.ok) {
        const newTask = await response.json();
        console.log("Task added successfully!");

        fetch(`/api/items/${userId}`, { method: "GET" })
          .then((response) => response.json())
          .then((res) => setListItems(res.message));
      } else {
        const errorData = await response.json();
        console.error("Error creating task:", errorData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
      
      const response = await fetch(`/api/items/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        console.log("Task Removed successfully!");
        fetch(`/api/items/${userId}`, { method: "GET" })
          .then((response) => response.json())
          .then((res) => setListItems(res.message));
      } else {
        const errorData = await response.json();
        console.error("Error updating task status:", errorData);
      }
  };

  const handleDragging = (dragging) => setIsDragging(dragging);

  const handleUpdateList = async (id, status) => {
    let card = listItems.find((item) => item.id === id);

    if (card && card.status !== status) {
      const response = await fetch(`/api/items/${card.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        console.log("Task status updated successfully!");
        fetch(`/api/items/${userId}`, { method: "GET" })
          .then((response) => response.json())
          .then((res) => setListItems(res.message));
      } else {
        const errorData = await response.json();
        console.error("Error updating task status:", errorData);
      }
    }
  };

  return isReady ? (
    <Loading />
  ) : (
    <div className="w-full h-full p-5 text-center">
      <div className="flex pb-2 items-center justify-center">
        <h1 className="w-full text-start text-gray-300 font-medium text-3xl mb-2">
          Total No. of Tasks: {listItems.length}
        </h1>
        <div className="border shadow-lg border-zinc-400 flex mh-xs w-full mx-1 rounded bg-slate-200">
          <input
            className="w-full border-none bg-transparent px-4 py-1 text-gray-400 outline-none focus:outline-none "
            type="search"
            name="search"
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Type your task.."
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="m-2 rounded bg-slate-600 px-4 py-2 text-white"
          >
            <Icon.Plus />
          </button>
        </div>
      </div>
      <div className="h-full grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {types.map((container) => (
          <TaskContainer
            status={container}
            handleUpdateList={handleUpdateList}
            key={container}
            items={listItems}
            handleDelete={handleDelete}
            isDragging={isDragging}
            handleDragging={handleDragging}
          />
        ))}
      </div>
    </div>
  );
}

export default DragnDrop;
