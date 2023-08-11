import React from 'react';
import SigninPage from './pages/loginPage';
import SignupPage from './pages/signupPage';
import TodoPage from './pages/todoPage'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/signin"
            element={
              <SigninPage/>
            }
          />
          <Route
            path="/signup"
            element={
              <SignupPage/>
            }
          />
          <Route
            path="/todo"
            element={
              <TodoPage/>
            }
          />
       </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
