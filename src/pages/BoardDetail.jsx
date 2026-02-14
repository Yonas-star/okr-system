import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

function BoardDetail() {
  const { tasks } = useContext(AppContext);

  const statuses = ["Todo", "In Progress", "Done"];

  return (
    <div className="flex gap-6 p-6">
      {statuses.map((status) => (
        <div key={status} className="w-1/3 bg-gray-100 p-4 rounded">
          <h2 className="font-bold mb-4">{status}</h2>
          {tasks
            .filter((task) => task.status === status)
            .map((task) => (
              <div key={task.id} className="bg-white p-2 mb-2 shadow">
                {task.title}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}

export default BoardDetail;
