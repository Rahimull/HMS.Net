import {Route, Routes} from "react-router-dom";
import Dashbord from './pages/Dashbord';
import PatientPage from './pages/PatientPage';
import Layout from "./components/layout/Layout";
import DepartmentPage from "./pages/DepartmentPage";
import AppointmentPage from "../src/Modules/Reception/Pages/AppointmentPage";
import MedicalRecordPage from "../src/Modules/Reception/Pages/MedicalRecordPage";
import DoctorPage from "./Modules/Doctor/Pages/DoctorPage";
import ConsultationPage from "./Modules/Doctor/Pages/ConsultationPage";
import DiagnosisPage from "./Modules/Doctor/Pages/DiagnosisPage";
import PrescriptionPage from "./Modules/Doctor/Pages/PerscriptionPage"
import PrescriptionDetailsPage from "./Modules/Doctor/Pages/PrescriptionDetailsPage"
import SchedulesPage from "./Modules/Doctor/Pages/SchedulesPage"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route path="/dashboard" element={<Dashbord />} />
      <Route path="/patient" element={<PatientPage />} />
      <Route path="/department" element={<DepartmentPage />} />
      <Route path="/appointment" element={<AppointmentPage />} />
      <Route path="/medicalRecord" element={<MedicalRecordPage />} />
      <Route path="/doctors" element={<DoctorPage />} />
      <Route path="/consultations" element={<ConsultationPage />} />
      <Route path="/diagnosis" element={<DiagnosisPage />} />
      <Route path="/prescription" element={<PrescriptionPage />} />
      <Route path="/prescriprtionDetails" element={<PrescriptionDetailsPage />} />
      <Route path="/schedule" element={<SchedulesPage />} />
    </Routes>
  )

  
}

export default App
