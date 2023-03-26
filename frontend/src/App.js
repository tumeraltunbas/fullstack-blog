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
import { ErrorProvider } from './components/Context/ErrorContext';
import CreatePostPage from './components/Pages/CreatePost';

function App() {
  return (
    <>
      <BrowserRouter>
        <ErrorProvider>
          <UserProvider>
            <Routes>
                <Route element={<Layout />}>
                  <Route index element={<Index />}/>
                  <Route path="/auth">
                      <Route path="register" element={<RegisterPage />}/>
                      <Route path="login" element={<LoginPage />}/>
                      <Route path="logout" element={<Logout />}/>
                      <Route path="changePassword" element={<ChangePasswordPage />}/>
                      <Route path="forgotPassword" element={<ForgotPasswordPage />}/>
                      <Route path="resetPassword" element={<ResetPasswordPage />}/>
                  </Route>

                  <Route path="/post">
                    <Route path="create" element={<CreatePostPage />}/>
                  </Route>
                  
                  <Route path="*" element={<NotFoundPage />}/>
                </Route>
            </Routes>
          </UserProvider>
        </ErrorProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
