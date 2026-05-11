// import { useEffect, useState } from 'react';
// import { getMedicines } from '../../services/pharmacyService';

// const MedicineList = ({ onAdd }) => {
//   const [medicines, setMedicines] = useState([]);
//   const [search, setSearch] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchMedicines();
//   }, []);

//   const fetchMedicines = async () => {
//     try {
//       setLoading(true);
//       const res = await getMedicines();
//       setMedicines(res.data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filtered = medicines.filter((m) =>
//     m.name.toLowerCase().includes(search.toLowerCase())
//   );

//   if (loading) {
//     return <div className="p-4">Loading medicines...</div>;
//   }

//   return (
//     <div className="bg-white p-6 rounded-lg shadow">

//       <h2 className="text-xl font-bold mb-4">Medicines</h2>

//       {/* Search */}
//       <input
//         placeholder="Search medicine..."
//         value={search}
//         className="w-full mb-4 p-2 border rounded"
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       {filtered.length === 0 ? (
//         <p className="text-gray-500">No medicines found</p>
//       ) : (
//         <div className="space-y-3">

//           {filtered.map((m) => (
//             <div
//               key={m._id}
//               className="border p-4 rounded flex justify-between items-center hover:shadow"
//             >

//               <div>
//                 <p className="font-medium">{m.name}</p>
//                 <p className="text-sm text-gray-500">₹{m.price}</p>

//                 <span className={`text-xs px-2 py-1 rounded text-white
//                   ${m.stock > 10 ? 'bg-green-500' :
//                     m.stock > 0 ? 'bg-yellow-500' :
//                     'bg-red-500'
//                   }`}>
//                   {m.stock > 0 ? `${m.stock} in stock` : "Out of stock"}
//                 </span>
//               </div>

//               {/* Add Button (optional) */}
//               {onAdd && m.stock > 0 && (
//                 <button
//                   onClick={() => onAdd(m)}
//                   className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//                 >
//                   Add
//                 </button>
//               )}

//             </div>
//           ))}

//         </div>
//       )}

//     </div>
//   );
// }

// export default MedicineList;


import { useEffect, useState } from "react";
import { getMedicines } from "../../services/pharmacyService";

const MedicineList = ({ onAdd }) => {
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      setLoading(true);
      const res = await getMedicines();
      setMedicines(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = medicines.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-6 text-center text-lg">
        ⏳ Loading medicines...
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-gray-100 p-6 min-h-screen">

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <h2 className="text-3xl font-bold mb-6 text-center">
          💊 Medicine Store
        </h2>

        {/* Search */}
        <div className="mb-6">
          <input
            placeholder="🔍 Search medicine..."
            value={search}
            className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-blue-400 outline-none shadow-sm"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Empty */}
        {filtered.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No medicines found
          </p>
        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {filtered.map((m) => (
              <div
                key={m._id}
                className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition"
              >
                {/* Medicine Info */}
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {m.name}
                </h3>

                <p className="text-gray-500 mb-2">
                  ₹{m.price}
                </p>

                {/* Stock Badge */}
                <span
                  className={`text-xs px-3 py-1 rounded-full text-white ${
                    m.stock > 10
                      ? "bg-green-500"
                      : m.stock > 0
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                >
                  {m.stock > 0
                    ? `${m.stock} in stock`
                    : "Out of stock"}
                </span>

                {/* Button */}
                {onAdd && (
                  <button
                    onClick={() => onAdd(m)}
                    disabled={m.stock === 0}
                    className={`mt-4 w-full py-2 rounded-lg text-white transition ${
                      m.stock === 0
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600"
                    }`}
                  >
                    {m.stock === 0 ? "Unavailable" : "Add to Cart"}
                  </button>
                )}
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
};

export default MedicineList;