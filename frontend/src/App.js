import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from './components/Pages/Layout';
import Index from './components/Pages/Index';
import RegisterPage from './components/Pages/Register';
import { UserProvider } from './components/Context/UserContext';
import LoginPage from './components/Pages/Login';
import Logout from './components/Pages/Logout';
import ChangePasswordPage from './components/Pages/ChangePassword';
import ForgotPasswordPage from './components/Pages/ForgotPassword';
import ResetPasswordPage from './components/Pages/ResetPassword';
import NotFoundPage from './components/Pages/NotFound';

function App() {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <Routes>
              <Route element={<Layout />}>
                <Route index element={<Index />}/>
                <Route path="/register" element={<RegisterPage />}/>
                <Route path="/login" element={<LoginPage />}/>
                <Route path="/logout" element={<Logout />}/>
                <Route path="/changePassword" element={<ChangePasswordPage />}/>
                <Route path="/forgotPassword" element={<ForgotPasswordPage />}/>
                <Route path="/resetPassword" element={<ResetPasswordPage />}/>
                <Route path="*" element={<NotFoundPage />}/>
              </Route>
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
