import { useEffect, useState } from 'react';
import { getOrders } from '../../services/pharmacyService';

const OrderTracking = () => {
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

  const getStatusStep = (status) => {
    if (status === 'pending') return 1;
    if (status === 'processing') return 2;
    if (status === 'completed') return 3;
    return 0;
  };

  if (loading) {
    return <div className="p-6">Loading orders...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-2xl font-bold mb-6">Order Tracking</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found</p>
      ) : (

        <div className="space-y-6">
          {orders.map((o) => {
            const step = getStatusStep(o.status);

            return (
              <div key={o._id} className="bg-white p-6 rounded-lg shadow">

                {/* Header */}
                <div className="flex justify-between mb-4">
                  <p className="font-semibold">
                    Order #{o._id.slice(-5)}
                  </p>
                  <span className="text-sm text-gray-500">
                    ₹{o.total}
                  </span>
                </div>

                {/* Items */}
                <ul className="mb-4 text-sm">
                  {o.items.map((item, i) => (
                    <li key={i}>
                      {item.name} x {item.qty}
                    </li>
                  ))}
                </ul>

                {/* Status Timeline */}
                <div className="flex items-center justify-between text-sm">

                  <div className="flex flex-col items-center">
                    <div className={`w-6 h-6 rounded-full
                      ${step >= 1 ? 'bg-yellow-500' : 'bg-gray-300'}`} />
                    <span>Pending</span>
                  </div>

                  <div className="flex-1 h-1 bg-gray-300 mx-2">
                    <div className={`h-1
                      ${step >= 2 ? 'bg-blue-500 w-full' : 'w-0'}`} />
                  </div>

                  <div className="flex flex-col items-center">
                    <div className={`w-6 h-6 rounded-full
                      ${step >= 2 ? 'bg-blue-500' : 'bg-gray-300'}`} />
                    <span>Processing</span>
                  </div>

                  <div className="flex-1 h-1 bg-gray-300 mx-2">
                    <div className={`h-1
                      ${step >= 3 ? 'bg-green-500 w-full' : 'w-0'}`} />
                  </div>

                  <div className="flex flex-col items-center">
                    <div className={`w-6 h-6 rounded-full
                      ${step >= 3 ? 'bg-green-500' : 'bg-gray-300'}`} />
                    <span>Completed</span>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      )}

    </div>
  );
}

export default OrderTracking;