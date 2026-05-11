import { useEffect, useState } from 'react';
import { getMedicines, createBill } from '../../services/pharmacyService';

const Billing = () => {
  const [medicines, setMedicines] = useState([]);
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const res = await getMedicines();
      setMedicines(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addToCart = (medicine) => {
    const exists = cart.find((item) => item._id === medicine._id);

    if (exists) {
      setCart(cart.map((item) =>
        item._id === medicine._id
          ? { ...item, qty: item.qty + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...medicine, qty: 1 }]);
    }
  };

  const updateQty = (id, qty) => {
    if (qty <= 0) return;

    setCart(cart.map((item) =>
      item._id === id ? { ...item, qty } : item
    ));
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  const getTotal = () => {
    return cart.reduce((total, item) =>
      total + item.price * item.qty, 0
    );
  };

  const handleBill = async () => {
    if (cart.length === 0) {
      setMessage("No items selected");
      return;
    }

    try {
      await createBill({
        items: cart,
        total: getTotal()
      });

      setMessage("Bill generated successfully 🧾");
      setCart([]);

    } catch (err) {
      setMessage("Billing failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* Medicines */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Medicines</h2>

        <div className="space-y-3">
          {medicines.map((m) => (
            <div key={m._id} className="flex justify-between items-center border p-3 rounded">
              <div>
                <p className="font-medium">{m.name}</p>
                <p className="text-sm text-gray-500">₹{m.price}</p>
              </div>

              <button
                onClick={() => addToCart(m)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Add
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Cart / Invoice */}
      <div className="bg-white p-6 rounded-lg shadow">

        <h2 className="text-xl font-bold mb-4">Invoice</h2>

        {cart.length === 0 ? (
          <p className="text-gray-500">No items added</p>
        ) : (
          <div className="space-y-3">

            {cart.map((item) => (
              <div key={item._id} className="flex justify-between items-center border p-3 rounded">

                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">₹{item.price}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button onClick={() => updateQty(item._id, item.qty - 1)}>-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item._id, item.qty + 1)}>+</button>
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
            <div className="flex justify-between font-bold mt-4">
              <span>Total:</span>
              <span>₹{getTotal()}</span>
            </div>

            {/* Generate Bill */}
            <button
              onClick={handleBill}
              className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 mt-3"
            >
              Generate Bill
            </button>
          </div>
        )}

        {/* Message */}
        {message && (
          <p className="text-center mt-3 text-blue-600">{message}</p>
        )}
      </div>

    </div>
  );
}

export default Billing;