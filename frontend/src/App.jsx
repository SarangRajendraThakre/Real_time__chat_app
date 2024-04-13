import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Chat from "./pages/Chat";
import Register from "./pages/Register";
import Login from "./pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import NavBar from "./components/NavBar";
import { AuthContext } from "./context/AuthContext";
import MainCompile from "./pages/MainCompile";

const App = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
    
     
        <Routes> <Route
                path="/"
                element={user ? <MainCompile /> : <Navigate to="/login" />}
              />
              
          <Route path="/chat" element={<Chat/>} />
        
          <Route path="/register" element={user ? <MainCompile /> : <Register />} />
          <Route path="/login" element={user ? <MainCompile /> : <Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    
    </>
  );
};

export default App;
