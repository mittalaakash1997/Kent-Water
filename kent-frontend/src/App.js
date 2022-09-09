import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Admin from './components/Admin';
import { ToastContainer } from 'react-toastify';
import User from './components/User';
function App() {

  return (
    <>
       <BrowserRouter>
      <ToastContainer />
          <Routes>
            <Route path="/admin/*" element={<Admin />} />
            <Route path="/*" element={<User />} />
            <Route path="/login" element={<Login />} />
          </Routes>
      </BrowserRouter>
    </>
  );
}


export default App;
