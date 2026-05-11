import { useEffect, useState } from 'react';
import {
  getOrders,
  updateOrderStatus
} from '../../services/pharmacyService';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await getOrders();
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatus = async (id, status) => {
    try {
      await updateOrderStatus(id, status);
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="p-6">Loading orders...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">

      <h2 className="text-xl font-bold mb-4">Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found</p>
      ) : (

        <div className="overflow-x-auto">
          <table className="w-full text-left">

            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="p-3">Order ID</th>
                <th className="p-3">Items</th>
                <th className="p-3">Total</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((o) => (
                <tr key={o._id} className="border-b hover:bg-gray-50">

                  {/* Order ID */}
                  <td className="p-3">
                    #{o._id.slice(-5)}
                  </td>

                  {/* Items */}
                  <td className="p-3">
                    <ul className="text-sm">
                      {o.items.map((item, i) => (
                        <li key={i}>
                          {item.name} x {item.qty}
                        </li>
                      ))}
                    </ul>
                  </td>

                  {/* Total */}
                  <td className="p-3 font-medium">
                    ₹{o.total || 0}
                  </td>

                  {/* Status */}
                  <td className="p-3">
                    <span className={`px-3 py-1 rounded-full text-white text-sm
                      ${o.status === 'pending' ? 'bg-yellow-500' :
                        o.status === 'processing' ? 'bg-blue-500' :
                        o.status === 'completed' ? 'bg-green-500' :
                        'bg-gray-500'
                      }`}>
                      {o.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-3 text-center space-x-2">

                    <button
                      disabled={o.status !== 'pending'}
                      onClick={() => handleStatus(o._id, 'processing')}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 disabled:opacity-50"
                    >
                      Process
                    </button>

                    <button
                      disabled={o.status === 'completed'}
                      onClick={() => handleStatus(o._id, 'completed')}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 disabled:opacity-50"
                    >
                      Complete
                    </button>

                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>

      )}

    </div>
  );
}

export default Orders;