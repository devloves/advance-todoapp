import React from "react";
import * as Icon from "react-feather";

function Task({ data, handleDragging, handleDelete }) {
  const backgroundColor =
    data.status === "To-Do"
      ? "border-red-400"
      : data.status === "Doing"
      ? "border-yellow-400"
      : "border-green-400";

  const handleDragStart = (e) => {
    e.dataTransfer.setData("text", `${data.id}`);
    handleDragging(true);
  };
  const handleDragEnd = () => handleDragging(false);

  return (
    <div
      className={`flex m-2 items-center space-x-3 p-3 rounded-md bg-gray-100 border border-l-4 ${backgroundColor}`}
      draggable
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <div className="flex flex-auto">
        <h3 className="w-full text-sm font-medium text-left">{data.name}</h3>
        <Icon.X onClick={() => handleDelete(data.id)} className="text-gray-400 hover:text-red-500"/>
      </div>
    </div>
  );
}

export default Task;
