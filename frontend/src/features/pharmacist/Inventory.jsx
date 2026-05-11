// import { useEffect, useState } from 'react';
// import {
//   getMedicines,
//   addMedicine,
//   updateMedicine,
//   deleteMedicine
// } from '../../services/pharmacyService';

// const Inventory = () => {
//   const [medicines, setMedicines] = useState([]);
//   const [form, setForm] = useState({
//     name: '',
//     price: '',
//     stock: ''
//   });
//   const [editId, setEditId] = useState(null);
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     fetchMedicines();
//   }, []);

//   const fetchMedicines = async () => {
//     try {
//       const res = await getMedicines();
//       setMedicines(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!form.name || !form.price || !form.stock) {
//       setMessage("Fill all fields");
//       return;
//     }

//     try {
//       if (editId) {
//         await updateMedicine(editId, form);
//         setMessage("Medicine updated");
//       } else {
//         await addMedicine(form);
//         setMessage("Medicine added");
//       }

//       setForm({ name: '', price: '', stock: '' });
//       setEditId(null);
//       fetchMedicines();

//     } catch (err) {
//       setMessage("Operation failed");
//     }
//   };

//   const handleEdit = (m) => {
//     setForm({
//       name: m.name,
//       price: m.price,
//       stock: m.stock
//     });
//     setEditId(m._id);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await deleteMedicine(id);
//       setMessage("Deleted successfully");
//       fetchMedicines();
//     } catch (err) {
//       setMessage("Delete failed");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">

//       <h1 className="text-2xl font-bold mb-6">Inventory Management</h1>

//       {/* Form */}
//       <div className="bg-white p-6 rounded-lg shadow mb-6 max-w-md">

//         <h2 className="text-lg font-semibold mb-4">
//           {editId ? "Edit Medicine" : "Add Medicine"}
//         </h2>

//         {message && (
//           <p className="text-sm text-blue-600 mb-3">{message}</p>
//         )}

//         <input
//           placeholder="Medicine Name"
//           value={form.name}
//           className="w-full mb-3 p-2 border rounded"
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//         />

//         <input
//           type="number"
//           placeholder="Price"
//           value={form.price}
//           className="w-full mb-3 p-2 border rounded"
//           onChange={(e) => setForm({ ...form, price: e.target.value })}
//         />

//         <input
//           type="number"
//           placeholder="Stock"
//           value={form.stock}
//           className="w-full mb-4 p-2 border rounded"
//           onChange={(e) => setForm({ ...form, stock: e.target.value })}
//         />

//         <button
//           onClick={handleSubmit}
//           className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
//         >
//           {editId ? "Update" : "Add"}
//         </button>
//       </div>

//       {/* Table */}
//       <div className="bg-white p-6 rounded-lg shadow">

//         <h2 className="text-lg font-semibold mb-4">Medicine List</h2>

//         {medicines.length === 0 ? (
//           <p className="text-gray-500">No medicines found</p>
//         ) : (
//           <table className="w-full text-left">

//             <thead className="bg-gray-200">
//               <tr>
//                 <th className="p-2">Name</th>
//                 <th className="p-2">Price</th>
//                 <th className="p-2">Stock</th>
//                 <th className="p-2">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {medicines.map((m) => (
//                 <tr key={m._id} className="border-b">

//                   <td className="p-2">{m.name}</td>

//                   <td className="p-2">₹{m.price}</td>

//                   <td className="p-2">
//                     <span className={`px-2 py-1 rounded text-white text-sm
//                       ${m.stock < 10 ? 'bg-red-500' : 'bg-green-500'}`}>
//                       {m.stock}
//                     </span>
//                   </td>

//                   <td className="p-2 space-x-2">
//                     <button
//                       onClick={() => handleEdit(m)}
//                       className="bg-yellow-500 text-white px-2 py-1 rounded"
//                     >
//                       Edit
//                     </button>

//                     <button
//                       onClick={() => handleDelete(m._id)}
//                       className="bg-red-500 text-white px-2 py-1 rounded"
//                     >
//                       Delete
//                     </button>
//                   </td>

//                 </tr>
//               ))}
//             </tbody>

//           </table>
//         )}

//       </div>

//     </div>
//   );
// }

// export default Inventory;


import { useEffect, useState } from 'react';
import {
  getMedicines,
  addMedicine,
  updateMedicine,
  deleteMedicine
} from '../../services/pharmacyService';

const Inventory = () => {
  const [medicines, setMedicines] = useState([]);
  const [form, setForm] = useState({
    name: '',
    price: '',
    stock: ''
  });
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const res = await getMedicines();
      setMedicines(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async () => {
    if (!form.name || !form.price || !form.stock) {
      setMessage("Fill all fields");
      return;
    }

    const payload = {
      name: form.name,
      price: Number(form.price),
      stock: Number(form.stock)
    };

    try {
      if (editId) {
        await updateMedicine(editId, payload);
        setMessage("Medicine updated");
      } else {
        await addMedicine(payload);
        setMessage("Medicine added");
      }

      setForm({ name: '', price: '', stock: '' });
      setEditId(null);
      fetchMedicines();

    } catch (err) {
      console.error(err);
      setMessage("Operation failed");
    }
  };

  const handleEdit = (m) => {
    setForm({
      name: m.name,
      price: m.price,
      stock: m.stock
    });
    setEditId(m._id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteMedicine(id);
      setMessage("Deleted successfully");
      fetchMedicines();
    } catch (err) {
      console.error(err);
      setMessage("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-2xl font-bold mb-6">Inventory Management</h1>

      {/* FORM */}
      <div className="bg-white p-6 rounded-lg shadow mb-6 max-w-md">
        <h2 className="text-lg font-semibold mb-4">
          {editId ? "Edit Medicine" : "Add Medicine"}
        </h2>

        {message && (
          <p className="text-sm text-blue-600 mb-3">{message}</p>
        )}

        <input
          placeholder="Medicine Name"
          value={form.name}
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="number"
          placeholder="Price"
          value={form.price}
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <input
          type="number"
          placeholder="Stock"
          value={form.stock}
          className="w-full mb-4 p-2 border rounded"
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {editId ? "Update" : "Add"}
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white p-6 rounded-lg shadow">

        <h2 className="text-lg font-semibold mb-4">Medicine List</h2>

        {medicines.length === 0 ? (
          <p className="text-gray-500">No medicines found</p>
        ) : (
          <table className="w-full text-left">

            <thead className="bg-gray-200">
              <tr>
                <th className="p-2">Name</th>
                <th className="p-2">Price</th>
                <th className="p-2">Stock</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {medicines.map((m) => (
                <tr key={m._id} className="border-b">

                  <td className="p-2">{m.name}</td>

                  <td className="p-2">₹{m.price}</td>

                  <td className="p-2">
                    <span className={`px-2 py-1 rounded text-white text-sm
                      ${m.stock === 0
                        ? 'bg-gray-500'
                        : m.stock < 10
                        ? 'bg-red-500'
                        : 'bg-green-500'}`}>
                      {m.stock === 0 ? "Out of Stock" : m.stock}
                    </span>
                  </td>

                  <td className="p-2 space-x-2">
                    <button
                      onClick={() => handleEdit(m)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(m._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        )}

      </div>

    </div>
  );
};

export default Inventory;