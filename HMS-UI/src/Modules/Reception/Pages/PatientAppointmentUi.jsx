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
           options={
            [
              {label:1, value:1}
            ]
           }
           />
           <Input 
           label="Patient"
           type="date"
           />
        </div>
      </Section>

      <Section title="Appointment Info">
        <div className="grid grid-cols-2 gap-4">
          
        </div>
      </Section>

      <Button text="Add">Save</Button>
    </>
  );
}
