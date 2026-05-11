// import { useEffect, useState } from "react";
// import { getMedicines, placeOrder } from "../../services/pharmacyService";

// const OrderMedicine = () => {
//   const [medicines, setMedicines] = useState([]);
//   const [cart, setCart] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState("");

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

//   const addToCart = (medicine) => {
//     const exists = cart.find((item) => item._id === medicine._id);

//     if (exists) {
//       setCart(
//         cart.map((item) =>
//           item._id === medicine._id
//             ? { ...item, qty: item.qty + 1 }
//             : item
//         )
//       );
//     } else {
//       setCart([...cart, { ...medicine, qty: 1 }]);
//     }
//   };

//   const updateQty = (id, qty) => {
//     if (qty <= 0) return;
//     setCart(
//       cart.map((item) =>
//         item._id === id ? { ...item, qty } : item
//       )
//     );
//   };

//   const removeItem = (id) => {
//     setCart(cart.filter((item) => item._id !== id));
//   };

//   const getTotal = () =>
//     cart.reduce((total, item) => total + item.price * item.qty, 0);

//   const handleOrder = async () => {
//     if (cart.length === 0) {
//       setMessage("⚠️ Cart is empty");
//       return;
//     }

//     try {
//       await placeOrder({ items: cart });
//       setMessage("✅ Order placed successfully");
//       setCart([]);
//     } catch {
//       setMessage("❌ Order failed");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-lg">
//         Loading medicines...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-6">

//       <h1 className="text-3xl font-bold text-center mb-6">
//         💊 Pharmacy Store
//       </h1>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

//         {/* Medicines */}
//         <div className="bg-white p-6 rounded-2xl shadow-lg">
//           <h2 className="text-xl font-semibold mb-4">
//             🧾 Available Medicines
//           </h2>

//           <div className="grid gap-4">
//             {medicines.map((m) => (
//               <div
//                 key={m._id}
//                 className="flex justify-between items-center p-4 border rounded-xl hover:shadow-md transition"
//               >
//                 <div>
//                   <p className="font-semibold text-gray-800">
//                     {m.name}
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     ₹{m.price}
//                   </p>
//                 </div>

//                 <button
//                   onClick={() => addToCart(m)}
//                   className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
//                 >
//                   Add
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Cart */}
//         <div className="bg-white p-6 rounded-2xl shadow-lg">
//           <h2 className="text-xl font-semibold mb-4">
//             🛒 Your Cart
//           </h2>

//           {cart.length === 0 ? (
//             <p className="text-gray-500 text-center py-6">
//               No items in cart
//             </p>
//           ) : (
//             <div className="space-y-4">

//               {cart.map((item) => (
//                 <div
//                   key={item._id}
//                   className="flex justify-between items-center p-4 border rounded-xl"
//                 >
//                   <div>
//                     <p className="font-medium">{item.name}</p>
//                     <p className="text-sm text-gray-500">
//                       ₹{item.price}
//                     </p>
//                   </div>

//                   {/* Quantity */}
//                   <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-lg">
//                     <button
//                       onClick={() =>
//                         updateQty(item._id, item.qty - 1)
//                       }
//                       className="px-2"
//                     >
//                       -
//                     </button>
//                     <span>{item.qty}</span>
//                     <button
//                       onClick={() =>
//                         updateQty(item._id, item.qty + 1)
//                       }
//                       className="px-2"
//                     >
//                       +
//                     </button>
//                   </div>

//                   {/* Remove */}
//                   <button
//                     onClick={() => removeItem(item._id)}
//                     className="text-red-500 font-bold"
//                   >
//                     ✕
//                   </button>
//                 </div>
//               ))}

//               {/* Total */}
//               <div className="flex justify-between text-lg font-bold border-t pt-4">
//                 <span>Total</span>
//                 <span>₹{getTotal()}</span>
//               </div>

//               {/* Order Button */}
//               <button
//                 onClick={handleOrder}
//                 className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition shadow"
//               >
//                 🚀 Place Order
//               </button>
//             </div>
//           )}

//           {/* Message */}
//           {message && (
//             <p className="text-center mt-4 text-sm text-blue-600">
//               {message}
//             </p>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// };

// export default OrderMedicine;


import { useEffect, useState } from "react";
import { getMedicines, placeOrder, createBill } from "../../services/pharmacyService";

const OrderMedicine = () => {
  const [medicines, setMedicines] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

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

  const addToCart = (medicine) => {
    const exists = cart.find((item) => item._id === medicine._id);

    if (exists) {
      setCart(
        cart.map((item) =>
          item._id === medicine._id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...medicine, qty: 1 }]);
    }
  };

  const updateQty = (id, qty) => {
    if (qty <= 0) return;

    setCart(
      cart.map((item) =>
        item._id === id ? { ...item, qty } : item
      )
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  const getTotal = () =>
    cart.reduce(
      (total, item) => total + Number(item.price) * item.qty,
      0
    );

  const handleOrder = async () => {
    if (cart.length === 0) {
      setMessage("⚠️ Cart is empty");
      return;
    }

    try {
      // ✅ FIXED PAYLOAD
      const orderData = {
        medicines: cart.map((item) => ({
          price: Number(item.price),
          quantity: item.qty,
        })),
      };

      console.log("Sending bill:", orderData);

      const res = await createBill(orderData);
setMessage(`✅ Total Bill: ₹${res.data.totalAmount}`);

      setMessage(`✅ Total Bill: ₹${res.data.totalAmount}`);
      setCart([]);
    } catch (err) {
      console.error(err);
      setMessage("❌ Billing failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading medicines...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-6">

      <h1 className="text-3xl font-bold text-center mb-6">
        💊 Pharmacy Store
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Medicines */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">
            Available Medicines
          </h2>

          <div className="grid gap-4">
            {medicines.map((m) => (
              <div
                key={m._id}
                className="flex justify-between items-center p-4 border rounded-xl hover:shadow-md"
              >
                <div>
                  <p className="font-semibold">{m.name}</p>
                  <p className="text-sm text-gray-500">₹{m.price}</p>
                </div>

                <button
                  onClick={() => addToCart(m)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Cart */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Your Cart</h2>

          {cart.length === 0 ? (
            <p className="text-gray-500 text-center py-6">
              No items in cart
            </p>
          ) : (
            <div className="space-y-4">

              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center p-4 border rounded-xl"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      ₹{item.price}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-lg">
                    <button onClick={() => updateQty(item._id, item.qty - 1)}>
                      -
                    </button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item._id, item.qty + 1)}>
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item._id)}
                    className="text-red-500"
                  >
                    ✕
                  </button>
                </div>
              ))}

              {/* Total */}
              <div className="flex justify-between text-lg font-bold border-t pt-4">
                <span>Total</span>
                <span>₹{getTotal()}</span>
              </div>

              {/* Order */}
              <button
                onClick={handleOrder}
                className="w-full bg-green-500 text-white py-3 rounded-lg"
              >
                Place Order
              </button>
            </div>
          )}

          {message && (
            <p className="text-center mt-4 text-blue-600">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderMedicine;