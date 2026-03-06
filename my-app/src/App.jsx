import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Practice from "./practice";
import TaskInput from "./practice/AddTask";
import Tasks from "./practice/Tasks";
const App = () => {
  return (
    <div>
      <h2 className="mt-5 text-2xl text-center text-blue-500 font-bold">
        Plan your day!
      </h2>
      <p className="text-center text-gray-400 mb-5">
        Add tasks and manage your schedule
      </p>

      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Practice />} /> */}
          <Route path="/create" element={<TaskInput />} />
          <Route path="/" element={<Tasks />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
