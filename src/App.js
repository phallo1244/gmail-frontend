import './App.css';
import SignIn  from './screens/Signin';
import SignUp  from './screens/Signup';
import Dashboard  from './screens/Dashboard';
import Sent  from './screens/Sent';
import Compose  from './screens/Compose';
import {BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sent" element={<Sent />} />
          <Route path="/compose" element={<Compose />} />
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
