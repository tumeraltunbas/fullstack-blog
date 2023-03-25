import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from './components/Pages/Layout';
import Index from './components/Pages/Index';
import RegisterPage from './components/Pages/Register';
import { UserProvider } from './components/Context/UserContext';

function App() {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <Routes>
              <Route element={<Layout />}>
                <Route index element={<Index />}/>
                <Route path="/register" element={<RegisterPage />}/>
              </Route>
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
