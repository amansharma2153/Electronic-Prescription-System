import Notification from './notification.model.js';

export const getNotifications = async (req, res) => {
  const data = await Notification.find({ userId: req.params.id });
  res.json(data);
};

export const markAsRead = async (req, res) => {
  await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
  res.json({ message: "Marked as read" });
};