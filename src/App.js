import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TodoListPage from "./pages/TodoListPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/todo" element={<TodoListPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
