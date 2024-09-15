import { GoogleLoginPage } from './components/google-login';
import {BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { HomePage } from './components/home-page';
import { AuthMiddleware } from './middleware/auth-middleware';
import './App.css';


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<GoogleLoginPage />} />
            <Route path="/"  element={
              <AuthMiddleware>
                <HomePage />
              </AuthMiddleware>
          } />
          
        </Routes>
      </Router>
    </>
  )
}

export default App
