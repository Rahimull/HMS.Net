import { createCrudApi } from "./crudApi";

export const PatientApi = createCrudApi("/patient");
export const DepartmentApi = createCrudApi("/department");
export const DoctorApi = createCrudApi("/doctor");
export const AppointmentApi = createCrudApi("/appointment");
export const MedicalRecordApi = createCrudApi("/medicalRecord");

// هر entity جدید فقط یک خط 👇
// export const XyzApi = createCrudApi("/xyz");