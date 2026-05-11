import { useEffect, useState } from 'react';
import axios from '../../services/axiosInstance';

const VerifyPrescription = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get('/prescriptions');
      setPrescriptions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ LOCAL inventory check (no backend needed)
  const handleCheck = async () => {
    if (!selected) return;

    try {
      setLoading(true);

      const res = await axios.get('/pharmacy/medicines');
      const inventory = res.data;

      let allAvailable = true;

      for (let med of selected.medicines) {
        const found = inventory.find(
          (m) => m.name.toLowerCase() === med.name.toLowerCase()
        );

        if (!found || found.stock === 0) {
          allAvailable = false;
          break;
        }
      }

      if (allAvailable) {
        setMessage("All medicines available ✅");
      } else {
        setMessage("Some medicines are out of stock ❌");
      }

    } catch (err) {
      console.error(err);
      setMessage("Inventory check failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Dispense = place order (reuse backend)
  const handleDispense = async () => {
  if (!selected) return;

  try {
    setLoading(true);

    // 🔥 STEP 1: Get inventory
    const res = await axios.get('/pharmacy/medicines');
    const inventory = res.data;

    // 🔥 STEP 2: Check availability
    const unavailable = [];

    const items = selected.medicines.map(m => {
      const found = inventory.find(
        med => med.name.toLowerCase() === m.name.toLowerCase()
      );

      if (!found || found.stock <= 0) {
        unavailable.push(m.name);
      }

      return {
        _id: found?._id,
        qty: 1
      };
    });

    // ❌ STOP if unavailable
    if (unavailable.length > 0) {
      setMessage(`Out of stock: ${unavailable.join(', ')}`);
      return;
    }

    // ✅ STEP 3: Place order
    await axios.post('/pharmacy/orders', { items });

    setMessage("Medicine dispensed successfully 💊");
    setSelected(null);
    fetchData();

  } catch (err) {
    console.error(err);
    setMessage(err.response?.data?.message || "Dispense failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gray-100 p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* LEFT */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Prescriptions</h2>

        {prescriptions.length === 0 ? (
          <p className="text-gray-500">No prescriptions found</p>
        ) : (
          <div className="space-y-3">
            {prescriptions.map((p) => (
              <div
                key={p._id}
                onClick={() => setSelected(p)}
                className={`p-3 border rounded cursor-pointer hover:bg-gray-50
                  ${selected?._id === p._id ? 'bg-blue-100 border-blue-400' : ''}`}
              >
                <p className="font-medium">{p.diagnosis}</p>
                <p className="text-sm text-gray-500">
                  {p.medicines.length} medicines
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Prescription Details</h2>

        {!selected ? (
          <p className="text-gray-500">Select a prescription</p>
        ) : (
          <>
            <p><strong>Diagnosis:</strong> {selected.diagnosis}</p>
            <p><strong>Patient ID:</strong> {selected.patientId}</p>

            <div className="my-3">
              <p className="font-semibold">Medicines:</p>
              <ul className="list-disc list-inside">
                {selected.medicines.map((m, i) => (
                  <li key={i}>{m.name}</li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCheck}
                disabled={loading}
                className="bg-yellow-500 text-white px-4 py-2 rounded"
              >
                Check Inventory
              </button>

              <button
                onClick={handleDispense}
                disabled={loading}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Dispense
              </button>
            </div>

            {message && (
              <p className="mt-4 text-sm text-blue-600">{message}</p>
            )}
          </>
        )}
      </div>

    </div>
  );
};

export default VerifyPrescription;