import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import TodoList from './components/TodoList';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/to-do" element={<TodoList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;