import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './LoginPage';
//import { BrowserRouter, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//import ForgotPassword from './pages/ForgotPassword';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LoginPage />
      </header>
    </div>
  );
}

export default App;
