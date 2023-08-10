import React from 'react';
import SigninPage from './pages/loginPage';
import SignupPage from './pages/signupPage';
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
       </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
