import { useEffect, useState } from 'react';
import { getNotifications } from '../services/notificationService';

export default function NotificationBell({ userId }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await getNotifications(userId);
    setNotifications(res.data);
  };

  return (
    <div>
      🔔 ({notifications.length})

      <div>
        {notifications.map((n) => (
          <p key={n._id}>{n.message}</p>
        ))}
      </div>
    </div>
  );
}