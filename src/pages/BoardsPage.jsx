import React from "react";
import { Link } from "react-router-dom";

function BoardsPage() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Boards</h1>
      <Link to="/board">Open Demo Board</Link>
    </div>
  );
}

export default BoardsPage;
