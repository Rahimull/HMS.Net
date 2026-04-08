import {Route, Routes} from "react-router-dom";
import Dashbord from './pages/Dashbord';
import PatientPage from './pages/PatientPage';
import Layout from "./components/layout/Layout";
import DepartmentPage from "./pages/DepartmentPage";
import AppointmentPage from "./pages/AppointmentPage";
import MedicalRecordPage from "./pages/MedicalRecordPage";
import ReceptionDoctorPage from "./pages/RecepationDoctorPage";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route path="/dashboard" element={<Dashbord />} />
      <Route path="/patient" element={<PatientPage />} />
      <Route path="/department" element={<DepartmentPage />} />
      <Route path="/appointment" element={<AppointmentPage />} />
      <Route path="/medicalRecord" element={<MedicalRecordPage />} />
      <Route path="/receptionDoctor" element={<ReceptionDoctorPage />} />
    </Routes>
  )

  
}

export default App
