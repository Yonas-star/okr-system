import React from "react";

function OKRPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Company OKRs</h1>

      <div className="border p-4 mb-4">
        <h2 className="font-bold">Objective: Increase User Growth</h2>
        <ul className="list-disc ml-6">
          <li>KR1: Reach 10,000 users</li>
          <li>KR2: Improve retention to 80%</li>
        </ul>
      </div>
    </div>
  );
}

export default OKRPage;
