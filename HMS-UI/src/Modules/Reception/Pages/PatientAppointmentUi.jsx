import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Section from "@/components/common/Section";

export default function PatientAppointmentUI() {
  return (
    <>
      <Section title="Patient Info">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Patient"
            type="select"
            options={[{ label: 1, value: 1 }]}
          />
          <Input label="Patient" type="date" />
        </div>
      </Section>

      <Section title="Patient Information">
        <div className="grid grid-cols-2 gap-4">
          <Input name="firstName" label="First Name" />
          <Input name="lastName" label="Last Name" />

          <Input
            type="select"
            name="gender"
            label="Gender"
            options={[
              { label: "Male", value: 1 },
              { label: "Female", value: 2 },
            ]}
          />

          <Input type="date" name="dob" label="Date of Birth" />
          <Input name="phone" label="Phone" />
          <Input name="nationalId" label="National ID" />

          <Input type="textarea" name="address" label="Address" />
        </div>
      </Section>

      <Section title="Appointment Information">
        <div className="grid grid-cols-3 gap-4">
          <Input
            type="select"
            name="patientId"
            label="Patient"
            // options={patients}
          />

          <Input
            type="select"
            name="doctorId"
            label="Doctor"
            // options={doctors}
          />

          <Input
            type="select"
            name="departmentId"
            label="Department"
            // options={departments}
          />

          <Input type="date" name="appointmentDate" label="Date" />
          <Input type="time" name="appointmentTime" label="Time" />

          <Input
            type="select"
            name="appointmentStatus"
            label="Status"
            options={[
              { label: "Pending", value: 1 },
              { label: "Completed", value: 2 },
              { label: "Cancelled", value: 3 },
            ]}
          />

          <div className="col-span-3">
            <Input type="textarea" name="notes" label="Notes" />
          </div>
        </div>
      </Section>
      <Section title="Department">
  <div className="grid grid-cols-2 gap-4">
    <Input name="name" label="Department Name" />
    <Input type="textarea" name="description" label="Description" />
  </div>
</Section>

<Section title="Medical Record">
  <div className="grid grid-cols-2 gap-4">
    <Input name="recordNumber" label="Record Number" />

    <Input
      type="select"
      name="patientId"
      label="Patient"
      // options={patients}
    />
  </div>
</Section>
    </>
  );
}
