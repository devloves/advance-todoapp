import React from "react";
import Task from "./subcomponents/task";

function TaskContainer({ status, items, isDragging, handleDragging, handleUpdateList, handleDelete }) {
  const handleDrop = (e) => {
    e.preventDefault();
    handleUpdateList(+e.dataTransfer.getData("text"), status);
    handleDragging(false);
  };
  const handleDragOver = (e) => e.preventDefault();
  return (
    <>
      <div
        className={`border border-zinc-400 rounded-lg overflow-hidden shadow-lg ${
          isDragging ? "animate-wiggle" : "bg-white"
        }`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="font-bold text-slate-400 p-1 bg-slate-200">
          {status}
        </div>
        {items.map(
          (item) =>
            status === item.status && (
              <Task data={item} key={item.id} handleDelete={handleDelete} handleDragging={handleDragging} />
            )
        )}
      </div>
    </>
  );
}

export default TaskContainer;
