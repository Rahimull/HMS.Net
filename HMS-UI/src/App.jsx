import {Route, Routes} from "react-router-dom";
import Dashbord from './pages/Dashbord';
import PatientPage from './pages/PatientPage';
import Layout from "./components/layout/Layout";
import DepartmentPage from "./pages/DepartmentPage";
import AppointmentPage from "../src/Modules/Reception/Pages/AppointmentPage";
import MedicalRecordPage from "../src/Modules/Reception/Pages/MedicalRecordPage";
import DoctorPage from "./Modules/Doctor/Pages/DoctorPage";
import ConsultationPage from "../src/Modules/Doctor/Pages/ConsultationPage";
import DiagnosisPage from "../src/Modules/Doctor/Pages/DiagnosisPage";
import PrescriptionPage from "../src/Modules/Doctor/Pages/PrescriptionPage"
import PrescriptionDetailsPage from "../src/Modules/Doctor/Pages/PrescriptionDetailePage"
import SchedulesPage from "../src/Modules/Doctor/Pages/SchedulePage"

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
      <Route path="/prescriptionDetails" element={<PrescriptionDetailsPage />} />
      <Route path="/schedule" element={<SchedulesPage />} />
    </Routes>
  )

  
}

export default App
