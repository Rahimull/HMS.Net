import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";

import Dashbord from "@/pages/Dashbord";
import PatientPage from "@/Modules/Reception/Pages/PatientPage";
import PatientAppointmentUi from "@/Modules/Reception/Pages/PatientAppointmentUi";
import DepartmentPage from "@/pages/DepartmentPage";

import AppointmentPage from "@/Modules/Reception/Pages/AppointmentPage";
import MedicalRecordPage from "@/Modules/Reception/Pages/MedicalRecordPage";

import DoctorPage from "@/Modules/Doctor/Pages/DoctorPage";
import ConsultationPage from "@/Modules/Doctor/Pages/ConsultationPage";
import DiagnosisPage from "@/Modules/Doctor/Pages/DiagnosisPage";
import PrescriptionPage from "@/Modules/Doctor/Pages/PrescriptionPage";
import PrescriptionDetailsPage from "@/Modules/Doctor/Pages/PrescriptionDetailePage";
import SchedulesPage from "@/Modules/Doctor/Pages/SchedulePage";

import { EmployeePage, PayrollPage, ShiftPage } from "@/Modules/HR/Pages";
import { InvoiceDetailsPage, InvoicePage, PaymentPage } from "@/Modules/Finance/Pages";
import { ItemPage, ItemStockPage, PuchasePage, SuplierPage, PuchaseDetailsPage } from "@/Modules/Store/Pages";
import { MedicinesPage, MedicineStockPage, PharmacySalePage, PharmacySaleDetailsPage } from "@/Modules/Pharmacy/Pages";

import AppointmentsUi from "./Modules/Reception/Pages/AppointmentsUI";
import PharmacyPageUi from "./Modules/Pharmacy/Pages/PharmacyPageUi";

// Store
import PurchasesUi from "./Modules/Store/Pages/PurchasesUi";
import StockManagement from "./Modules/Store/Pages/StockManagement";
import CategoryPage from "./Modules/Common/Pages/CategoryPage";
import UnitPage from "./Modules/Common/Pages/UnitPage";
import CurrentStockPage from "./Modules/Store/Pages/CurrentStockPage"

export default function App() {
  return (
    <Routes>
      {/* ✅ Layout Parent */}
      <Route path="/" element={<Layout />}>
        {/* ✅ Dashboard inside Outlet */}
        <Route index element={<Dashbord />} />

        {/* optional /dashboard */}
        <Route path="dashboard" element={<Navigate to="/" replace />} />
        <Route path="unit" element={<UnitPage />} />
        <Route path="category" element={<CategoryPage />} />

        {/* Reception */}
        <Route path="patient" element={<PatientPage />} />
        <Route path="patientAppointmentUi" element={<PatientAppointmentUi />} />
        <Route path="department" element={<DepartmentPage />} />


        <Route path="appointmentsUi" element={<AppointmentsUi />} />
        <Route path="appointment" element={<AppointmentPage />} />
        
        <Route path="medicalrecord" element={<MedicalRecordPage />} />

        {/* Doctors */}
        <Route path="doctors" element={<DoctorPage />} />
        <Route path="consultations" element={<ConsultationPage />} />
        <Route path="diagnosis" element={<DiagnosisPage />} />
        <Route path="prescription" element={<PrescriptionPage />} />
        <Route path="prescriptiondetails" element={<PrescriptionDetailsPage />} />
        <Route path="schedule" element={<SchedulesPage />} />

        {/* HR */}
        <Route path="hr/employees" element={<EmployeePage />} />
        <Route path="hr/payroll" element={<PayrollPage />} />
        <Route path="hr/shifts" element={<ShiftPage />} />

        {/* Finance */}
        <Route path="finance/invoices" element={<InvoicePage />} />
        <Route path="finance/invoice-details" element={<InvoiceDetailsPage />} />
        <Route path="finance/payments" element={<PaymentPage />} />

        {/* Store */}
        <Route path="store/StockManagement" element={<StockManagement />} />
        <Route path="store/items/:id" element={<StockManagement />} />
        <Route path="store/PurchasesUi" element={<PurchasesUi />} />
        <Route path="store/items" element={<ItemPage />} />
        <Route path="store/item-stocks" element={<ItemStockPage />} />
        <Route path="store/purchases" element={<PuchasePage />} />
        <Route path="store/purchase-details" element={<PuchaseDetailsPage />} />
        <Route path="store/suppliers" element={<SuplierPage />} />
        <Route path="store/currentstock" element={<CurrentStockPage />} />

        {/* Pharmacy */}
        <Route path="pharmacy/PharmacyPageUi" element={<PharmacyPageUi />} />
        <Route path="pharmacy/medicines" element={<MedicinesPage />} />
        <Route path="pharmacy/medicine-stocks" element={<MedicineStockPage />} />
        <Route path="pharmacy/sales" element={<PharmacySalePage />} />
        <Route path="pharmacy/sale-details" element={<PharmacySaleDetailsPage />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<div className="p-6">Not Found</div>} />
    </Routes>
  );
}