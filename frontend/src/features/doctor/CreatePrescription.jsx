// 'use client';

// import { useState } from 'react';
// import { createPrescription } from '../../services/prescriptionService';
// import { checkInteraction } from '../../services/aiService';

// // ✅ FIXED: default import
// // import InteractionWarning from '../prescription/InteractionWarning';
// import InteractionWarning from '/src/features/prescription/InteractionWarning.jsx';

// export default function CreatePrescription() {
//   const [patientId, setPatientId] = useState('');
//   const [diagnosis, setDiagnosis] = useState('');
//   const [medicines, setMedicines] = useState([]);
//   const [name, setName] = useState('');
//   const [warning, setWarning] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // ✅ Add medicine
//   const addMedicine = () => {
//     const trimmed = name.trim();

//     if (!trimmed) return;

//     // جلوگیری از تکراری
//     if (medicines.some(m => m.name.toLowerCase() === trimmed.toLowerCase())) {
//       alert("Medicine already added");
//       return;
//     }

//     setMedicines([...medicines, { name: trimmed }]);
//     setName('');
//   };

//   // ✅ Remove medicine
//   const removeMedicine = (index) => {
//     setMedicines(medicines.filter((_, i) => i !== index));
//   };

//   // ✅ Submit handler
//   const handleSubmit = async () => {
//     if (!patientId || medicines.length === 0) {
//       alert("Please fill Patient ID and add medicines");
//       return;
//     }

//     try {
//       setLoading(true);

//       console.log("Checking AI interaction...");

//       // 🤖 AI check
//       const res = await checkInteraction(medicines);

//       // ✅ safer check
//       if (res?.data?.severity) {
//         setWarning(res.data);
//         return;
//       }

//       await savePrescription();

//     } catch (err) {
//       console.error("Submit error:", err);
//       alert("Something went wrong ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Save function (used twice)
//   const savePrescription = async () => {
//     await createPrescription({
//       patientId,
//       diagnosis,
//       medicines,
//     });

//   const res = await checkInteraction(medicines);

// if (res?.interactions?.length > 0) {
//   setWarning(res.interactions[0]); // show first interaction
//   return;
// }

//     alert("Prescription Created ✅");

//     // Reset form
//     setPatientId('');
//     setDiagnosis('');
//     setMedicines([]);
//     setWarning(null);
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow">

//       <h2 className="text-xl font-bold mb-4">Create Prescription</h2>

//       {/* Patient ID */}
//       <input
//         value={patientId}
//         placeholder="Patient ID"
//         className="w-full mb-3 p-2 border rounded"
//         onChange={(e) => setPatientId(e.target.value)}
//       />

//       {/* Diagnosis */}
//       <input
//         value={diagnosis}
//         placeholder="Diagnosis"
//         className="w-full mb-3 p-2 border rounded"
//         onChange={(e) => setDiagnosis(e.target.value)}
//       />

//       {/* Medicine Input */}
//       <div className="flex gap-2 mb-3">
//         <input
//           value={name}
//           placeholder="Add Medicine"
//           className="flex-1 p-2 border rounded"
//           onChange={(e) => setName(e.target.value)}
//           onKeyDown={(e) => e.key === 'Enter' && addMedicine()}
//         />

//         <button
//           onClick={addMedicine}
//           className="bg-green-500 text-white px-4 rounded hover:bg-green-600"
//         >
//           Add
//         </button>
//       </div>

//       {/* Medicine List */}
//       <ul className="mb-4">
//         {medicines.map((m, i) => (
//           <li
//             key={i}
//             className="flex justify-between items-center border p-2 rounded mb-2"
//           >
//             <span>{m.name}</span>
//             <button
//               onClick={() => removeMedicine(i)}
//               className="text-red-500"
//             >
//               ✕
//             </button>
//           </li>
//         ))}
//       </ul>

//       {/* Submit */}
//       <button
//         onClick={handleSubmit}
//         disabled={loading}
//         className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
//       >
//         {loading ? "Processing..." : "Submit Prescription"}
//       </button>

//       {/* ✅ AI Warning Popup */}
//       <InteractionWarning
//         data={warning}
//         onClose={async () => {
//           setWarning(null);

//           // 👉 After warning, still allow saving
//           await savePrescription();
//         }}
//       />

//     </div>
//   );
// }


// import { useState } from 'react';
// import { createPrescription } from '../../services/prescriptionService';
// import { checkInteraction } from '../../services/aiService';
// import InteractionWarning from '/src/features/prescription/InteractionWarning.jsx';

// export default function CreatePrescription() {
//   const [form, setForm] = useState({
//     patientName: '',
//     patientId: '',
//     age: '',
//     gender: '',
//     diagnosis: '',
//     notes: ''
//   });

//   const [medicine, setMedicine] = useState({
//     name: '',
//     dosage: '',
//     frequency: '',
//     duration: ''
//   });

//   const [medicines, setMedicines] = useState([]);
//   const [warning, setWarning] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // ✅ Add medicine with full details
//   const addMedicine = () => {
//     if (!medicine.name) return;

//     setMedicines([...medicines, medicine]);
//     setMedicine({ name: '', dosage: '', frequency: '', duration: '' });
//   };

//   const removeMedicine = (index) => {
//     setMedicines(medicines.filter((_, i) => i !== index));
//   };

//   const handleSubmit = async () => {
//     if (!form.patientId || medicines.length === 0) {
//       alert("Fill all required fields");
//       return;
//     }

//     try {
//       setLoading(true);

//       // 🤖 AI Interaction Check
//       const res = await checkInteraction(medicines);

//       if (res?.data?.severity) {
//         setWarning(res.data);
//         return;
//       }

//       await savePrescription();

//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const savePrescription = async () => {
//     await createPrescription({
//       ...form,
//       medicines
//     });

//     alert("Prescription Created ✅");

//     setForm({
//       patientName: '',
//       patientId: '',
//       age: '',
//       gender: '',
//       diagnosis: '',
//       notes: ''
//     });

//     setMedicines([]);
//   };

//   return (
//     <div className="bg-white p-6 rounded-xl shadow">

//       <h2 className="text-xl font-bold mb-4">📝 Create Prescription</h2>

//       {/* 🔥 PATIENT DETAILS */}
//       <div className="grid grid-cols-2 gap-3 mb-4">
//         <input placeholder="Patient Name"
//           value={form.patientName}
//           onChange={(e) => setForm({ ...form, patientName: e.target.value })}
//           className="p-2 border rounded" />

//         {/* <input placeholder="Patient ID"
//           value={form.patientId}
//           onChange={(e) => setForm({ ...form, patientId: e.target.value })}
//           className="p-2 border rounded" /> */}


//         <select
//   value={form.patientId}
//   onChange={(e) => setForm({ ...form, patientId: e.target.value })}
// >
//   <option value="">Select Patient</option>
//   {patients.map(p => (
//     <option key={p._id} value={p._id}>
//       {p.name}
//     </option>
//   ))}
// </select>

//         <input placeholder="Age"
//           value={form.age}
//           onChange={(e) => setForm({ ...form, age: e.target.value })}
//           className="p-2 border rounded" />

//         <select
//           value={form.gender}
//           onChange={(e) => setForm({ ...form, gender: e.target.value })}
//           className="p-2 border rounded"
//         >
//           <option value="">Select Gender</option>
//           <option>Male</option>
//           <option>Female</option>
//         </select>
//       </div>

//       {/* 🔥 DIAGNOSIS */}
//       <input
//         placeholder="Diagnosis"
//         value={form.diagnosis}
//         onChange={(e) => setForm({ ...form, diagnosis: e.target.value })}
//         className="w-full mb-3 p-2 border rounded"
//       />

//       <textarea
//         placeholder="Notes"
//         value={form.notes}
//         onChange={(e) => setForm({ ...form, notes: e.target.value })}
//         className="w-full mb-4 p-2 border rounded"
//       />

//       {/* 🔥 MEDICINE FORM */}
//       <div className="grid grid-cols-4 gap-2 mb-3">
//         <input placeholder="Medicine"
//           value={medicine.name}
//           onChange={(e) => setMedicine({ ...medicine, name: e.target.value })}
//           className="p-2 border rounded" />

//         <input placeholder="Dosage"
//           value={medicine.dosage}
//           onChange={(e) => setMedicine({ ...medicine, dosage: e.target.value })}
//           className="p-2 border rounded" />

//         <input placeholder="Frequency"
//           value={medicine.frequency}
//           onChange={(e) => setMedicine({ ...medicine, frequency: e.target.value })}
//           className="p-2 border rounded" />

//         <input placeholder="Duration"
//           value={medicine.duration}
//           onChange={(e) => setMedicine({ ...medicine, duration: e.target.value })}
//           className="p-2 border rounded" />
//       </div>

//       <button
//         onClick={addMedicine}
//         className="bg-green-500 text-white px-4 py-1 rounded mb-3"
//       >
//         ➕ Add Medicine
//       </button>

//       {/* 🔥 MEDICINE LIST */}
//       <div className="space-y-2 mb-4">
//         {medicines.map((m, i) => (
//           <div key={i} className="border p-2 rounded flex justify-between">
//             <span>
//               {m.name} | {m.dosage} | {m.frequency} | {m.duration}
//             </span>
//             <button onClick={() => removeMedicine(i)} className="text-red-500">✕</button>
//           </div>
//         ))}
//       </div>

//       {/* 🔥 SUBMIT */}
//       <button
//         onClick={handleSubmit}
//         className="w-full bg-blue-500 text-white p-2 rounded"
//       >
//         {loading ? "Processing..." : "Create Prescription"}
//       </button>

//       {/* 🔥 AI WARNING */}
//       <InteractionWarning
//         data={warning}
//         onClose={async () => {
//           setWarning(null);
//           await savePrescription();
//         }}
//       />

//     </div>
//   );
// }


import { useState, useEffect } from 'react';
import { createPrescription } from '../../services/prescriptionService';
import { checkInteraction } from '../../services/aiService';
import InteractionWarning from '/src/features/prescription/InteractionWarning.jsx';
import axiosInstance from '../../services/axiosInstance';

export default function CreatePrescription() {

  const [form, setForm] = useState({
    patientId: '',
    diagnosis: '',
    notes: ''
  });

  const [patients, setPatients] = useState([]); // ✅ FIXED

  const [medicine, setMedicine] = useState({
    name: '',
    dosage: '',
    frequency: '',
    duration: ''
  });

  const [medicines, setMedicines] = useState([]);
  const [warning, setWarning] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ FETCH PATIENTS
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axiosInstance.get('/users/patients');
        setPatients(res.data.data);
      } catch (err) {
        console.error("Error fetching patients", err);
      }
    };
    fetchPatients();
  }, []);

  // ✅ ADD MEDICINE
  const addMedicine = () => {
    if (!medicine.name) return;
    setMedicines([...medicines, medicine]);
    setMedicine({ name: '', dosage: '', frequency: '', duration: '' });
  };

  const removeMedicine = (index) => {
    setMedicines(medicines.filter((_, i) => i !== index));
  };

  // ✅ SUBMIT
  const handleSubmit = async () => {
    if (!form.patientId || medicines.length === 0) {
      alert("Fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const res = await checkInteraction(medicines);

      if (res?.data?.severity) {
        setWarning(res.data);
        return;
      }

      await savePrescription();

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ SAVE (FIXED: doctorId added)
  const savePrescription = async () => {
    try {
      const doctorId = localStorage.getItem("userId"); // ✅ ensure login sets this

      await createPrescription({
        patientId: form.patientId,
        doctorId, // 🔥 FIXED
        medicines,
        diagnosis: form.diagnosis,
        notes: form.notes
      });

      alert("Prescription Created ✅");

      setForm({ patientId: '', diagnosis: '', notes: '' });
      setMedicines([]);

    } catch (error) {
      console.error("Save Error:", error);
      alert("Error creating prescription");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-xl font-bold mb-4">📝 Create Prescription</h2>

      {/* PATIENT */}
      <select
        value={form.patientId}
        onChange={(e) => setForm({ ...form, patientId: e.target.value })}
        className="p-2 border rounded w-full mb-3"
      >
        <option value="">Select Patient</option>
        {patients.map(p => (
          <option key={p._id} value={p._id}>
            {p.name}
          </option>
        ))}
      </select>

      {/* DIAGNOSIS */}
      <input
        placeholder="Diagnosis"
        value={form.diagnosis}
        onChange={(e) => setForm({ ...form, diagnosis: e.target.value })}
        className="w-full mb-3 p-2 border rounded"
      />

      <textarea
        placeholder="Notes"
        value={form.notes}
        onChange={(e) => setForm({ ...form, notes: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />

      {/* MEDICINES */}
      <div className="grid grid-cols-4 gap-2 mb-3">
        <input placeholder="Medicine" value={medicine.name}
          onChange={(e) => setMedicine({ ...medicine, name: e.target.value })}
          className="p-2 border rounded" />

        <input placeholder="Dosage" value={medicine.dosage}
          onChange={(e) => setMedicine({ ...medicine, dosage: e.target.value })}
          className="p-2 border rounded" />

        <input placeholder="Frequency" value={medicine.frequency}
          onChange={(e) => setMedicine({ ...medicine, frequency: e.target.value })}
          className="p-2 border rounded" />

        <input placeholder="Duration" value={medicine.duration}
          onChange={(e) => setMedicine({ ...medicine, duration: e.target.value })}
          className="p-2 border rounded" />
      </div>

      <button onClick={addMedicine}
        className="bg-green-500 text-white px-4 py-1 rounded mb-3">
        ➕ Add Medicine
      </button>

      {/* LIST */}
      {medicines.map((m, i) => (
        <div key={i} className="border p-2 rounded flex justify-between mb-2">
          <span>{m.name} | {m.dosage} | {m.frequency} | {m.duration}</span>
          <button onClick={() => removeMedicine(i)} className="text-red-500">✕</button>
        </div>
      ))}

      {/* SUBMIT */}
      <button onClick={handleSubmit}
        className="w-full bg-blue-500 text-white p-2 rounded">
        {loading ? "Processing..." : "Create Prescription"}
      </button>

      <InteractionWarning
        data={warning}
        onClose={async () => {
          setWarning(null);
          await savePrescription();
        }}
      />
    </div>
  );
}