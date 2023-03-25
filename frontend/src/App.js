import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from './components/Pages/Layout';
import Index from './components/Pages/Index';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Index />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
