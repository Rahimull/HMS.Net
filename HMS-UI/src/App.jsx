import {Route, Routes} from "react-router-dom";
import Dashbord from './pages/Dashbord';
import PatientPage from './pages/PatientPage';
import Layout from "./components/layout/Layout";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route path="/dashboard" element={<Dashbord />} />
      <Route path="/patient" element={<PatientPage />} />
    </Routes>
  )

  
}

export default App
