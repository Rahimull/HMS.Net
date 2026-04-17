import { useState } from "react";

/* ================= UI ================= */

const Section = ({ title, children }) => (
  <div className="bg-white rounded-xl shadow p-5 mb-6">
    <h2 className="text-lg font-semibold mb-4 border-b pb-2">{title}</h2>
    {children}
  </div>
);

const Input = ({ label, onChange }) => (
  <div className="flex flex-col">
    <label className="text-sm mb-1">{label}</label>
    <input className="border p-2 rounded" onChange={onChange} />
  </div>
);

const Button = ({ text, onClick, color = "blue" }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded text-white ${
      color === "green" ? "bg-green-600" : "bg-blue-600"
    }`}
  >
    {text}
  </button>
);

/* ================= PRINT ================= */

const handlePrint = (consultation) => {
  const win = window.open("", "_blank");

  win.document.write(`
    <html>
      <head>
        <title>Prescription</title>
        <style>
          body { font-family: Arial; padding: 20px; }
          h1 { text-align: center; }
          .box { margin-bottom: 10px; }
          hr { margin: 10px 0; }
        </style>
      </head>

      <body>
        <h1>🏥 Hospital Prescription</h1>

        <div class="box"><b>Visit Date:</b> ${consultation.visitDate || "-"}</div>
        <div class="box"><b>Doctor ID:</b> ${consultation.doctorId}</div>
        <div class="box"><b>Patient ID:</b> ${consultation.patientId}</div>

        <hr/>

        <h3>Diagnosis</h3>
        ${(consultation.diagnosis || [])
          .map((d) => `<p>✔ ${d.diagnosisName} - ${d.diagnosisDetails}</p>`)
          .join("")}

        <hr/>

        <h3>Prescription</h3>
        ${(consultation.prescriptions || [])
          .map((p) =>
            (p.details || [])
              .map(
                (d) =>
                  `<p>💊 ${d.medicationName} | ${d.dosage} | ${d.frequency}</p>`,
              )
              .join(""),
          )
          .join("")}

        <hr/>

        <p style="text-align:center;margin-top:30px;">
          Doctor Signature: ____________
        </p>
      </body>
    </html>
  `);

  win.document.close();
  win.print();
};

/* ================= MAIN ================= */

export default function DoctorWorkstation() {
  const [consultations, setConsultations] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const [consultForm, setConsultForm] = useState({});
  const [diagForm, setDiagForm] = useState({});
  const [presForm, setPresForm] = useState({});
  const [presDetailForm, setPresDetailForm] = useState({});

  const selected = consultations.find((c) => c.id === selectedId);

  /* ================= CONSULTATION ================= */

  const addConsultation = () => {
    const newC = {
      id: Date.now(),
      visitDate: new Date().toISOString().slice(0, 10),
      ...consultForm,
      diagnosis: [],
      prescriptions: [],
    };

    setConsultations([...consultations, newC]);
  };

  /* ================= DIAGNOSIS ================= */

  const addDiagnosis = () => {
    setConsultations((prev) =>
      prev.map((c) =>
        c.id === selectedId
          ? {
              ...c,
              diagnosis: [...c.diagnosis, { id: Date.now(), ...diagForm }],
            }
          : c,
      ),
    );
  };

  /* ================= PRESCRIPTION ================= */

  const addPrescription = () => {
    setConsultations((prev) =>
      prev.map((c) =>
        c.id === selectedId
          ? {
              ...c,
              prescriptions: [
                ...c.prescriptions,
                {
                  id: Date.now(),
                  consultationId: selectedId,
                  doctorId: c.doctorId,
                  patientId: c.patientId,
                  details: [],
                },
              ],
            }
          : c,
      ),
    );
  };

  /* ================= PRESCRIPTION DETAILS ================= */

  const addPrescriptionDetail = (prescriptionId) => {
    setConsultations((prev) =>
      prev.map((c) =>
        c.id === selectedId
          ? {
              ...c,
              prescriptions: c.prescriptions.map((p) =>
                p.id === prescriptionId
                  ? {
                      ...p,
                      details: [
                        ...p.details,
                        { id: Date.now(), ...presDetailForm },
                      ],
                    }
                  : p,
              ),
            }
          : c,
      ),
    );
  };

  /* ================= UI ================= */

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">
        👨‍⚕️ Doctor Workstation (Entity Based)
      </h1>

      {/* ================= CONSULTATION ================= */}
      <Section title="🩺 Consultation (Visit)">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="PatientId"
            onChange={(e) =>
              setConsultForm({ ...consultForm, patientId: e.target.value })
            }
          />
          <Input
            label="DoctorId"
            onChange={(e) =>
              setConsultForm({ ...consultForm, doctorId: e.target.value })
            }
          />
          <Input
            label="Chief Complaint"
            onChange={(e) =>
              setConsultForm({ ...consultForm, chiefComplaint: e.target.value })
            }
          />
          <Input
            label="Examination"
            onChange={(e) =>
              setConsultForm({ ...consultForm, examination: e.target.value })
            }
          />
        </div>

        <div className="mt-3">
          <Button
            text="Add Consultation"
            onClick={addConsultation}
            color="green"
          />
        </div>
      </Section>

      {/* ================= LIST ================= */}
      <Section title="📋 Consultations">
        {consultations.map((c) => (
          <div
            key={c.id}
            onClick={() => setSelectedId(c.id)}
            className={`p-3 border mb-2 cursor-pointer rounded ${
              selectedId === c.id ? "bg-blue-100" : "bg-white"
            }`}
          >
            Patient: {c.patientId} | Complaint: {c.chiefComplaint}
          </div>
        ))}
      </Section>

      {/* ================= DETAILS ================= */}
      {selected && (
        <>
          {/* DIAGNOSIS */}
          <Section title="🧾 Diagnosis">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Diagnosis Name"
                onChange={(e) =>
                  setDiagForm({ ...diagForm, diagnosisName: e.target.value })
                }
              />
              <Input
                label="Details"
                onChange={(e) =>
                  setDiagForm({ ...diagForm, diagnosisDetails: e.target.value })
                }
              />
            </div>

            <div className="mt-3">
              <Button text="Add Diagnosis" onClick={addDiagnosis} />
            </div>

            {selected.diagnosis.map((d) => (
              <p key={d.id}>✔ {d.diagnosisName}</p>
            ))}
          </Section>

          {/* PRESCRIPTION */}
          <Section title="💊 Prescription (Master Detail)">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Medicine Name"
                onChange={(e) =>
                  setPresDetailForm({
                    ...presDetailForm,
                    medicationName: e.target.value,
                  })
                }
              />
              <Input
                label="Dosage"
                onChange={(e) =>
                  setPresDetailForm({
                    ...presDetailForm,
                    dosage: e.target.value,
                  })
                }
              />
              <Input
                label="Frequency"
                onChange={(e) =>
                  setPresDetailForm({
                    ...presDetailForm,
                    frequency: e.target.value,
                  })
                }
              />
            </div>

            <div className="mt-3">
              <Button text="Add Prescription" onClick={addPrescription} />
            </div>

            {selected.prescriptions.map((p) => (
              <div key={p.id} className="mt-3 border p-2 rounded">
                <b>Prescription #{p.id}</b>

                <div className="mt-2">
                  <Button
                    text="Add Medicine"
                    onClick={() => addPrescriptionDetail(p.id)}
                  />
                </div>

                {p.details.map((d) => (
                  <p key={d.id}>
                    💊 {d.medicationName} | {d.dosage} | {d.frequency}
                  </p>
                ))}
              </div>
            ))}
          </Section>

          {/* PRINT */}
          <Section title="🖨 Print">
            <Button
              text="Print Prescription"
              color="green"
              onClick={() => handlePrint(selected)}
            />
          </Section>
        </>
      )}
    </div>
  );
}
